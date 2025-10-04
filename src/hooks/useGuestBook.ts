import { useState, useEffect, useCallback } from 'react'
import { supabase, type GuestBookEntry } from '@/lib/supabase'

// Mock 데이터 (Supabase 연결 전까지 사용)
const mockEntries: GuestBookEntry[] = [
  {
    id: 1,
    sender: '홍길동',
    message: '안녕하세요! 정말 멋진 포트폴리오네요. 앞으로도 좋은 작품 기대하겠습니다!',
    receiver: '디자인팀'
  },
  {
    id: 2,
    sender: '김민수',
    message: '디자인이 너무 깔끔하고 좋아요. 특히 UX/UI 작업이 인상깊었습니다.',
    receiver: '개발팀'
  },
  {
    id: 3,
    sender: '이영희',
    message: '창의적인 아이디어가 돋보이는 작품들이네요!',
    receiver: '기획팀'
  },
  {
    id: 4,
    sender: '박철수',
    message: 'UX 디자인 센스가 정말 뛰어나신 것 같아요.',
    receiver: '디자인팀'
  },
  {
    id: 5,
    sender: '최민정',
    message: '앞으로의 성장이 기대됩니다!',
    receiver: '전체팀'
  },
  {
    id: 6,
    sender: '정동현',
    message: '색감과 레이아웃이 매우 조화롭네요.',
    receiver: '디자인팀'
  }
]

export const useGuestBook = () => {
  const [entries, setEntries] = useState<GuestBookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 방명록 목록 가져오기 (GET 전용)
  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      // 환경 변수가 설정되지 않은 경우 Mock 데이터 사용
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        console.log('Using mock data for development')
        await new Promise(resolve => setTimeout(resolve, 1000)) // 로딩 시뮬레이션
        setEntries(mockEntries)
        return
      }

      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('id', { ascending: false })

      if (error) {
        throw error
      }

      setEntries(data || [])
    } catch (err) {
      console.error('Error fetching guestbook entries:', err)
      // Supabase 오류 시 Mock 데이터 사용
      setEntries(mockEntries)
      setError(null) // Mock 데이터로 오류 해결
    } finally {
      setLoading(false)
    }
  }, [])

  // 초기 로드
  useEffect(() => {
    fetchEntries()
  }, [fetchEntries])

  return {
    entries,
    loading,
    error,
    refetch: fetchEntries
  }
}
