import type { VehicleResearch } from '@/payload-types'
import type { FieldHook } from 'payload'

type ResearchTitleHook = FieldHook<VehicleResearch, string, string>

const populateResearchTitle: ResearchTitleHook = async (args) => {
  const { data } = args

  if (!data) return ''

  const capitalizedManufacturer = data.manufacturer
    ?.split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('')

  return `${data.year} ${capitalizedManufacturer} ${data.model}`
}

export default populateResearchTitle
