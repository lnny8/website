import MoreSoon from "@/lib/components/moreSoon"
import Collection from "@/lib/pages/collection"
import ConstructionPage from "@/lib/pages/constructionPage"
import React from "react"

export default function Page() {
  return (
    <main>
      <Collection title="Tutorials" description="My curated collection of tutorials and guides crafted for you." data={[]} />
      <MoreSoon />
    </main>
  )
}
