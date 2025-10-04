// 방명록 관련 타입 정의
export interface GuestBookEntry {
  id: string
  name: string
  message: string
  email?: string
  created_at: string
  updated_at: string
}

export interface CreateGuestBookEntry {
  name: string
  message: string
  email?: string
}

export interface GuestBookFormData {
  name: string
  message: string
  email: string
}
