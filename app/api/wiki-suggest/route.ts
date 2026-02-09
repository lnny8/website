export const runtime = "nodejs"
export const dynamic = "force-dynamic"

type WikiSuggestResponse = {
  ok: boolean
  lang: string
  q: string
  results: Array<{title: string; description?: string; url?: string}>
  timeMs: number
  error?: string
}

const DEFAULT_LANG = "de"

function isSafeLang(lang: string) {
  return /^[a-z-]{2,12}$/i.test(lang)
}

async function fetchJson(url: string) {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "lnny.dev WikiSuggest/1.0 (https://lnny.dev)",
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

export async function GET(req: Request) {
  const t0 = Date.now()

  try {
    const {searchParams} = new URL(req.url)
    const q = (searchParams.get("q") ?? "").trim()
    const lang = (isSafeLang(searchParams.get("lang") ?? "") ? (searchParams.get("lang") as string) : DEFAULT_LANG).toLowerCase()
    const limit = Math.max(1, Math.min(12, Number(searchParams.get("limit") ?? 8)))

    if (q.length < 2) {
      const res: WikiSuggestResponse = {ok: true, lang, q, results: [], timeMs: Date.now() - t0}
      return Response.json(res)
    }

    // opensearch is great for fast suggestions
    const api = `https://${lang}.wikipedia.org/w/api.php`
    const params = new URLSearchParams({
      action: "opensearch",
      format: "json",
      namespace: "0",
      limit: String(limit),
      search: q,
    })

    const data = (await fetchJson(`${api}?${params.toString()}`)) as [string, string[], string[], string[]]

    const titles = data?.[1] ?? []
    const descriptions = data?.[2] ?? []
    const urls = data?.[3] ?? []

    const results = titles.map((title, idx) => ({
      title,
      description: descriptions[idx] || undefined,
      url: urls[idx] || undefined,
    }))

    const res: WikiSuggestResponse = {ok: true, lang, q, results, timeMs: Date.now() - t0}
    return Response.json(res)
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error"
    const res: WikiSuggestResponse = {ok: false, lang: DEFAULT_LANG, q: "", results: [], timeMs: Date.now() - t0, error: message}
    return Response.json(res, {status: 500})
  }
}
