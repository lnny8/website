import {projects} from "@/lib/data/data"
import Collection from "@/lib/pages/collection"
import React from "react"

export default function Page() {
  return <Collection title="Projects" description="A collection of my work and experiences." data={projects} />
}
