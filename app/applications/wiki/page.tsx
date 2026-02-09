"use client"

import React, {useEffect, useMemo, useRef, useState} from "react"
import toast from "@/lib/components/toast"
import HoverButton from "@/lib/components/hoverButton"

type SuggestItem = {title: string; description?: string; url?: string}

function getErrorName(err: unknown) {
  if (!err || typeof err !== "object") return undefined
  const rec = err as Record<string, unknown>
  return typeof rec.name === "string" ? rec.name : undefined
}

function WikiAutocomplete({id, label, value, onChange, placeholder, lang}: {id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string; lang: "de" | "en"}) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<SuggestItem[]>([])
  const [active, setActive] = useState(0)
  const abortRef = useRef<AbortController | null>(null)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    const q = value.trim()
    if (timerRef.current) window.clearTimeout(timerRef.current)
    abortRef.current?.abort()

    if (q.length < 2) {
      setItems([])
      setOpen(false)
      setLoading(false)
      return
    }

    timerRef.current = window.setTimeout(async () => {
      const ac = new AbortController()
      abortRef.current = ac
      setLoading(true)

      try {
        const res = await fetch(`/api/wiki-suggest?q=${encodeURIComponent(q)}&lang=${lang}&limit=8`, {signal: ac.signal})
        const data = (await res.json()) as {ok: boolean; results: SuggestItem[]}
        const next = data?.ok ? (data.results ?? []) : []
        setItems(next)
        setActive(0)
        setOpen(next.length > 0)
      } catch (e: unknown) {
        if (getErrorName(e) !== "AbortError") console.error(e)
      }

      setLoading(false)
    }, 180)

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      abortRef.current?.abort()
    }
  }, [value, lang])

  function select(item: SuggestItem) {
    onChange(item.title)
    setOpen(false)
  }

  return (
    <div className="flex flex-col relative">
      <label className="text-sm font-medium" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => items.length > 0 && setOpen(true)}
        onBlur={() => {
          // allow click selection
          window.setTimeout(() => setOpen(false), 120)
        }}
        onKeyDown={(e) => {
          if (!open || items.length === 0) return
          if (e.key === "ArrowDown") {
            e.preventDefault()
            setActive((a) => Math.min(items.length - 1, a + 1))
          }
          if (e.key === "ArrowUp") {
            e.preventDefault()
            setActive((a) => Math.max(0, a - 1))
          }
          if (e.key === "Enter") {
            e.preventDefault()
            const item = items[active]
            if (item) select(item)
          }
          if (e.key === "Escape") {
            setOpen(false)
          }
        }}
        placeholder={placeholder}
        className="border border-white/10 light:border-black/10 rounded-xl mt-2 px-4 py-2 focus:outline-none focus:ring-2 ring-lime"
      />

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 rounded-2xl border border-white/10 light:border-black/10 bg-woodsmoke-light light:bg-white overflow-hidden shadow-xl">
          {loading && <div className="px-4 py-3 text-sm text-white/60 light:text-black/60">Searching…</div>}
          {!loading && items.length === 0 && <div className="px-4 py-3 text-sm text-white/60 light:text-black/60">No suggestions</div>}
          {!loading && items.length > 0 && (
            <ul>
              {items.map((it, idx) => (
                <li key={it.url || it.title}>
                  <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => select(it)} className={`w-full text-left px-4 py-3 transition ${idx === active ? "bg-white/10 light:bg-black/10" : "hover:bg-white/5 light:hover:bg-black/5"}`}>
                    <div className="text-sm font-medium">{it.title}</div>
                    {it.description && <div className="text-xs text-white/60 light:text-black/60 line-clamp-2 mt-0.5">{it.description}</div>}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
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

export default function Page() {
  const [from, setFrom] = useState("Albert Einstein")
  const [to, setTo] = useState("Quantenmechanik")
  const [lang, setLang] = useState<"de" | "en">("de")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<WikiRouteResponse | null>(null)

  const canSearch = useMemo(() => from.trim().length > 0 && to.trim().length > 0, [from, to])

  async function findRoute() {
    if (!canSearch) return toast("Please enter two Wikipedia article titles.", "error")

    setLoading(true)
    setResult(null)

    try {
      const res = await fetch("/api/wiki-route", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({from, to, lang, maxDepth: 6}),
      })

      const data = (await res.json()) as WikiRouteResponse
      setResult(data)
      if (!data.ok) toast(data.error || "No route found.", "error")
    } catch (e) {
      console.error(e)
      toast("Request failed. Please try again.", "error")
    }

    setLoading(false)
  }

  function swap() {
    setFrom(to)
    setTo(from)
  }

  return (
    <main className="min-h-screen max-w-7xl mx-auto md:px-0 px-6">
      <div className="pt-40">
        <h1 className="text-5xl font-clash font-medium">Wiki Route</h1>
        <p className="text-white/70 light:text-black/70 font-light text-lg mt-3 max-w-2xl">Gib zwei Wikipedia-Artikel an und ich finde die kürzeste Klick-Route zwischen ihnen.</p>
      </div>

      <section className="mt-10 grid md:grid-cols-3 gap-6 items-end">
        <WikiAutocomplete id="wiki-from" label="From" value={from} onChange={setFrom} placeholder="e.g. Adolf Hitler" lang={lang} />

        <WikiAutocomplete id="wiki-to" label="To" value={to} onChange={setTo} placeholder="e.g. Quantenmechanik" lang={lang} />

        <div className="flex gap-3 items-end">
          <div className="flex flex-col flex-1">
            <label className="text-sm font-medium" htmlFor="wiki-lang">
              Language
            </label>
            <select id="wiki-lang" value={lang} onChange={(e) => setLang(e.target.value as "de" | "en")} className="border border-white/10 light:border-black/10 rounded-xl mt-2 px-4 py-2 bg-transparent focus:outline-none focus:ring-2 ring-lime">
              <option value="de">de.wikipedia.org</option>
              <option value="en">en.wikipedia.org</option>
            </select>
          </div>

          <button type="button" onClick={swap} className="h-11 px-4 rounded-xl border border-white/10 light:border-black/10 hover:border-white/40 transition">
            Swap
          </button>
        </div>
      </section>

      <div className="mt-6 flex gap-4 items-center">
        <button disabled={loading} onClick={findRoute} className="relative w-52 h-12">
          <HoverButton loading={loading} text1="Find route" text2="Searching..." />
        </button>
        <span className="text-sm text-white/60 light:text-black/60">Tip: You can also paste full Wikipedia URLs.</span>
      </div>

      {result && (
        <section className="mt-10 rounded-3xl border border-white/10 light:border-black/10 bg-white/5 p-6">
          {result.ok && result.path ? (
            <>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <div className="text-lg font-medium">
                    Steps: <span className="text-lime">{result.steps}</span>
                  </div>
                  <div className="text-sm text-white/60 light:text-black/60">
                    {result.visited ? `Visited ${result.visited.total} nodes` : ""}
                    {` • ${result.timeMs}ms`}
                  </div>
                </div>
                <a className="text-sm underline text-white/70 light:text-black/70 hover:text-white" href={`https://${result.lang}.wikipedia.org/wiki/${encodeURIComponent(result.from.replaceAll(" ", "_"))}`} target="_blank" rel="noreferrer">
                  Open start article
                </a>
              </div>

              <ol className="mt-6 space-y-2">
                {result.path.map((node, idx) => (
                  <li key={node.url} className="flex items-center gap-3">
                    <span className="text-xs w-10 text-white/50 light:text-black/50">{idx}</span>
                    <a className="underline hover:text-lime" href={node.url} target="_blank" rel="noreferrer">
                      {node.title}
                    </a>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <div className="text-white/70 light:text-black/70">{result.error || "No route found."}</div>
          )}
        </section>
      )}
    </main>
  )
}
