// import { cantViewCollection, canViewCollection } from '@/access/canViewCollection'
import { hideCollectionForRoles } from '@/access/collectionAccess'
// import { isProhibitedFromViewing } from '@/access/isProhibitedFromViewing'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    hidden: hideCollectionForRoles(['copywriter', 'designer', 'developer', 'specialist']),
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['specialist'],
      options: [
        { label: 'Architect', value: 'architect' },
        { label: 'Management', value: 'management' },
        { label: 'Copywriter', value: 'copywriter' },
        { label: 'Designer', value: 'designer' },
        { label: 'Developer', value: 'developer' },
        { label: 'Specialist', value: 'specialist' },
      ],
    },
  ],
}
