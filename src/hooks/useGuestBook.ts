import { useState, useEffect, useCallback } from 'react'
import { supabase, type GuestBookEntry } from '@/lib/supabase'

export const useGuestBook = () => {
  const [entries, setEntries] = useState<GuestBookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 방명록 목록 가져오기 (GET 전용)
  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('id', { ascending: false })

      if (error) {
        throw error
      }

      setEntries(data || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : '방명록을 불러오는데 실패했습니다.')
      console.error('Error fetching guestbook entries:', err)
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
