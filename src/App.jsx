import { useState, useRef, useCallback } from 'react'
import SearchInput from './components/SearchInput/SearchInput'
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

  const handleSearch = (event) => {
    setQuery(event.target.value)
    setPage(1)
  }

  return (
    <div className="app">
      <div className="launches">
        <SearchInput query={query} handleSearch={handleSearch} />
        <div className="launches-card">
          <div className="padding-bottom" />
          {launches.map((launch, index) => {
            if (launches.length === index + 1) {
              return (
                <div className="launches-card-container" ref={lastLaunchElementRef} key={index}>
                  <div className="launches-card-icon">
                    <img src={launch.links.flickr.original[0]} className="launches-card-icon-img" />
                  </div>
                  <div className="launches-card-info-container">
                    <div className="launches-card-info-header">
                      {launch.flight_number}: {launch.name} ({new Date(launch.date_utc).getFullYear()})
                    </div>
                    <div className="launches-card-info-details">Details: {launch.details}</div>
                  </div>
                </div>
              )
            } else {
              return (
                <div className="launches-card-container" key={index}>
                  <div className="launches-card-icon">
                    <img src={launch.links.flickr.original[0]} className="launches-card-icon-img" />
                  </div>
                  <div className="launches-card-info-container">
                    <div className="launches-card-info-header">
                      {launch.flight_number}: {launch.name} ({new Date(launch.date_utc).getFullYear()})
                    </div>
                    <div className="launches-card-info-details">Details: {launch.details}</div>
                  </div>
                </div>
              )
            }
          })}
        </div>
        {loading && <Spinner />}
        <div className="status">{error && 'Error'}</div>
        <div>{!loading && !hasMore && 'No more data'}</div>
      </div>
    </div>
  )
}

export default App
