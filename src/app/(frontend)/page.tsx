import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
//
export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  return (
    <div className="mx-auto mt-12 max-w-7xl py-2">
      {!user && (
        <div className="border-b border-gray-950/5 pb-6">
          <h2 className="text-4xl font-bold">Cargo is coming soon!</h2>
        </div>
      )}
      {user && (
        <div className="border-b border-gray-950/5">
          <h1>Welcome {user.email}!</h1>
          <p>Head over to the admin panel to get started. A wonderful new world awaits you!</p>
        </div>
      )}

      <p className="mt-4">
        This is probably broken, but our devs are working on it! In the meantime, go bother Ryan
      </p>
    </div>
  )
}
