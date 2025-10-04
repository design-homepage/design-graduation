import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
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
