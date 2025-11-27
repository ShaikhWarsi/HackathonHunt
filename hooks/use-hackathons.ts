import useSWR from 'swr'
import { useEffect, useState } from 'react'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useHackathons() {
  const { data, error, isLoading } = useSWR(
    process.env.NEXT_PUBLIC_HACKATHONS_API_URL as string,
    fetcher,
  )

  const [hackathons, setHackathons] = useState(data?.hackathons || [])
  const [count, setCount] = useState(data?.count || 0)
  const [lastUpdated, setLastUpdated] = useState(data?.lastUpdated || '')

  useEffect(() => {
    if (data) {
      setHackathons(data.hackathons)
      setCount(data.count)
      setLastUpdated(data.lastUpdated)
    }
  }, [data])

  return {
    hackathons,
    count,
    lastUpdated,
    isLoading,
    error,
  }
}
