"use client"

export default function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen bg-black text-white">
      <h1 className="text-4xl text-center pt-20">Welcome to the website</h1>
      <button className="bg-white rounded-2xl w-60 h-10 text-black mt-50" onClick={() => download("blackJack")}>Download blackJack.jar</button>
    </main>
  )
}

function download(fileName: string) {
  try {
    const link = document.createElement("a")
    if (fileName === "blackJack") {
      link.href = `/${fileName}.jar`
      link.download = `${fileName}.jar`
      link.style.display = "none"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } else {
      console.error(`Unknown file: ${fileName}`)
    }
  } catch (error) {
    console.error("Download failed:", error)
  }
}
