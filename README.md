```markdown
# Mobile Menu Component

Dies ist eine mobile Menü-Komponente für eine Webanwendung, die mit `React`, `GSAP` für Animationen und `Next.js` als Framework erstellt wurde. Die Komponente enthält eine Hamburger-Menü-Animation, mehrere Menüebenen (Hauptmenü, Untermenü, und tiefere Ebenen), sowie Übergänge zwischen den Menüs. Sie ermöglicht es, ein responsives, interaktives Menü zu erstellen, das für mobile Geräte optimiert ist.

## Features

- **Hamburger-Menü**: Der Menübutton animiert sich zu einem "X", wenn das Menü geöffnet ist.
- **Mehrere Menüebenen**: Das Menü unterstützt bis zu drei Ebenen von Untermenüs.
- **Animationen**: Alle Menüs und Übergänge werden mit `GSAP` animiert, um ein flüssiges Benutzererlebnis zu bieten.
- **Responsive**: Die Komponente ist für mobile Geräte (max. `md` Bildschirmgröße) optimiert.
- **Menüstruktur**: Basierend auf Daten aus einer externen Datei (`menuData`), die die Menüstruktur definiert.

## Installation

Um die `MobileMenu`-Komponente in deinem Projekt zu verwenden, folge diesen Schritten:

1. Installiere die notwendigen Abhängigkeiten:

```bash
npm install gsap lucide-react
```

2. Kopiere die Komponente und die dazugehörigen Dateien in dein Projekt.

3. Importiere und verwende die `MobileMenu`-Komponente in deinem Projekt:

```jsx
import MobileMenu from './components/MobileMenu'

const App = () => {
  return (
    <div>
      <MobileMenu />
    </div>
  )
}

export default App
```

## Funktionalität

### Menüöffnen und -schließen

- Beim Klick auf das Hamburger-Menü wird das Hauptmenü geöffnet. Gleichzeitig wird die Hamburger-Icon-Animation abgespielt, um das Öffnen visuell darzustellen.
- Alle Menüebenen können durch Klicken auf einen "Back"-Button oder auf den Hintergrund geschlossen werden.

### Hauptmenü (1. Ebene)

- Das Hauptmenü enthält mehrere Tabs, die jeweils ein Untermenü öffnen.
- Jedes Menüelement ist anklickbar und führt zu weiteren Menüebenen oder einer externen Seite.

### Untermenü (2. Ebene)

- Wenn ein Tab aus dem Hauptmenü angeklickt wird, wird das Untermenü angezeigt.
- Untermenüs können Links zu tiefer verschachtelten Seiten enthalten (Tiefes Menü), oder zu externen Seiten navigieren.

### Tiefes Menü (3. Ebene)

- Wenn ein Tab aus dem Untermenü ein "Deep Page" hat, wird ein weiteres Menü (das tiefe Menü) angezeigt.
- Es ermöglicht den Zugriff auf noch tiefere Ebenen der Navigation.

### Zurück-Button

- Der Zurück-Button ermöglicht das Zurückspringen zu einer höheren Menüebene (je nachdem, ob der Benutzer sich im Hauptmenü, Untermenü oder tiefen Menü befindet).

## Verwendung

Die Menüstruktur wird aus einer externen `menuData`-Datei geladen. Diese Datei enthält alle Informationen über die Tabs, Unterseiten und tiefen Seiten. Hier ein Beispiel:

```javascript
const menuData = [
  {
    name: "Tab 1",
    subPages: [
      {
        name: "Sub Page 1-1",
        path: "/subpage-1-1",
      },
      {
        name: "Sub Page 1-2",
        deepPages: [
          {
            name: "Deep Page 1-2-1",
            path: "/deep-page-1-2-1",
          },
        ],
      },
    ],
  },
  {
    name: "Tab 2",
    subPages: [
      {
        name: "Sub Page 2-1",
        path: "/subpage-2-1",
      },
    ],
  },
];

export default menuData;
```

### Menüstruktur

Die Struktur des Menüs basiert auf den folgenden Daten:

- **name**: Der Name des Tabs oder der Seite, der im Menü angezeigt wird.
- **subPages**: Unterseiten, die bei Klick auf den Tab angezeigt werden.
- **deepPages**: Optional tiefere Seiten, die im Untermenü angezeigt werden.

## Styling

Die Komponente verwendet TailwindCSS für das Styling. Hier sind die wichtigsten Klassen, die verwendet werden:

- `w-full`, `h-full`: Die Menü-Container nehmen die volle Bildschirmhöhe und -breite ein.
- `absolute`, `inset-0`: Positioniert das Menü absolut innerhalb des Containers.
- `text-[#180c6c]`: Definiert die Textfarbe für die Menüelemente.
- `cursor-pointer`: Stellt sicher, dass die Menüelemente klickbar sind.
- `transition-colors`: Übergänge für Farbänderungen bei Interaktionen.

## Animationen

Die Animationen werden mit `GSAP` erstellt und gesteuert. Es gibt mehrere Zeitachsen (Timelines) für verschiedene Animationen:

- **Hamburger-Button**: Die Linien des Hamburger-Menüs bewegen sich zu einem "X", wenn das Menü geöffnet wird.
- **Hauptmenü**: Das Hauptmenü erscheint von oben mit einer Verzögerung für jedes Element.
- **Untermenü**: Das Untermenü erscheint von der Seite, wenn ein Tab angeklickt wird.
- **Tiefes Menü**: Das tiefe Menü erscheint ebenfalls von der Seite, wenn ein tiefer Tab angeklickt wird.

## Funktionsweise der Funktionen

### `handleMenuClick()`

- Öffnet das Menü, wenn es geschlossen ist und schließt es, wenn es offen ist.
- Steuert die Animationen des Hamburger-Buttons und des Hauptmenüs.

### `handleTabClick()`

- Wird aufgerufen, wenn ein Tab im Hauptmenü angeklickt wird.
- Öffnet das Untermenü für den ausgewählten Tab.

### `handleSubTabClick()`

- Wird aufgerufen, wenn ein Tab im Untermenü angeklickt wird.
- Öffnet entweder ein tieferes Menü oder navigiert zu einer externen Seite.

### `handleBackClick()`

- Wird aufgerufen, wenn der Zurück-Button im Menü angeklickt wird.
- Navigiert zurück zu einer höheren Menüebene.