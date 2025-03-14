import { selectManufacturer } from '@/fields/selectManufacturer'
import type { CollectionConfig } from 'payload'
import populateResearchTitle from './hooks/populateResearchTitle'

export const VehicleResearch: CollectionConfig = {
  slug: 'vehicle-research',
  labels: {
    singular: 'Vehicle Research',
    plural: 'Vehicle Research',
  },
  admin: {
    group: 'Research',
    useAsTitle: 'researchTitle',
    description: 'Research on vehicles',
    defaultColumns: ['researchTitle', 'year', 'manufacturer', 'model'],
  },
  fields: [
    {
      name: 'researchTitle',
      type: 'text',
      defaultValue: '[Research Title]',
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            siblingData.researchTitle = undefined
          },
        ],
        afterRead: [populateResearchTitle],
      },
      admin: {
        hidden: true,
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Details',
          description: 'Basic vehicle details',
          fields: [
            {
              name: 'year',
              type: 'select',
              defaultValue: new Date().getFullYear().toString(),
              options: Array.from({ length: new Date().getFullYear() - 2000 + 1 }, (_, i) => ({
                label: (new Date().getFullYear() - i).toString(),
                value: (new Date().getFullYear() - i).toString(),
              })),
            },
            selectManufacturer({}),
            {
              name: 'model',
              type: 'text',
              label: 'Model',
              required: true,
            },
          ],
        },
        {
          name: 'trims',
          label: 'La',
          description: 'Layout of the vehicle',
          fields: [],
        },
        {
          name: 'layout',
          label: 'Layout',
          description: 'Layout of the vehicle',
          fields: [],
        },
      ],
    },
    {
      name: 'specialist',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      required: true,
      defaultValue: ({ user }) => {
        if (!user || !user.id) return undefined

        if (!user.roles.includes('specialist')) return []

        return [user.id]
      },
      filterOptions: ({ user }) => {
        if (!user || !user.id) return false

        return {
          roles: {
            equals: 'specialist ',
          },
        }
      },
      admin: {
        position: 'sidebar',
      },
    },

    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'active',
      hasMany: false,
      required: true,
      admin: {
        position: 'sidebar',
      },
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Inactive',
          value: 'inactive',
        },
      ],
    },
  ],
}
