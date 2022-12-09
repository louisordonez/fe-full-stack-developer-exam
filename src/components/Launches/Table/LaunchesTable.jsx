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

  const getLaunchData = () => {
    setIsLoading(true)
    axiosGet(LAUNCHES_ENDPOINT, HEADERS).then((response) => {
      setIsLoading(false)
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

    if (query === '') {
      getLaunchData()
    } else {
      const find = launches.find(
        (launch) => launch.flight_number.toString() === query
      )

      setLaunches([find])
    }
  }

  const showData = (data) => {
    return data.map((launch, index) => (
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
        {showData(launches)}
      </div>
    </>
  )
}

export default LaunchesTable
