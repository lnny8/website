export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type WikiRouteRequest = {
  from: string
  to: string
  lang?: string
  maxDepth?: number
  maxNodes?: number
  maxLinksPerPage?: number
}

type WikiRouteResponse = {
  ok: boolean
  lang: string
  from: string
  to: string
  steps?: number
  path?: Array<{title: string; url: string}>
  visited?: {start: number; end: number; total: number}
  timeMs: number
  error?: string
}

const DEFAULT_LANG = "de"
const DEFAULT_MAX_DEPTH = 6
const DEFAULT_MAX_NODES = 12000
const DEFAULT_MAX_LINKS_PER_PAGE = 300

const DEFAULT_CONCURRENCY = 6

type CacheEntry<T> = {value: T; expiresAt: number}

const outgoingCache = new Map<string, CacheEntry<string[]>>()
const backlinksCache = new Map<string, CacheEntry<string[]>>()
const titleCache = new Map<string, CacheEntry<string>>()
const searchCache = new Map<string, CacheEntry<string | null>>()

const MAX_CACHE_ENTRIES = 2500
const CACHE_TTL_MS = 1000 * 60 * 30 // 30min

function getCacheKey(lang: string, title: string) {
  return `${lang}:${title}`
}

function getCache<T>(cache: Map<string, CacheEntry<T>>, key: string): T | undefined {
  const entry = cache.get(key)
  if (!entry) return undefined
  if (Date.now() > entry.expiresAt) {
    cache.delete(key)
    return undefined
  }
  return entry.value
}

function setCache<T>(cache: Map<string, CacheEntry<T>>, key: string, value: T) {
  cache.set(key, {value, expiresAt: Date.now() + CACHE_TTL_MS})
  if (cache.size > MAX_CACHE_ENTRIES) {
    const first = cache.keys().next().value as string | undefined
    if (first) cache.delete(first)
  }
}

async function mapWithConcurrency<T, R>(items: T[], limit: number, fn: (item: T) => Promise<R>): Promise<R[]> {
  const results = new Array<R>(items.length)
  let idx = 0

  const workers = Array.from({length: Math.max(1, limit)}, async () => {
    while (true) {
      const current = idx
      idx++
      if (current >= items.length) return
      results[current] = await fn(items[current])
    }
  })

  await Promise.all(workers)
  return results
}

function isSafeLang(lang: string) {
  return /^[a-z-]{2,12}$/i.test(lang)
}

function parseWikipediaInput(input: string): {title: string; lang?: string} {
  const trimmed = (input ?? "").trim()
  if (!trimmed) return {title: "", lang: undefined}

  try {
    const url = new URL(trimmed)
    const hostMatch = url.hostname.match(/^([a-z-]+)\.wikipedia\.org$/i)
    const langFromUrl = hostMatch?.[1]?.toLowerCase()

    // /wiki/Title
    if (url.pathname.startsWith("/wiki/")) {
      const rawTitle = url.pathname.slice("/wiki/".length)
      const decoded = decodeURIComponent(rawTitle)
      return {
        title: decoded.replaceAll("_", " ").trim(),
        lang: langFromUrl,
      }
    }

    // ?title=Title
    const titleParam = url.searchParams.get("title")
    if (titleParam) {
      return {
        title: titleParam.replaceAll("_", " ").trim(),
        lang: langFromUrl,
      }
    }
  } catch {
    // not a URL
  }

  return {title: trimmed.replaceAll("_", " ").trim(), lang: undefined}
}

function buildArticleUrl(lang: string, title: string) {
  return `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(title.replaceAll(" ", "_"))}`
}

async function fetchJson(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "lnny.dev WikiRoute/1.0 (https://lnny.dev)",
      Accept: "application/json",
    },
    cache: "no-store",
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`Wikipedia API error ${res.status}: ${text.slice(0, 200)}`)
  }
  return res.json()
}

async function searchBestTitle(lang: string, query: string) {
  const key = getCacheKey(lang, `__search__:${query}`)
  const cached = getCache(searchCache, key)
  if (typeof cached !== "undefined") return cached

  const api = `https://${lang}.wikipedia.org/w/api.php`
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    list: "search",
    srnamespace: "0",
    srlimit: "1",
    srsearch: query,
  })
  const data = await fetchJson(`${api}?${params.toString()}`)
  const first = data?.query?.search?.[0]
  const best = (first?.title as string | undefined) ?? null
  setCache(searchCache, key, best)
  return best
}

async function resolveTitle(lang: string, title: string, allowSearchFallback = true): Promise<string> {
  const key = getCacheKey(lang, `__title__:${title}`)
  const cached = getCache(titleCache, key)
  if (cached) return cached

  const api = `https://${lang}.wikipedia.org/w/api.php`
  const params = new URLSearchParams({
    action: "query",
    format: "json",
    formatversion: "2",
    redirects: "1",
    titles: title,
    prop: "info",
  })

  const data = await fetchJson(`${api}?${params.toString()}`)
  const page = data?.query?.pages?.[0]
  if (!page) throw new Error("Could not resolve article title.")
  if (page.missing) {
    if (allowSearchFallback) {
      const best = await searchBestTitle(lang, title)
      if (best) return resolveTitle(lang, best, false)
    }
    throw new Error(`Article not found: ${title}`)
  }
  if (!page.title) throw new Error("Could not resolve article title.")
  const resolved = page.title as string
  setCache(titleCache, key, resolved)
  return resolved
}

