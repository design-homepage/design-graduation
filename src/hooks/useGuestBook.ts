import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase, type GuestBookEntry } from '@/lib/supabase'

export const useGuestBook = () => {
  const [entries, setEntries] = useState<GuestBookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const cacheRef = useRef<{ data: GuestBookEntry[], timestamp: number } | null>(null)
  
  // 캐시 유효 시간 (5분)
  const CACHE_DURATION = 5 * 60 * 1000

  // 방명록 목록 가져오기 (최적화 + 캐싱)
  const fetchEntries = useCallback(async (forceRefresh = false) => {
    try {
      // 캐시 확인
      if (!forceRefresh && cacheRef.current) {
        const now = Date.now()
        const cacheAge = now - cacheRef.current.timestamp
        
        if (cacheAge < CACHE_DURATION) {
          console.log('Using cached data')
          setEntries(cacheRef.current.data)
          setLoading(false)
          return
        }
      }

      setLoading(true)
      setError(null)

      console.log('Fetching guestbook entries from Supabase...')
      
      // 1. 필요한 컬럼만 선택하여 데이터 전송량 최적화
      // 2. 페이지네이션으로 초기 로드 속도 향상
      const { data, error } = await supabase
        .from('guestbook')
        .select('id, sender, message, receiver')
        .order('id', { ascending: false })
        .limit(50) // 최대 50개만 로드

      console.log('Supabase response:', { data, error })

      if (error) {
        console.error('Supabase error details:', error)
        throw error
      }

      const newData = data || []
      setEntries(newData)
      
      // 캐시 업데이트
      cacheRef.current = {
        data: newData,
        timestamp: Date.now()
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : '방명록을 불러오는데 실패했습니다.')
      console.error('Error fetching guestbook entries:', err)
    } finally {
      setLoading(false)
    }
  }, [CACHE_DURATION])

  // 방명록 추가
  const addEntry = useCallback(async (entry: Omit<GuestBookEntry, 'id'>) => {
    try {
      setError(null)
      
      console.log('Adding guestbook entry:', entry)
      const { data, error } = await supabase
        .from('guestbook')
        .insert([entry])
        .select()
        .single()

      console.log('Supabase insert response:', { data, error })

      if (error) {
        console.error('Supabase insert error details:', error)
        throw error
      }

      if (data) {
        const newEntry = [data, ...entries]
        setEntries(newEntry)
        
        // 캐시 업데이트
        cacheRef.current = {
          data: newEntry,
          timestamp: Date.now()
        }
        
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
