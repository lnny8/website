import { applications } from '@/lib/data/data'
import Collection from '@/lib/pages/collection'
import React from 'react'

export default function Page() {
  return (
    <Collection title="Applications" description="A collection of my applications." data={applications} />
  )
}
