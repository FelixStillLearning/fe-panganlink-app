export interface Entity {
  id: string
  createdAt: string
  updatedAt?: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
}
