export interface Event {
  id: number
  title: string
  event_type: string
  theme: string
  speaker_first_name: string
  speaker_last_name: string
  speaker_from: string
  speaker_comment: string
  date: string
  start_time: string
  end_time: string
  description: string
  location?: string
}

export interface PaginationResponse {
  count: number
  num_pages: number
  start_index: number
  end_index: number
  results: Array<any>
}
