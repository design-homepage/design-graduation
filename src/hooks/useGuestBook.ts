import { useState, useEffect, useCallback } from 'react'
import { supabase, type GuestBookEntry } from '@/lib/supabase'

export const useGuestBook = () => {
  const [entries, setEntries] = useState<GuestBookEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 방명록 목록 가져오기
  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { data, error } = await supabase
        .from('guestbook')
        .select('*')
        .order('created_at', { ascending: false })

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

  // 방명록 추가
  const addEntry = useCallback(async (entry: Omit<GuestBookEntry, 'id' | 'created_at' | 'updated_at'>) => {
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
        setEntries(prev => [data, ...prev])
        return data
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '방명록 추가에 실패했습니다.'
      setError(errorMessage)
      console.error('Error adding guestbook entry:', err)
      throw new Error(errorMessage)
    }
  }, [])

  // 방명록 삭제
  const deleteEntry = useCallback(async (id: string) => {
    try {
      setError(null)
      
      const { error } = await supabase
        .from('guestbook')
        .delete()
        .eq('id', id)

      if (error) {
        throw error
      }

      setEntries(prev => prev.filter(entry => entry.id !== id))
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '방명록 삭제에 실패했습니다.'
      setError(errorMessage)
      console.error('Error deleting guestbook entry:', err)
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
    deleteEntry,
    refetch: fetchEntries
  }
}
