const menuData = [
    {
      name: "Anforderungen",
      path: "/anforderungen",
      directLink: true,
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
      path: "/produkte",
      subPages: [
        {name: "Vorteile", path: "/produkte/produkt-1"},
        {name: "Editionen", path: "/produkte/produkt-2"},
        {name: "KI", path: "/produkte/produkt-3"},
        {name: "Anwendungsmodule", path: "/produkte/produkt-4"},
        {
          name: "Basismodule",
          path: "/produkte/produkt-5",
          subsubPages: [
            {name: "Datenbank-Basismodul", path: "/test"},
            {name: "Mehrsprachige Oberfläche", path: "/test"},
            {name: "Web-Applikationsserver", path: "/test"},
            {name: "Datenhub und Prozessmonitor", path: "/test"},
          ],
        },
        {
          name: "Datenimport",
          path: "/produkte/produkt-5",
          subsubPages: [
            {name: "ERP-Schnittstelle", path: "/test"},
            {name: "Datenimport-Konfigurator", path: "/test"},
          ],
        },
        {
          name: "PIM und MAM",
          path: "/produkte/produkt-5",
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
          path: "/produkte/produkt-5",
          subsubPages: [
            {name: "Übersetzungsmanagement", path: "/test"},
            {name: "Onlineübersetzung", path: "/test"},
          ],
        },
        {
          name: "Datenbereitstellung",
          path: "/produkte/produkt-5",
          subsubPages: [
            {name: "Datenexport E-Kataloge", path: "/test"},
            {name: "API-Server", path: "/test"},
            {name: "Sales Information Service", path: "/test"},
          ],
        },
        {
          name: "Online",
          path: "/produkte/produkt-5",
          subsubPages: [
            {name: "Headless CMS", path: "/test"},
            {name: "Onlinekatalog", path: "/test"},
            {name: "Medienservice", path: "/test"},
            {name: "Mobile Anwendungen", path: "/test"},
          ],
        },
        {
          name: "Print",
          path: "/produkte/produkt-5",
          subsubPages: [
            {name: "Print Publishing", path: "/test"},
            {name: "Office-Anbindung", path: "/test"},
          ],
        },
      ],
    },
    {
      name: "Service",
      path: "/service",
      subPages: [
        {name: "Umsetzung", path: "/service/umsetzung"},
        {name: "Beratung & Support", path: "/service/beratung-support"},
        {name: "Schulungen", path: "/service/schulungen"},
        {name: "IT-Systemanforderungen", path: "/service/it-systemanforderungen"},
      ],
    },
    {
      name: "Kunden",
      path: "/kunden",
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
      path: "/wissen",
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
          path: "/wissen/case-studies",
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
      path: "/unternehmen",
      subPages: [
        {name: "Über uns", path: "/unternehmen/ueber-uns"},
        {name: "Neuigkeiten", path: "/unternehmen/neuigkeiten"},
        {
          name: "Karriere",
          path: "/unternehmen/karriere",
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