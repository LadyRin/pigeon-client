import type { Event, PaginationResponse } from '@/types'

class EventService {
  events: Event[]
  event_types: string[]
  event_themes: string[]
  years: number[]

  constructor() {
    this.events = []
    this.event_types = []
    this.event_themes = []
    this.years = []
    this.fetchEvents()
  }

  fetchEvents() {
    return fetch('events.json')
      .then((response) => response.json())
      .then((data) => {
        this.events = data.events
        this.event_types = data.types
        this.event_themes = data.themes
        this.years = [...new Set(this.events.map((event) => new Date(event.date).getFullYear()))]
        return data
      })
  }

  getAllPaginated(
    per_page: number,
    current_page: number,
    search: string,
    filters: { year: string; eventType: string; theme: string }
  ): Promise<PaginationResponse> {
    if (this.events.length === 0) return this.fetchEvents().then(() => this.getAllPaginated(per_page, current_page, search, filters))

    return new Promise((resolve) => {
      const filtered = this.filterEvents(search, filters)
      const sorted = this.sortEvents(filtered)
      const paginated = sorted.slice((current_page - 1) * per_page, current_page * per_page)

      resolve({
        count: filtered.length,
        num_pages: Math.ceil(filtered.length / per_page),
        start_index: (current_page - 1) * per_page,
        end_index: current_page * per_page,
        results: paginated
      })
    })
  }

  private sortEvents(events: Event[]): Event[] {
    return events.sort((a, b) => new Date(a.date + 'T' + a.start_time).getTime() - new Date(b.date + 'T' + b.start_time).getTime())
  }

  private filterEvents(search: string, filters: { year: string; eventType: string; theme: string }): Event[] {
    let filtered = this.events

    if (search) {
      filtered = this.filterEventsBySearch(filtered, search)
    }

    if (filters.year) {
      filtered = this.filterEventsByYear(filtered, filters.year)
    }

    if (filters.eventType) {
      filtered = this.filterEventsByType(filtered, filters.eventType)
    }

    if (filters.theme) {
      filtered = this.filterEventsByTheme(filtered, filters.theme)
    }

    return filtered
  }

  private filterEventsBySearch(events: Event[], search: string): Event[] {
    return events.filter((event) => event.title.toLowerCase().includes(search.toLowerCase()))
  }

  private filterEventsByYear(events: Event[], year: string): Event[] {
    return events.filter((event) => new Date(event.date).getFullYear().toString() == year)
  }

  private filterEventsByType(events: Event[], type: string): Event[] {
    return events.filter((event) => event.event_type == type)
  }

  private filterEventsByTheme(events: Event[], theme: string): Event[] {
    return events.filter((event) => event.theme == theme)
  }
}

export const eventService = new EventService()
