import type { TeamMember } from './teamMembers';

// 방명록 관련 타입 정의
export interface GuestBookEntry {
  id: number
  sender: string
  message: string
  receiver: TeamMember
}

export interface GuestBookFormData {
  sender: string
  message: string
  receiver: TeamMember
}
