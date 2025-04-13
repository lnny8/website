const menuData = [
    {
      name: "Anforderungen",
      subPages: [
        {name: "Management", path: "/anforderungen/management"},
        {name: "Marketing", path: "/anforderungen/marketing"},
        {name: "Produktdatenpflege", path: "/anforderungen/produktdatenpflege"},
        {name: "Übersetzung / Lokalisierung", path: "/anforderungen/uebersetzung-lokalisierung"},
        {name: "E-Commerce / Verkauf", path: "/anforderungen/e-commerce-verkauf"},
        {name: "Engineering", path: "/anforderungen/engineering"},
      ],
    },
    {
      name: "Produkte",
      subPages: [
        {name: "Vorteile", path: "/produkte/produkt-1"},
        {name: "Editionen", path: "/produkte/produkt-2"},
        {name: "KI", path: "/produkte/produkt-3"},
        {name: "Anwendungsmodule", path: "/produkte/produkt-4"},
        {
          name: "Basismodule",
          subsubPages: [
            {name: "Datenbank-Basismodul", path: "/test"},
            {name: "Mehrsprachige Oberfläche", path: "/test"},
            {name: "Web-Applikationsserver", path: "/test"},
            {name: "Datenhub und Prozessmonitor", path: "/test"},
          ],
        },
        {
          name: "Datenimport",
          subsubPages: [
            {name: "ERP-Schnittstelle", path: "/test"},
            {name: "Datenimport-Konfigurator", path: "/test"},
          ],
        },
        {
          name: "PIM und MAM",
          subsubPages: [
            {name: "Produktdatenbank", path: "/test"},
            {name: "Media Asset Manager", path: "/test"},
            {name: "Textverwaltung", path: "/test"},
            {name: "Channel Output Manager", path: "/test"},
            {name: "Workflowmanagement", path: "/test"},
          ],
        },
        {
          name: "Übersetzung",
          subsubPages: [
            {name: "Übersetzungsmanagement", path: "/test"},
            {name: "Onlineübersetzung", path: "/test"},
          ],
        },
        {
          name: "Datenbereitstellung",
          subsubPages: [
            {name: "Datenexport E-Kataloge", path: "/test"},
            {name: "API-Server", path: "/test"},
            {name: "Sales Information Service", path: "/test"},
          ],
        },
        {
          name: "Online",
          subsubPages: [
            {name: "Headless CMS", path: "/test"},
            {name: "Onlinekatalog", path: "/test"},
            {name: "Medienservice", path: "/test"},
            {name: "Mobile Anwendungen", path: "/test"},
          ],
        },
        {
          name: "Print",
          subsubPages: [
            {name: "Print Publishing", path: "/test"},
            {name: "Office-Anbindung", path: "/test"},
          ],
        },
      ],
    },
    {
      name: "Service",
      subPages: [
        {name: "Umsetzung", path: "/service/umsetzung"},
        {name: "Beratung & Support", path: "/service/beratung-support"},
        {name: "Schulungen", path: "/service/schulungen"},
        {name: "IT-Systemanforderungen", path: "/service/it-systemanforderungen"},
      ],
    },
    {
      name: "Kunden",
      subPages: [
        {name: "Kundenübersicht", path: "/kunden/kundenuebersicht"},
        {name: "Maschinenbau und Elektronik", path: "/kunden/maschinenbau-elektronik"},
        {name: "Bauelemente und Baustoffe", path: "/kunden/bauelemente-baustoffe"},
        {name: "Medizintechnik", path: "/kunden/medizintechnik"},
        {name: "Konsumgüter", path: "/kunden/konsumgueter"},
      ],
    },
    {
      name: "Wissen",
      subPages: [
        {name: "Blog", path: "/wissen/blog"},
        {name: "PIM-Leitfaden", path: "/wissen/pim-leitfaden"},
        {name: "crossbase Lösungen", path: "/wissen/crossbase-loesungen"},
        {
          name: "Kundenprojekte",
          path: "/wissen/kundenprojekte",
          subsubPages: [
            {name: "E-Commerce", path: "/test"},
            {name: "Onlinekatalog", path: "/test"},
            {name: "Medienservice", path: "/test"},
            {name: "Print und PDF", path: "/test"},
          ],
        },
        {
          name: "Case Studies",
          subsubPages: [
            {name: "Case Studies E-Commerce", path: "/test"},
            {name: "Case Studies Print", path: "/test"},
          ],
        },
        {name: "Video", path: "/wissen/video"},
      ],
    },
    {
      name: "Unternehmen",
      subPages: [
        {name: "Über uns", path: "/unternehmen/ueber-uns"},
        {name: "Neuigkeiten", path: "/unternehmen/neuigkeiten"},
        {
          name: "Karriere",
          subsubPages: [
            {name: "Offene Stellen", path: "/test"},
            {name: "Arbeiten bei crossbase", path: "/test"},
            {name: "Studierende", path: "/test"},
            {name: "Absolventen", path: "/test"},
          ],
        },
        {name: "Partner", path: "/unternehmen/partner"},
        {name: "crossbase for kids", path: "/unternehmen/crossbase-for-kids"},
      ],
    },
  ]
  
  export default menuData