'use client'

import type { User } from '@/payload-types'
import type { CollectionConfig, CollectionSlug, CustomComponent, Payload } from 'payload'
import { useAuth, useConfig } from '@payloadcms/ui'
import { useEffect, useState } from 'react'

type UserRole = User['roles'][number]

// type CollectionSlugs = keyof Payload['collections']
// need to omit the payload-locked-documents collection from CollectionSlugs
// type CollectionSlugs = Exclude<
//   keyof Payload['collections'],
//   'payload-locked-documents' | 'payload-migrations' | 'payload-preferences'
// >

type CollectionSlugs = Exclude<
  CollectionSlug,
  'payload-locked-documents' | 'payload-migrations' | 'payload-preferences'
>

type RoleCollectionMap = {
  [K in UserRole]: CollectionSlugs[]
}

type PrivledgedRoles = UserRole[]

const ROLE_COLLECTION_MAP: RoleCollectionMap = {
  architect: ['users', 'media', 'vehicle-research'],
  management: ['users', 'media', 'vehicle-research'],
  copywriter: ['media'],
  designer: ['media'],
  developer: ['media'],
  specialist: ['media', 'vehicle-research', 'users'],
}

const ROLE_PRIVLEDGED_ROLES: PrivledgedRoles = ['architect', 'management']

const RoleBasedSidebar = () => {
  const { user } = useAuth<User>()
  const { config } = useConfig()
  const [visibleCollections, setVisibleCollections] = useState<CollectionConfig[]>([])

  useEffect(() => {
    if (!user || !config.collections) return

    const userRoles = user.roles
    let allowedCollections = new Set<string>()

    userRoles.forEach((role) => {
      const collections = ROLE_COLLECTION_MAP[role] || []
      collections.forEach((col) => allowedCollections.add(col))
    })

    // const filteredCollections = config.collections.filter((col) => allowedCollections.has(col.slug))
    const filteredCollections = config.collections.filter((col) =>
      allowedCollections.has(col.slug),
    ) as CollectionConfig[]

    setVisibleCollections(filteredCollections)
  }, [])

  return (
    <nav>
      <ul>
        {visibleCollections.map((collection) => (
          <li key={collection.slug}>
            <a href={`/admin/collections/${collection.slug}`}>
              {/* {collection.labels?.singular || collection.slug} */}
              {typeof collection.labels?.singular === 'string'
                ? collection.labels.singular
                : collection.slug}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default RoleBasedSidebar
