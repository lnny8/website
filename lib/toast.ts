import gsap from "gsap"

export default function toast(message: string, type: "success" | "error" | "info") {
  document.querySelector(".toast")?.remove()
  const toast = document.createElement("div")
  gsap.from(toast, {opacity: 0, yPercent: 100, duration: 0.5, ease: "back.out(1.7)"})
  toast.className = "toast fixed bottom-10 left-1/2 transform overflow-hidden text-black -translate-x-1/2 flex items-center justify-between bg-white px-8 py-2 rounded-xl z-50"

  const svgNS = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(svgNS, "svg")
  svg.setAttribute("viewBox", "0 0 24 24")
  svg.setAttribute("width", "16")
  svg.setAttribute("height", "16")
  svg.setAttribute("fill", "none")
  svg.setAttribute("stroke-width", "3")
  svg.setAttribute("stroke-linecap", "round")
  svg.setAttribute("stroke-linejoin", "round")
  if (type === "success") {
    const circle = document.createElementNS(svgNS, "circle")
    circle.setAttribute("cx", "12")
    circle.setAttribute("cy", "12")
    circle.setAttribute("r", "10")
    const successPath = document.createElementNS(svgNS, "path")
    successPath.setAttribute("d", "m9 12 2 2 4-4")
    svg.appendChild(circle)
    svg.appendChild(successPath)
  }
  if (type === "error") {
    const path = document.createElementNS(svgNS, "path")
    path.setAttribute("d", "M20 6 9 17l-5-5")
    path.setAttribute("d", "M4.929 4.929 19.07 19.071")
    const circle = document.createElementNS(svgNS, "circle")
    circle.setAttribute("cx", "12")
    circle.setAttribute("cy", "12")
    circle.setAttribute("r", "10")
    svg.appendChild(circle)
    svg.appendChild(path)
  }
  if (type === "info") {
    const circleInfo = document.createElementNS(svgNS, "circle")
    circleInfo.setAttribute("cx", "12")
    circleInfo.setAttribute("cy", "12")
    circleInfo.setAttribute("r", "10")
    const infoPath1 = document.createElementNS(svgNS, "path")
    infoPath1.setAttribute("d", "M12 16v-4")
    const infoPath2 = document.createElementNS(svgNS, "path")
    infoPath2.setAttribute("d", "M12 8h.01")
    svg.appendChild(circleInfo)
    svg.appendChild(infoPath1)
    svg.appendChild(infoPath2)
  }

  svg.setAttribute("stroke", type === "success" ? "#00c950" : type === "error" ? "#fb2c36" : "#2b7fff")

  toast.appendChild(svg)

  const text = document.createElement("span")
  text.className = "ml-2"
  text.textContent = message
  toast.appendChild(text)

  const bar = document.createElement("div")
  bar.className = `absolute bottom-0 left-0 w-full h-1 ${type === "success" ? "bg-green-500" : type === "error" ? "bg-rose-500" : "bg-blue-500"}`
  toast.appendChild(bar)

  document.body.appendChild(toast)
  gsap.to(bar, {width: 0, duration: 2.5, ease: "linear"})
  setTimeout(() => {
    gsap.to(toast, {opacity: 0, yPercent: 100, duration: 0.5, ease: "back.in(1.7)", onComplete: () => toast.remove()})
  }, 2500)
}
