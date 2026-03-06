"use client"

import {ChangeEvent, useMemo, useRef, useState} from "react"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import {marked} from "marked"
import HoverButton from "@/lib/components/hoverButton"

const defaultMarkdown = `# My Markdown Document

## Example

Write your **text** in Markdown here.

- Item 1
- Item 2
- Item 3

> This section will be exported to PDF.
`

const fontFamilies = [
  {label: "Helvetica", value: "Helvetica, Arial, sans-serif"},
  {label: "Times", value: "'Times New Roman', Times, serif"},
  {label: "Courier", value: "'Courier New', Courier, monospace"},
]

const backgroundPresets = [
  {label: "No preset", value: "none"},
  {label: "Paper", value: "/markdown/paper.jpg"},
  {label: "Blueprint", value: "/markdown/blueprint.png"},
] as const

type BackgroundPresetValue = (typeof backgroundPresets)[number]["value"]

const presets = {
  minimal: {
    label: "Minimal",
    fontFamily: fontFamilies[0].value,
    fontSize: 17,
    textColor: "#111827",
    backgroundColor: "#ffffff",
    pagePadding: 48,
  },
  business: {
    label: "Business",
    fontFamily: fontFamilies[1].value,
    fontSize: 16,
    textColor: "#0f172a",
    backgroundColor: "#f8fafc",
    pagePadding: 56,
  },
  coding: {
    label: "Coding",
    fontFamily: fontFamilies[2].value,
    fontSize: 15,
    textColor: "#e5e7eb",
    backgroundColor: "#0f172a",
    pagePadding: 40,
  },
} as const

type PresetKey = keyof typeof presets

