import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// 환경 변수가 설정되지 않은 경우 개발 모드에서 경고만 표시
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase environment variables not set. Using placeholder values.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 방명록 관련 타입 정의
export interface GuestBookEntry {
  id: number
  sender: string
  message: string
  receiver: string
}

// 방명록 테이블 타입
export interface GuestBookTable {
  id: number
  sender: string
  message: string
  receiver: string
}
