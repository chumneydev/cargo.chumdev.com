import type { User } from '@/payload-types'
import type { AccessArgs, ClientUser } from 'payload'

export const isProhibitedFromViewing = (
  prohibitedRoles: User['roles'][number][],

  { req }: AccessArgs<User>,
): boolean => {
  const { user } = req

  if (!user) return true

  const hasPrivilegedRole = user.roles.some((role) => role.includes('architect'))

  if (hasPrivilegedRole) return true

  return !user.roles.some((role) => prohibitedRoles.includes(role))
}
