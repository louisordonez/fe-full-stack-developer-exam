import { useState, useEffect } from 'react'
import SearchInput from './Input/SearchInput'
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
    <div className="launches-container">
      <SearchInput />
    </div>
  )
}

export default Launches
