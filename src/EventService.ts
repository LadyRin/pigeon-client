import type { Event, PaginationResponse } from '@/types'

class EventService {
  events: Event[]

  constructor() {
    this.events = []
    this.fetchEvents()
  }

  fetchEvents() {
    return fetch('events.json')
      .then((response) => response.json())
      .then((data) => {
        this.events = data
        return data
      })
  }

  getAllPaginated(per_page: number, current_page: number, search: string): Promise<PaginationResponse> {
    if (this.events.length === 0) return this.fetchEvents().then(() => this.getAllPaginated(per_page, current_page, search))

    return new Promise((resolve) => {
      const filtered = this.events
        .filter((event) => {
          return event.title.includes(search)
        })
        .slice((current_page - 1) * per_page, current_page * per_page)

      resolve({
        count: this.events.length,
        num_pages: Math.ceil(this.events.length / per_page),
        start_index: (current_page - 1) * per_page,
        end_index: current_page * per_page,
        results: filtered
      })
    })
  }
}

export const eventService = new EventService()
