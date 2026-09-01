import { useState, useEffect, useCallback } from 'react'
import { supabase, type GuestBookEntry } from '@/lib/supabase'

// 캐시 유효 시간 (5분)
const CACHE_DURATION = 5 * 60 * 1000

// 모듈 레벨 캐시: 다른 페이지에 갔다 돌아와도 유지되어 재방문 시 즉시 렌더링된다
let cache: { data: GuestBookEntry[]; timestamp: number } | null = null

export const useGuestBook = () => {
  const [entries, setEntries] = useState<GuestBookEntry[]>(() => cache?.data ?? [])
  const [loading, setLoading] = useState(() => cache === null)
  const [error, setError] = useState<string | null>(null)

  // 방명록 목록 가져오기 (캐시가 있으면 먼저 보여주고 만료 시 백그라운드 갱신)
  const fetchEntries = useCallback(async (forceRefresh = false) => {
    if (!forceRefresh && cache && Date.now() - cache.timestamp < CACHE_DURATION) {
      setEntries(cache.data)
      setLoading(false)
      return
    }

    try {
      // 보여줄 캐시가 하나도 없을 때만 로딩 스피너 노출
      if (!cache) {
        setLoading(true)
      }
      setError(null)

      // 필요한 컬럼만 선택하여 데이터 전송량 최적화
      const { data, error } = await supabase
        .from('guestbook')
        .select('id, sender, message, receiver')
        .order('id', { ascending: false })

      if (error) {
        throw error
      }

      const newData = data || []
      setEntries(newData)
      cache = { data: newData, timestamp: Date.now() }
    } catch (err) {
      setError(err instanceof Error ? err.message : '방명록을 불러오는데 실패했습니다.')
      console.error('Error fetching guestbook entries:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  // 방명록 추가
  const addEntry = useCallback(async (entry: Omit<GuestBookEntry, 'id'>) => {
    try {
      setError(null)

      const { data, error } = await supabase
        .from('guestbook')
        .insert([entry])
        .select()
        .single()

      if (error) {
        throw error
      }

      if (data) {
        setEntries(prev => {
          const newEntries = [data, ...prev]
          cache = {
            data: newEntries,
            timestamp: Date.now()
          }
          return newEntries
        })

        return data
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '방명록 추가에 실패했습니다.'
      setError(errorMessage)
      console.error('Error adding guestbook entry:', err)
      throw new Error(errorMessage)
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
    addEntry,
    refetch: fetchEntries,
    forceRefresh: () => fetchEntries(true) // 강제 새로고침
  }
}
