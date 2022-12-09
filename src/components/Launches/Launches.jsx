import { useState, useRef, useCallback } from 'react'
import './Launches.css'
import SearchInput from './Input/SearchInput'
import useLaunchSearch from '../../services/hooks/useLaunchSearch'

const Launches = () => {
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

  return (
    <div className="launches">
      <SearchInput />
      <div className="launches-table">
        <div style={{ paddingBottom: '3rem' }} />
        {launches.map((launch, index) => {
          if (launches.length === index + 1) {
            return (
              <div className="launches-table-container" ref={lastLaunchElementRef} key={index}>
                <div className="launches-table-icon">
                  <img src={launch.links.flickr.original[0]} className="launches-table-icon-img" />
                </div>
                <div className="launches-table-info-container">
                  <div className="launches-table-info-header">
                    {launch.flight_number}: {launch.name} ({new Date(launch.date_utc).getFullYear()})
                  </div>
                  <div className="launches-table-info-details">Details: {launch.details}</div>
                </div>
              </div>
            )
          } else {
            return (
              <div className="launches-table-container" key={index}>
                <div className="launches-table-icon">
                  <img src={launch.links.flickr.original[0]} className="launches-table-icon-img" />
                </div>
                <div className="launches-table-info-container">
                  <div className="launches-table-info-header">
                    {launch.flight_number}: {launch.name} ({new Date(launch.date_utc).getFullYear()})
                  </div>
                  <div className="launches-table-info-details">Details: {launch.details}</div>
                </div>
              </div>
            )
          }
        })}
      </div>
      <div style={{ width: '100%', textAlign: 'center', marginTop: '3rem' }}>{loading && 'Loading...'}</div>
      <div style={{ width: '100%', textAlign: 'center', marginTop: '3rem' }}>{error && 'Error'}</div>
      <div style={{ width: '100%', textAlign: 'center', marginTop: '3rem' }}>{!hasMore && 'No more data'}</div>
    </div>
  )
}

export default Launches