async function getOutgoingLinks(lang: string, title: string, maxLinks: number) {
  const key = getCacheKey(lang, title)
  const cached = getCache(outgoingCache, key)
  if (cached && cached.length >= maxLinks) return cached.slice(0, maxLinks)

  const api = `https://${lang}.wikipedia.org/w/api.php`
  const results: string[] = []

  let plcontinue: string | undefined
  while (results.length < maxLinks) {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      formatversion: "2",
      redirects: "1",
      prop: "links",
      titles: title,
      plnamespace: "0",
      pllimit: "max",
    })
    if (plcontinue) {
      params.set("plcontinue", plcontinue)
      params.set("continue", "-")
    }

    const data = await fetchJson(`${api}?${params.toString()}`)
    const page = data?.query?.pages?.[0]
    const links = (page?.links ?? []) as Array<{title: string}>
    for (const l of links) {
      if (!l?.title) continue
      results.push(l.title)
      if (results.length >= maxLinks) break
    }

    plcontinue = data?.continue?.plcontinue
    if (!plcontinue) break
  }

  setCache(outgoingCache, key, results)
  return results
}

async function getBacklinks(lang: string, title: string, maxLinks: number) {
  const key = getCacheKey(lang, title)
  const cached = getCache(backlinksCache, key)
  if (cached && cached.length >= maxLinks) return cached.slice(0, maxLinks)

  const api = `https://${lang}.wikipedia.org/w/api.php`
  const results: string[] = []

  let blcontinue: string | undefined
  while (results.length < maxLinks) {
    const params = new URLSearchParams({
      action: "query",
      format: "json",
      formatversion: "2",
      list: "backlinks",
      bltitle: title,
      blnamespace: "0",
      bllimit: "max",
    })
    if (blcontinue) {
      params.set("blcontinue", blcontinue)
      params.set("continue", "-")
    }

    const data = await fetchJson(`${api}?${params.toString()}`)
    const backlinks = (data?.query?.backlinks ?? []) as Array<{title: string}>
    for (const b of backlinks) {
      if (!b?.title) continue
      results.push(b.title)
      if (results.length >= maxLinks) break
    }

    blcontinue = data?.continue?.blcontinue
    if (!blcontinue) break
  }

  setCache(backlinksCache, key, results)
  return results
}

function reconstructPath(start: string, end: string, meeting: string, parentStart: Map<string, string>, parentEnd: Map<string, string>) {
  const left: string[] = []
  let cur: string | undefined = meeting
  while (cur) {
    left.push(cur)
    cur = parentStart.get(cur)
  }
  left.reverse()

  const right: string[] = []
  cur = meeting
  while (cur && cur !== end) {
    const next = parentEnd.get(cur)
    if (!next) break
    right.push(next)
    cur = next
  }

  const full = [...left, ...right]
  // ensure starts/ends as expected when possible
  if (full[0] !== start) {
    // if start is meeting (start==meeting), left already ok; else keep as-is
  }
  return full
}

