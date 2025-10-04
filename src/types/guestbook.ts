// 방명록 관련 타입 정의
export interface GuestBookEntry {
  id: number
  sender: string
  message: string
  receiver: string
}

export interface GuestBookFormData {
  sender: string
  message: string
  receiver: string
}
