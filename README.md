# 📱 Mobiles Menü mit Animation & Darkmode (Next.js + GSAP) - **Lonui für Crossbase**

Diese Komponente wurde von **Lonui** speziell für **Crossbase** entwickelt. Es handelt sich um ein **vollständig animiertes mobiles Menü** für Next.js-Projekte, das eine elegante Benutzererfahrung mit einer sanften Animation und einem Darkmode-Umschalter bietet.

## ✨ Features

- 🎬 **Animierter Menü-Button** (Burger → Kreuz) mit **GSAP**
- 📜 **Gestaffelte Animationen** für die Menülinks
- 🌘 **Darkmode-Umschalter** (integriert mit `next-themes`)
- 💨 **Smooth GSAP-Timelines** für sanftes Öffnen/Schließen
- ✅ **Mobile-first**, **responsive** und optimiert mit **Tailwind CSS**
- 🌍 Entwickelt von **Lonui** für das Projekt bei **Crossbase**

## ⚙️ Technologien

- [Next.js](https://nextjs.org/) für die Webentwicklung
- [GSAP](https://gsap.com/) für Animationen
- [next-themes](https://github.com/pacocoursey/next-themes) für den Darkmode
- [Tailwind CSS](https://tailwindcss.com/) für das Styling
- [Lucide Icons](https://lucide.dev/) für die Icons (optional)

## 🧠 Funktionsweise

- Beim Klick auf das Menü (Burger-Icon) wird das Menü mit einer **GSAP-Timeline** eingeblendet.
- Die Menü-Links erscheinen **gestaffelt**.
- Der Menü-Button verwandelt sich animiert von einem Burger-Icon zu einem Kreuz.
- Der **Darkmode-Schalter** wird animiert eingeblendet.
- Klickt der Benutzer auf einen Menüpunkt oder den Menü-Button, wird das Menü **rückwärts animiert**.

## ☀️ Darkmode

Der Darkmode-Umschalter ist vollständig in das Menü integriert und nutzt `next-themes` für eine einfache Implementierung. Er funktioniert sofort mit den **Tailwind**-Klassen (`dark:`) und lässt sich nahtlos in dein Design einfügen.

## 🛠️ To Do / Erweiterungen

- Optional: Erweiterung der Menüanimationen mit `Framer Motion`
- Anzeige von Icons für den Darkmode-Umschalter (`Sun`, `Moon`)
- Verbesserung der Tastatur-/ARIA-Zugänglichkeit
- Anpassungen für spezifische Crossbase-Projekte oder Designs

## 📁 Verzeichnisstruktur

```bash
/components
  └── MobileMenu.tsx   # Die Hauptkomponente
