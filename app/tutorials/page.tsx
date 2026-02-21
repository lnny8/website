import MoreSoon from "@/lib/components/moreSoon"
import Collection from "@/lib/pages/collection"
import ConstructionPage from "@/lib/pages/constructionPage"
import React from "react"
import {tutorials} from "@/lib/data/data"

export default function Page() {
  return (
    <main className="pb-20">
      <Collection title="Tutorials" description="My curated collection of tutorials and guides crafted for you." data={tutorials} />
      <MoreSoon />
    </main>
  )
}