async function findShortestRoute(opts: {lang: string; from: string; to: string; maxDepth: number; maxNodes: number; maxLinksPerPage: number; concurrency?: number}) {
  const {lang, from, to, maxDepth, maxNodes, maxLinksPerPage} = opts
  const concurrency = Math.max(1, Math.min(16, Math.floor(opts.concurrency ?? DEFAULT_CONCURRENCY)))

  if (from === to) {
    return {
      meeting: from,
      parentStart: new Map<string, string>(),
      parentEnd: new Map<string, string>(),
      depthStart: new Map<string, number>([[from, 0]]),
      depthEnd: new Map<string, number>([[to, 0]]),
    }
  }

  const parentStart = new Map<string, string>()
  const parentEnd = new Map<string, string>()
  const depthStart = new Map<string, number>([[from, 0]])
  const depthEnd = new Map<string, number>([[to, 0]])

  let frontierStart = new Set<string>([from])
  let frontierEnd = new Set<string>([to])

  let bestMeeting: {node: string; totalLen: number} | null = null

  const seenTotal = () => depthStart.size + depthEnd.size

  for (let depth = 0; depth < maxDepth; depth++) {
    if (seenTotal() > maxNodes) throw new Error(`Search aborted: exceeded maxNodes (${maxNodes}). Try smaller depth or different articles.`)

    const expandStartSide = frontierStart.size <= frontierEnd.size

    if (expandStartSide) {
      const nodes = Array.from(frontierStart)
      const batches = await mapWithConcurrency(nodes, concurrency, async (node) => {
        const dNode = depthStart.get(node) ?? 0
        const neighbors = await getOutgoingLinks(lang, node, maxLinksPerPage)
        return {node, dNode, neighbors}
      })

      const nextFrontier = new Set<string>()
      for (const batch of batches) {
        for (const nb of batch.neighbors) {
          if (depthStart.has(nb)) continue
          depthStart.set(nb, batch.dNode + 1)
          parentStart.set(nb, batch.node)
          nextFrontier.add(nb)

          const dOther = depthEnd.get(nb)
          if (typeof dOther === "number") {
            const totalLen = batch.dNode + 1 + dOther
            if (!bestMeeting || totalLen < bestMeeting.totalLen) bestMeeting = {node: nb, totalLen}
          }

          if (seenTotal() > maxNodes) break
        }
        if (seenTotal() > maxNodes) break
      }

      frontierStart = nextFrontier
    } else {
      const nodes = Array.from(frontierEnd)
      const batches = await mapWithConcurrency(nodes, concurrency, async (node) => {
        const dNode = depthEnd.get(node) ?? 0
        const neighbors = await getBacklinks(lang, node, maxLinksPerPage)
        return {node, dNode, neighbors}
      })

      const nextFrontier = new Set<string>()
      for (const batch of batches) {
        for (const nb of batch.neighbors) {
          if (depthEnd.has(nb)) continue
          depthEnd.set(nb, batch.dNode + 1)
          // nb -> node (towards target)
          parentEnd.set(nb, batch.node)
          nextFrontier.add(nb)

          const dOther = depthStart.get(nb)
          if (typeof dOther === "number") {
            const totalLen = dOther + (batch.dNode + 1)
            if (!bestMeeting || totalLen < bestMeeting.totalLen) bestMeeting = {node: nb, totalLen}
          }

          if (seenTotal() > maxNodes) break
        }
        if (seenTotal() > maxNodes) break
      }

      frontierEnd = nextFrontier
    }

    if (bestMeeting) {
      return {meeting: bestMeeting.node, parentStart, parentEnd, depthStart, depthEnd, totalLen: bestMeeting.totalLen}
    }

    if (frontierStart.size === 0 || frontierEnd.size === 0) break
  }

  return null
}

export async function POST(req: Request) {
  const t0 = Date.now()

  try {
    const body = (await req.json().catch(() => ({}))) as Partial<WikiRouteRequest>

    const parsedFrom = parseWikipediaInput(body.from ?? "")
    const parsedTo = parseWikipediaInput(body.to ?? "")

    const lang = (isSafeLang(body.lang ?? "") ? (body.lang as string) : parsedFrom.lang || parsedTo.lang || DEFAULT_LANG).toLowerCase()

    const fromRaw = parsedFrom.title
    const toRaw = parsedTo.title
    if (!fromRaw || !toRaw) {
      const res: WikiRouteResponse = {ok: false, lang, from: fromRaw, to: toRaw, timeMs: Date.now() - t0, error: "Please provide two article titles (or Wikipedia URLs)."}
      return Response.json(res, {status: 400})
    }

    const maxDepth = Math.max(1, Math.min(12, Math.floor(body.maxDepth ?? DEFAULT_MAX_DEPTH)))
    const maxNodes = Math.max(100, Math.min(100000, Math.floor(body.maxNodes ?? DEFAULT_MAX_NODES)))
    const maxLinksPerPage = Math.max(50, Math.min(5000, Math.floor(body.maxLinksPerPage ?? DEFAULT_MAX_LINKS_PER_PAGE)))

    const from = await resolveTitle(lang, fromRaw)
    const to = await resolveTitle(lang, toRaw)

    // Fast path: direct link
    try {
      const direct = await getOutgoingLinks(lang, from, DEFAULT_MAX_LINKS_PER_PAGE)
      if (direct.includes(to)) {
        const res: WikiRouteResponse = {
          ok: true,
          lang,
          from,
          to,
          steps: 1,
          path: [
            {title: from, url: buildArticleUrl(lang, from)},
            {title: to, url: buildArticleUrl(lang, to)},
          ],
          visited: {start: 1, end: 0, total: 1},
          timeMs: Date.now() - t0,
        }
        return Response.json(res)
      }
    } catch {
      // ignore direct-link optimization errors
    }

    const result = await findShortestRoute({lang, from, to, maxDepth, maxNodes, maxLinksPerPage})
    if (!result) {
      const res: WikiRouteResponse = {
        ok: false,
        lang,
        from,
        to,
        timeMs: Date.now() - t0,
        error: `No route found within depth ${maxDepth}. Try increasing maxDepth or picking closer articles.`,
      }
      return Response.json(res, {status: 404})
    }

    const pathTitles = reconstructPath(from, to, result.meeting, result.parentStart, result.parentEnd)
    const path = pathTitles.map((title) => ({title, url: buildArticleUrl(lang, title)}))

    const res: WikiRouteResponse = {
      ok: true,
      lang,
      from,
      to,
      steps: Math.max(0, path.length - 1),
      path,
      visited: {start: result.depthStart.size, end: result.depthEnd.size, total: result.depthStart.size + result.depthEnd.size},
      timeMs: Date.now() - t0,
    }
    return Response.json(res)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    const res: WikiRouteResponse = {ok: false, lang: DEFAULT_LANG, from: "", to: "", timeMs: Date.now() - t0, error: message}
    return Response.json(res, {status: 500})
  }
}
