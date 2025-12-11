"use client"
import {Download, Loader2, Upload, X} from "lucide-react"
import React, {useEffect, useRef, useState} from "react"
import {motion, AnimatePresence} from "motion/react"

export default function Page() {
  const [url, setUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [removePanelOpen, setRemovePanelOpen] = useState(false)
  const [replacePanelOpen, setReplacePanelOpen] = useState(false)
  const [replaceOptions, setReplaceOptions] = useState({
    targetColor: "#ffffff",
    replaceColor: "#000000",
    tolerance: "0.1",
  })
  const [removeOptions, setRemoveOptions] = useState({
    background_color: "transparent",
    threshold: "0.5",
    blur_radius: "3",
    alpha_boost: "1",
  })
  const [loading, setLoading] = useState(false)
  const [size, setSize] = useState<{w: number; h: number}>({w: 0, h: 0})
  const [colorPickerActive, setColorPickerActive] = useState(false)
  const pickerImageRef = useRef<HTMLImageElement | null>(null)
  const pickerCanvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(
    () => () => {
      if (url) URL.revokeObjectURL(url)
    },
    [url]
  )

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setFile(selectedFile ?? null)

    if (!selectedFile) {
      setUrl(null)
      setSize({w: 0, h: 0})
      return
    }

    const objectUrl = URL.createObjectURL(selectedFile)
    setUrl(objectUrl)

    const image = new Image()
    image.onload = () => {
      setSize({w: image.width, h: image.height})
    }
    image.onerror = () => setSize({w: 0, h: 0})
    image.src = objectUrl
  }

  async function removeBackground(event: React.FormEvent) {
    event.preventDefault()
    if (!file) return
    event.preventDefault()
    setRemovePanelOpen(false)
    setLoading(true)
    const formData = new FormData()
    formData.append("file", file)
    formData.append("threshold", removeOptions.threshold)
    formData.append("blur_radius", removeOptions.blur_radius)
    formData.append("alpha_boost", removeOptions.alpha_boost)
    const response = await fetch("http://192.168.0.204:8081", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      console.error("Upload fehlgeschlagen:", response.statusText)
      setLoading(false)
      return
    }

    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    setUrl(url)
    setLoading(false)
  }

  function changeImage() {
    const input = document.getElementById("image-input")
    input?.click()
  }

  function download() {
    if (!url) return
    const link = document.createElement("a")
    link.href = url
    link.download = "edited-image.png"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  function activateColorPicker() {
    if (!url) return
    setReplacePanelOpen(false)
    setColorPickerActive(true)
  }

  useEffect(() => {
    if (!colorPickerActive) return
    document.body.style.cursor = "crosshair"
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setColorPickerActive(false)
    }
    document.addEventListener("keydown", handleKey)
    return () => {
      document.body.style.cursor = ""
      document.removeEventListener("keydown", handleKey)
    }
  }, [colorPickerActive])

  useEffect(() => {
    if (!colorPickerActive || !url) return
    const img = pickerImageRef.current
    const canvas = pickerCanvasRef.current
    if (!img || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleImageReady = () => {
      if (!img.naturalWidth || !img.naturalHeight) return
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      ctx.drawImage(img, 0, 0)
    }

    if (img.complete && img.naturalWidth) handleImageReady()
    else img.addEventListener("load", handleImageReady)

    return () => {
      img.removeEventListener("load", handleImageReady)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
    }
  }, [colorPickerActive, url])

  const closeColorPicker = () => setColorPickerActive(false)

  const handlePickerClick = (event: React.MouseEvent<HTMLImageElement>) => {
    const img = pickerImageRef.current
    const canvas = pickerCanvasRef.current
    if (!img || !canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const rect = img.getBoundingClientRect()
    const scaleX = img.naturalWidth / rect.width
    const scaleY = img.naturalHeight / rect.height
    const x = Math.floor((event.clientX - rect.left) * scaleX)
    const y = Math.floor((event.clientY - rect.top) * scaleY)
    const [r, g, b] = ctx.getImageData(x, y, 1, 1).data
    const hex = `#${[r, g, b].map((value) => value.toString(16).padStart(2, "0")).join("")}`
    setReplaceOptions((prev) => ({...prev, targetColor: hex}))
    setColorPickerActive(false)
    setReplacePanelOpen(true)
  }

  async function replaceColor(event: React.FormEvent) {
    event.preventDefault()
    if (!file) return
    const formData = new FormData()
    formData.append("file", file)
    formData.append("replace_from", replaceOptions.targetColor)
    formData.append("replace_to", replaceOptions.replaceColor)
    formData.append("tolerance", String(replaceOptions.tolerance))
    setReplacePanelOpen(false)
    setLoading(true)

    const response = await fetch("http://192.168.0.204:8082", {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      console.error("Upload fehlgeschlagen:", response.statusText)
      setLoading(false)
      return
    }
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    setUrl(url)
    setLoading(false)
  }

  return (
    <main className="min-h-screen flex flex-col items-center gap-6">
      <h1 className="pt-42 text-5xl font-bold">Image Editor</h1>
      <section className="w-full h-140 fbg-red-500f flex flex-col items-center justify-center">
        <div className={`flex flex-col items-center relative`}>
          {!url && (
            <label className="flex items-center justify-center w-500 h-100 max-w-2xl rounded-4xl border-dashed border-2 border-white/40 cursor-pointer" htmlFor="image-input">
              <input id="image-input" className="sr-only" type="file" accept="image/*" onChange={handleFileChange} />
              <div className="bg-white rounded-2xl p-3">
                <Upload className="size-7 text-black" />
              </div>
            </label>
          )}
          {url && (
            <div className="flex flex-col items-center justify-center group">
              <div className="flex items-center justify-center">
                <img src={url} alt="Upload preview" className={`max-h-80 rounded-xl shadow ${loading ? "opacity-60" : "opacity-100"}`} />
                {loading && <Loader2 className="absolute animate-spin size-10" />}
              </div>
              {size.w > 0 && size.h > 0 && (
                <p className="text-white/80 text-sm mt-2">
                  {size.w} × {size.h} px
                </p>
              )}
            </div>
          )}
        </div>
        <div className="flex items-center justify-center w-full gap-5 pt-5">
          <button onClick={() => changeImage()} className="border-1 px-4 py-2 font-semibold rounded-2xl cursor-pointer">
            Change
          </button>
          <button onClick={() => download()} className="border-1 px-4 py-2 font-semibold rounded-2xl cursor-pointer">
            Download
          </button>
        </div>
      </section>
      <div className="w-full h-30 flex items-center justify-center gap-10">
        <button onClick={() => setRemovePanelOpen(true)} className="bg-white text-black px-4 py-2 font-semibold rounded-2xl cursor-pointer">
          Remove Background
        </button>
        <button onClick={() => setReplacePanelOpen(true)} className="bg-white text-black px-4 py-2 font-semibold rounded-2xl cursor-pointer">
          Replace Color
        </button>
      </div>
      <AnimatePresence mode="wait">
        {removePanelOpen && (
          <div className="fixed z-1000 inset-0 flex items-center justify-center">
            <motion.div className="absolute bg-black/30 inset-0 backdrop-blur-xs" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} onClick={() => setRemovePanelOpen(false)} />
            <motion.form onSubmit={(e) => removeBackground(e)} className="w-140 px-10 relative bg-neutral-900 rounded-3xl flex flex-col items-center" initial={{scale: 1, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 1, opacity: 0}}>
              <h1 className="text-white pt-5 text-2xl font-semibold">Remove Background</h1>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2 pt-5">
                {Object.entries(removeOptions).map(([name, value]) => (
                  <div key={name}>
                    <span className="text-white">{name.replace("_", " ")}</span>
                    <input onChange={(e) => setRemoveOptions((prev) => ({...prev, [name]: e.target.value}))} value={value.toString()} name={name} type="text" placeholder={name.replace("_", " ")} className="px-4 py-2 border-1 border-white/20 mt-1 rounded-2xl w-full text-white" />
                  </div>
                ))}
              </div>
              <button className="w-full my-5 px-4 py-2 rounded-2xl text-black font-semibold bg-white cursor-pointer">Remove</button>
              <button type="button" className="text-white/70 absolute top-5 right-5 cursor-pointer" onClick={() => setRemovePanelOpen(false)}>
                <X className="size-6" />
              </button>
            </motion.form>
          </div>
        )}
        {replacePanelOpen && (
          <div className="fixed z-1000 inset-0 flex items-center justify-center">
            <motion.div className="absolute bg-black/30 inset-0 backdrop-blur-xs" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} onClick={() => setReplacePanelOpen(false)} />
            <motion.form onSubmit={(e) => replaceColor(e)} className="w-140 px-10 relative bg-neutral-900 rounded-3xl flex flex-col items-center" initial={{scale: 1, opacity: 0}} animate={{scale: 1, opacity: 1}} exit={{scale: 1, opacity: 0}}>
              <h1 className="text-white pt-5 text-2xl font-semibold">Replace Color</h1>
              <div className="grid grid-cols-2 gap-x-5 gap-y-2 pt-5">
                <button type="button" className="w-full px-4 py-2 rounded-2xl text-black font-semibold bg-white cursor-pointer" onClick={() => activateColorPicker()}>
                  Choose Color
                </button>
                {Object.entries(replaceOptions).map(([name, value]) => (
                  <div key={name}>
                    <span className="text-white">{name.replace("_", " ")}</span>
                    <input onChange={(e) => setReplaceOptions((prev) => ({...prev, [name]: e.target.value}))} value={value.toString()} name={name} type="text" placeholder={name.replace("_", " ")} className="px-4 py-2 border-1 border-white/20 mt-1 rounded-2xl w-full text-white" />
                  </div>
                ))}
              </div>
              <button className="w-full my-5 px-4 py-2 rounded-2xl text-black font-semibold bg-white cursor-pointer">Replace Color</button>
              <button type="button" className="text-white/70 absolute top-5 right-5 cursor-pointer" onClick={() => setReplacePanelOpen(false)}>
                <X className="size-6" />
              </button>
            </motion.form>
          </div>
        )}
        {colorPickerActive && url && (
          <div className="fixed z-1000 inset-0 bg-black/90 flex flex-col items-center justify-center gap-4 p-6">
            <p className="text-white/80 text-lg font-semibold">Click anywhere on the image to sample a color</p>
            <div className="relative max-h-[85vh] max-w-[90vw]">
              <img ref={pickerImageRef} src={url} alt="Color picker preview" onClick={handlePickerClick} className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl cursor-crosshair" />
              <button type="button" className="absolute top-4 right-4 bg-black/70 text-white rounded-full p-2" onClick={closeColorPicker}>
                <X className="size-5" />
              </button>
            </div>
            <canvas ref={pickerCanvasRef} className="hidden" />
          </div>
        )}
      </AnimatePresence>
    </main>
  )
}
