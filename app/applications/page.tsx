import { applications } from '@/lib/data/data'
import Collection from '@/lib/pages/collection'
import React from 'react'

export default function Page() {
  return (
    <Collection title="Applications" description="A collection of simple useful applications I made because I couldn't find them elsewhere" data={applications} />
  )
}
