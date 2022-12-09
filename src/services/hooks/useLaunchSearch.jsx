import { useEffect, useState } from 'react'
import { SpaceXRef } from '../utilities/axios'
import { QUERY_ENDPOINT } from '../constants/endpoints'

const useLaunchSearch = (query, page) => {
  const [loading, setLoading] = useState(true)
  const [launches, setLaunches] = useState([])
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setLaunches([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)

    const controller = new AbortController()

    SpaceXRef.post(
      QUERY_ENDPOINT,
      {
        query: {},
        options: {
          limit: 5,
          page: page,
        },
      },
      {
        signal: controller.signal,
      }
    )
      .then((res) => {
        setLaunches((prevLaunches) => [...prevLaunches, ...res.data.docs])
        setHasMore(res.data.docs.length > 0)
        setLoading(false)
      })
      .catch((err) => {
        err.name !== 'CanceledError' && setError(true)
      })

    return () => controller.abort()
  }, [query, page])

  return { launches, hasMore, loading, error }
}

export default useLaunchSearch
