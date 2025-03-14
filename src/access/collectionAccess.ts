import type { User } from '@/payload-types'
import type { ClientUser } from 'payload'

//* Return true to hide, false to show

type AvailableRoles = User['roles'][number][]

export const showCollectionForRoles =
  (allowedRoles: AvailableRoles) =>
  ({ user }: { user: ClientUser }): boolean => {
    if (!user) return true

    return user.roles?.some((role: AvailableRoles[0]) => allowedRoles.includes(role))
  }

export const hideCollectionForRoles =
  (prohibitedRoles: AvailableRoles) =>
  ({ user }: { user: ClientUser }): boolean => {
    if (!user) return true

    const hasPrivilegedRole = user.roles?.some((role: AvailableRoles[0]) =>
      ['architect', 'management'].includes(role),
    )

    if (hasPrivilegedRole) return false

    return user.roles?.some((role: AvailableRoles[0]) => prohibitedRoles.includes(role))
  }
