import { createClient } from '@supabase/supabase-js'
import type { TeamMember } from '@/types/teamMembers';

// 환경 변수 디버깅
console.log('Environment variables:', {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET'
})

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 환경 변수가 설정되지 않은 경우 에러 발생
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 방명록 관련 타입 정의
export interface GuestBookEntry {
  id: number
  sender: string
  message: string
  receiver: TeamMember
}

// 방명록 테이블 타입
export interface GuestBookTable {
  id: number
  sender: string
  message: string
  receiver: string
}
