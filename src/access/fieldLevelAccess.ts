import type { User } from '@/payload-types'
import type { AccessArgs } from 'payload'

type AvailableRoles = User['roles'][number][]

export const showFieldForRoles =
  (allowedRoles: AvailableRoles) =>
  ({ req: { user } }: AccessArgs<User>): boolean => {
    if (!user) return false

    return user.roles?.some((role: AvailableRoles[0]) => allowedRoles.includes(role))
  }

export const hideFieldForRoles =
  (prohibitedRoles: AvailableRoles) =>
  ({ req: { user } }: AccessArgs<User>): boolean => {
    if (!user) return false

    const hasPrivilegedRole = user.roles?.some((role: AvailableRoles[0]) =>
      ['architect', 'management'].includes(role),
    )

    if (hasPrivilegedRole) return true

    return !user.roles?.some((role: AvailableRoles[0]) => prohibitedRoles.includes(role))
  }