export default function MarkdownAppPage() {
  const previewRef = useRef<HTMLDivElement | null>(null)

  const [markdown, setMarkdown] = useState(defaultMarkdown)
  const [fontFamily, setFontFamily] = useState(fontFamilies[0].value)
  const [fontSize, setFontSize] = useState(18)
  const [textColor, setTextColor] = useState("#111827")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null)
  const [selectedBackgroundPreset, setSelectedBackgroundPreset] = useState<BackgroundPresetValue>("none")
  const [isExporting, setIsExporting] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<PresetKey>("minimal")
  const [pagePadding, setPagePadding] = useState<number>(presets.minimal.pagePadding)

  const html = useMemo(() => {
    return marked.parse(markdown, {
      gfm: true,
      breaks: true,
    }) as string
  }, [markdown])

  const onImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result
      if (typeof result === "string") {
        setBackgroundImage(result)
        setSelectedBackgroundPreset("none")
      }
    }
    reader.readAsDataURL(file)
  }

  const clearBackgroundImage = () => {
    setBackgroundImage(null)
    setSelectedBackgroundPreset("none")
  }

  const onBackgroundPresetChange = (value: BackgroundPresetValue) => {
    setSelectedBackgroundPreset(value)
    setBackgroundImage(value === "none" ? null : value)
  }

  const applyPreset = (presetKey: PresetKey) => {
    const preset = presets[presetKey]
    setSelectedPreset(presetKey)
    setFontFamily(preset.fontFamily)
    setFontSize(preset.fontSize)
    setTextColor(preset.textColor)
    setBackgroundColor(preset.backgroundColor)
    setPagePadding(preset.pagePadding)
    setBackgroundImage(null)
  }

  const capturePreviewCanvas = async () => {
    if (!previewRef.current) return null

    return html2canvas(previewRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    })
  }

  const exportPdf = async () => {
    if (!previewRef.current || isExporting) return

    setIsExporting(true)

    try {
      const canvas = await capturePreviewCanvas()
      if (!canvas) return

      const imageData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imageWidth = pdfWidth
      const imageHeight = (canvas.height * imageWidth) / canvas.width

      let heightLeft = imageHeight
      let position = 0

      pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight, undefined, "FAST")
      heightLeft -= pdfHeight

      while (heightLeft > 0) {
        position = heightLeft - imageHeight
        pdf.addPage()
        pdf.addImage(imageData, "PNG", 0, position, imageWidth, imageHeight, undefined, "FAST")
        heightLeft -= pdfHeight
      }

      pdf.save("markdown-export.pdf")
    } finally {
      setIsExporting(false)
    }
  }

  const exportPng = async () => {
    if (!previewRef.current || isExporting) return

    setIsExporting(true)

    try {
      const canvas = await capturePreviewCanvas()
      if (!canvas) return

      const pngBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/png")
      })

      if (!pngBlob) return

      const url = URL.createObjectURL(pngBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = "markdown-export.png"
      link.click()
      URL.revokeObjectURL(url)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <main className="min-h-screen max-w-7xl mx-auto md:px-0 px-6 pt-40 pb-10">
      <section className="grid md:grid-cols-2 gap-10 mt-10 rounded-3xl bg-woodsmoke-light shadow-(--inset_shadow) p-6 light:bg-athensgray-light">
        <div>
          <h1 className="text-5xl font-clash font-medium">Markdown Exporter</h1>
          <p className="mt-3 text-white/70 light:text-black/70 font-light">Enter Markdown, choose font and background settings, then export everything as PDF.</p>

          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium">Markdown</span>
              <textarea
                value={markdown}
                onChange={(event) => setMarkdown(event.target.value)}
                className="h-72 w-full resize-y rounded-xl bg-woodsmoke-light shadow-(--inset_shadow) border-white/10 light:border-black/10 light:bg-athensgray-light mt-2 px-4 py-3 text-sm focus:outline-none focus:ring-2 ring-lime"
              />
            </label>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-medium">Preset</span>
                <select
                  value={selectedPreset}
                  onChange={(event) => applyPreset(event.target.value as PresetKey)}
                  className="w-full rounded-xl bg-woodsmoke-light shadow-(--inset_shadow) border-white/10 light:border-black/10 light:bg-athensgray-light mt-2 px-4 py-2 text-sm focus:outline-none focus:ring-2 ring-lime">
                  {Object.entries(presets).map(([key, preset]) => (
                    <option key={key} value={key}>
                      {preset.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">Font family</span>
                <select
                  value={fontFamily}
                  onChange={(event) => setFontFamily(event.target.value)}
                  className="w-full rounded-xl bg-woodsmoke-light shadow-(--inset_shadow) border-white/10 light:border-black/10 light:bg-athensgray-light mt-2 px-4 py-2 text-sm focus:outline-none focus:ring-2 ring-lime">
                  {fontFamilies.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">Font size ({fontSize}px)</span>
                <input type="range" min={1} max={28} value={fontSize} onChange={(event) => setFontSize(Number(event.target.value))} className="ui-range w-full mt-2" />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">A4 margin ({pagePadding}px)</span>
                <input type="range" min={1} max={80} value={pagePadding} onChange={(event) => setPagePadding(Number(event.target.value))} className="ui-range w-full mt-2" />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">Text color</span>
                <input type="color" value={textColor} onChange={(event) => setTextColor(event.target.value)} className="h-11 w-full cursor-pointer rounded-xl bg-woodsmoke-light shadow-(--inset_shadow) border-white/10 light:border-black/10 light:bg-athensgray-light mt-2 px-1" />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium">Background color</span>
                <input
                  type="color"
                  value={backgroundColor}
                  onChange={(event) => setBackgroundColor(event.target.value)}
                  className="h-11 w-full cursor-pointer rounded-xl bg-woodsmoke-light shadow-(--inset_shadow) border-white/10 light:border-black/10 light:bg-athensgray-light mt-2 px-1"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-1 block text-sm font-medium">Background image (optional)</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onImageUpload}
                  className="block w-full cursor-pointer rounded-xl bg-woodsmoke-light shadow-(--inset_shadow) border-white/10 light:border-black/10 light:bg-athensgray-light mt-2 px-4 py-2 text-sm focus:outline-none focus:ring-2 ring-lime"
                />
              </label>

              <label className="block sm:col-span-2">
                <span className="mb-1 block text-sm font-medium">Background preset</span>
                <select
                  value={selectedBackgroundPreset}
                  onChange={(event) => onBackgroundPresetChange(event.target.value as BackgroundPresetValue)}
                  className="w-full rounded-xl bg-woodsmoke-light shadow-(--inset_shadow) border-white/10 light:border-black/10 light:bg-athensgray-light mt-2 px-4 py-2 text-sm focus:outline-none focus:ring-2 ring-lime">
                  {backgroundPresets.map((preset) => (
                    <option key={preset.value} value={preset.value}>
                      {preset.label}
                    </option>
                  ))}
                </select>
              </label>

              <div className="sm:col-span-2 flex flex-wrap gap-2">
                <button type="button" onClick={exportPdf} disabled={isExporting} className="relative w-44 h-11 disabled:opacity-70 disabled:cursor-not-allowed">
                  <HoverButton loading={isExporting} disabled={isExporting} text1="Create PDF" text2="Export now" />
                </button>

                <button type="button" onClick={exportPng} disabled={isExporting} className="relative w-44 h-11 disabled:opacity-70 disabled:cursor-not-allowed">
                  <HoverButton loading={isExporting} disabled={isExporting} text1="Create PNG" text2="As image" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-clash font-medium">Preview</h2>
          <p className="mt-2 text-white/70 light:text-black/70 font-light">This view will be exported.</p>

          <div className="mt-4 overflow-autof rounded-2xl bg-woodsmoke-light shadow-(--inset_shadow) p-4 light:bg-athensgray-light">
            <div
              ref={previewRef}
              className="markdown-preview w-full rounded-lg"
              style={{
                fontFamily,
                fontSize: `${fontSize}px`,
                lineHeight: 1.5,
                color: textColor,
                paddingTop: `${1}px`,
                paddingBottom: `${1}px`,
                paddingLeft: `${pagePadding}px`,
                paddingRight: `${pagePadding}px`,
                backgroundColor,
                backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "800px",
                // minHeight: "1123px",
                // width: "794px",
              }}
              dangerouslySetInnerHTML={{__html: html}}
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        .markdown-preview :global(h1),
        .markdown-preview :global(h2),
        .markdown-preview :global(h3),
        .markdown-preview :global(h4),
        .markdown-preview :global(h5),
        .markdown-preview :global(h6) {
          font-weight: 700;
          line-height: 1.2;
          margin-top: 1.2em;
          margin-bottom: 0.5em;
        }

        .markdown-preview :global(h1) {
          font-size: 2.05em;
        }

        .markdown-preview :global(h2) {
          font-size: 1.7em;
        }

        .markdown-preview :global(h3) {
          font-size: 1.4em;
        }

        .markdown-preview :global(p) {
          margin: 0.8em 0;
        }

        .markdown-preview :global(ul),
        .markdown-preview :global(ol) {
          margin: 0.8em 0;
          padding-left: 1.4em;
        }

        .markdown-preview :global(li) {
          margin: 0.3em 0;
        }

        .markdown-preview :global(blockquote) {
          margin: 1em 0;
          padding: 0.2em 0 0.2em 0.9em;
          border-left: 4px solid currentColor;
          opacity: 0.9;
        }

        .markdown-preview :global(code) {
          font-family: "Courier New", Courier, monospace;
          font-size: 0.92em;
          padding: 0.15em 0.35em;
          border-radius: 6px;
          background: color-mix(in oklab, currentColor 10%, transparent);
        }

        .markdown-preview :global(pre) {
          margin: 1em 0;
          padding: 0.8em;
          border-radius: 10px;
          background: color-mix(in oklab, currentColor 9%, transparent);
          overflow-x: auto;
        }

        .markdown-preview :global(pre code) {
          background: transparent;
          padding: 0;
        }
      `}</style>
    </main>
  )
}
