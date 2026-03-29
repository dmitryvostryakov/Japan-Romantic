export type AvailabilityEntry = {
  available: boolean
  price?: string
  url?: string
  nextSlot?: string
}

export type AvailabilityData = {
  lastChecked: string
  hotels: Record<string, AvailabilityEntry>
  restaurants: Record<string, AvailabilityEntry>
  activities: Record<string, AvailabilityEntry>
}

export async function fetchAvailability(): Promise<AvailabilityData | null> {
  try {
    const res = await fetch('/availability.json')
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}
