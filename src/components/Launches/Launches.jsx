import { useState, useEffect } from 'react'
import SearchInput from './Input/SearchInput'
import LaunchesTable from './Table/LaunchesTable'
import './Launches.css'
import { LAUNCHES_ENDPOINT } from '../../services/constants/endpoints'
import { HEADERS } from '../../services/constants/headers'
import { axiosGet } from '../../services/utilities/axios'

const Launches = () => {
  const [launches, setLaunches] = useState([])

  useEffect(() => {
    axiosGet(LAUNCHES_ENDPOINT, HEADERS).then((response) => {
      if (response.status === 200) {
        setLaunches(response.data)
      } else {
        alert(response.message)
      }
    })
  }, [])

  return (
    <div className="launches">
      <SearchInput />
      <LaunchesTable launches={launches} />
    </div>
  )
}

export default Launches
