import type { User } from '@/payload-types'
import type { ClientUser } from 'payload'

type AvailableRoles = User['roles'][number][]

export const canViewCollection =
  (requiredRoles: AvailableRoles) =>
  ({ user }: { user: ClientUser }): boolean => {
    if (!user) return true

    return user.roles?.some((role: AvailableRoles[0]) => requiredRoles.includes(role))
  }

// Return true to hide, false to show

export const cantViewCollection =
  (prohibitedRoles: AvailableRoles) =>
  ({ user }: { user: ClientUser }): boolean => {
    if (!user) return true

    const hasPrivilegedRole = user.roles?.some((role: AvailableRoles[0]) =>
      ['architect', 'management'].includes(role),
    )

    if (hasPrivilegedRole) return false

    return user.roles?.some((role: AvailableRoles[0]) => prohibitedRoles.includes(role))
  }
