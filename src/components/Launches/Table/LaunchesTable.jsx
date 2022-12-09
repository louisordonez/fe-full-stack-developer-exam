import { useState, useEffect } from 'react'
import './LaunchesTable.css'
import { LAUNCHES_ENDPOINT } from '../../../services/constants/endpoints'
import { HEADERS } from '../../../services/constants/headers'
import { axiosGet } from '../../../services/utilities/axios'
import SearchInput from '../Input/SearchInput'

const LaunchesTable = () => {
  const [launches, setLaunches] = useState([])
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getLaunchData()
  }, [])

  useEffect(() => {}, [search])

  const getLaunchData = () => {
    axiosGet(LAUNCHES_ENDPOINT, HEADERS).then((response) => {
      if (response.status === 200) {
        setLaunches(response.data)
      } else {
        alert(response.message)
      }
    })
  }

  const handleSearch = (event) => {
    const query = event.target.value.trim()

    setSearch(query)
  }

  const showSearch = () => {
    const filter = launches.filter((launch) => {
      return (
        launch.flight_number.toString().includes(search) ||
        launch.name.toString().toLowerCase().includes(search.toLowerCase()) ||
        new Date(launch.date_unix).getFullYear().toString().includes(search)
      )
    })

    if (filter.length === 0) {
      return (
        <div className="launches-table-container">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
          >
            <div>No data</div>
          </div>
        </div>
      )
    } else {
      return filter.map((launch, index) => (
        <div className="launches-table-container" key={index}>
          <div className="launches-table-icon">
            <img
              src={launch.links.flickr.original[0]}
              className="launches-table-icon-img"
            />
          </div>
          <div className="launches-table-info-container">
            <div className="launches-table-info-header">
              {launch.flight_number}: {launch.name} (
              {new Date(launch.date_unix).getFullYear()})
            </div>
            <div className="launches-table-info-details">
              Details: {launch.details}
            </div>
          </div>
        </div>
      ))
    }
  }

  const showData = () => {
    return launches.map((launch, index) => (
      <div className="launches-table-container" key={index}>
        <div className="launches-table-icon">
          <img
            src={launch.links.flickr.original[0]}
            className="launches-table-icon-img"
          />
        </div>
        <div className="launches-table-info-container">
          <div className="launches-table-info-header">
            {launch.flight_number}: {launch.name} (
            {new Date(launch.date_unix).getFullYear()})
          </div>
          <div className="launches-table-info-details">
            Details: {launch.details}
          </div>
        </div>
      </div>
    ))
  }

  return (
    <>
      <SearchInput search={search} handleSearch={handleSearch} />
      <div className="launches-table">
        <div style={{ paddingBottom: '3rem' }}></div>
        {search === '' ? showData() : showSearch()}
      </div>
    </>
  )
}

export default LaunchesTable
