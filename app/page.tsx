import Image from "next/image"
import {ChevronLeft, ChevronRight} from "lucide-react"
import {Navbar} from "./Navbar"
import MobileMenu from "./MobileMenu"
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Navbar />
      <MobileMenu />
      <div className="h-18" /> {/*Platzhalter für Navbar / MobileMenu */}
      <main className="flex-1">
        <section className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Column - Dark Blue Background */}
            <div className="bg-[#1a1060] text-white italic p-8 md:p-16 flex flex-col justify-center min-h-[500px]">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extralight mb-4">Erleben Sie</h2>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Höchstleistung: Unsere PIM-Lösung für die Industrie
              </h1>
              <p className="not-italic text-lg md:text-xl mt-auto">
                Alle Funktionen. Alle Kanäle.
                <br />
                Alle Plattformen. All unser Know-how.
              </p>
            </div>

            {/* Right Column - Light Blue Background with Robot Hand */}
            <div className="bg-[#7a9ac7] text-white p-8 md:p-16 flex flex-col justify-center relative min-h-[500px]">
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6">KI-Module</h2>
                <p className="text-lg md:text-xl mb-8">
                  KI-basierte Texterstellung, Bilderstellung, Übersetzung und vieles mehr
                </p>
                <a href="#" className="text-white hover:underline">
                  Mehr erfahren ...
                </a>
              </div>
              <div className="absolute inset-0 z-0">
                <Image
                  src="/crossbaseAI.png"
                  alt="Roboterhand und menschliche Hand"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#7a9ac7]/30"></div>
              </div>
          <button className="absolute -left-4 top-1/2 -translate-y-1/2  p-2 rounded-full z-10">
            <ChevronLeft className="h-16 w-16 text-white" />
          </button>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full z-10">
            <ChevronRight className="h-16 w-16 text-white" />
          </button>
            </div>
          </div>

          {/* Carousel Navigation */}
        </section>
        <section className="py-16 px-4">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Bild links */}
      <div>
        <div className="relative h-200 w-full">
          <Image
            src="/support.jpg"
            alt="Support"
            fill objectFit="contain"
          />
        </div>
      </div>

      {/* Texte rechts */}
      <div className="space-y-16">
        {/* Textblock: PIM-Software */}
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a1060] font-light mb-2">Einzigartige</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl text-[#1a1060] font-bold mb-8">PIM-Software.</h3>
          <div className="space-y-6 text-gray-700">
            <p>
              Die crossbase-Softwarelösung für Produktinformationsmanagement beinhaltet alle Module, die Sie für
              Management, Marketing, Produktdatenpflege, Übersetzung, Sales oder Engineering benötigen. crossbase
              arbeitet mit einer einzigen Datenbank als Single Source of Truth und kommt ohne überflüssige
              Schnittstellen zu Drittsystemen aus.
            </p>
            <p>
              Dadurch werden potenzielle IT-Probleme vermieden, der Supportbedarf im laufenden Betrieb ist minimal
              und die laufenden Kosten sind zuverlässig planbar. Mit ihrem modularen Aufbau, optionalen
              Erweiterungen und zwei umfassenden Releases pro Jahr ist crossbase eine zukunftsfähige Lösung.
            </p>
          </div>
        </div>

        {/* Textblock: Service */}
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a1060] font-light mb-2">Ausgezeichneter</h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl text-[#1a1060] font-bold mb-8">Service.</h3>
          <div className="space-y-6 text-gray-700 mb-8">
            <p>
              Mit garantierten Reaktions- und Lösungszeiten sorgen wir dafür, dass Sie selbstständig und
              reibungslos arbeiten können. Individuelle Anpassungen realisieren wir schnell, unkompliziert und
              zukunftsfähig. Und von Anfang an steht Ihnen Ihr persönlicher Ansprechpartner mit seinem ganzen
              Know-how zur Seite – während der Einführung und auch im laufenden Betrieb.
            </p>
          </div>
          <button className="bg-[#1a1060] hover:bg-[#2a1a80] text-white px-6 py-6 rounded-md text-lg">
            Jetzt persönliche Beratung vereinbaren
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

      
      </main>
    </div>
  )
}
