import { useState, useRef, useCallback } from 'react'
import SearchInput from './components/SearchInput/SearchInput'
import LaunchesCard from './components/LaunchesCard/LaunchesCard'
import Spinner from './components/Spinner/Spinner'
import useLaunchSearch from './services/hooks/useLaunchSearch'
import './App.css'

const App = () => {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const { launches, hasMore, loading, error } = useLaunchSearch(query, page)

  const observer = useRef()
  const lastLaunchElementRef = useCallback(
    (node) => {
      if (loading) return

      if (observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })

      if (node) observer.current.observe(node)
    },
    [loading, hasMore]
  )

  const handleVisibility = (data) => (data.length === 0 ? 'hidden' : 'visible')

  const handleSearch = (event) => {
    setQuery(event.target.value)
    setPage(1)
  }

  return (
    <div className="app">
      <div className="launches">
        <SearchInput query={query} handleSearch={handleSearch} />
        <div className="launches-card" style={{ visibility: handleVisibility(launches) }}>
          <div className="padding-bottom" style={{ visibility: handleVisibility(launches) }} />
          {launches.map((launch, index) => {
            return (
              <div ref={launches.length === index + 1 ? lastLaunchElementRef : null} key={index}>
                <LaunchesCard launch={launch} />
              </div>
            )
          })}
        </div>
        <div className={`center ${launches.length !== 0 && 'margin-top padding-bottom'}`}>{loading && <Spinner />}</div>
        <div className="status">{error && 'Error'}</div>
        <div className="status">{!loading && !hasMore && 'No more data'}</div>
      </div>
    </div>
  )
}

export default App
