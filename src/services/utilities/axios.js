import axios from 'axios'

export const SpaceXRef = axios.create({
  baseURL: 'https://api.spacexdata.com',
})

export const axiosGet = async (endpoint) => {
  return SpaceXRef.get(endpoint)
    .then((response) => response)
    .catch((error) => error)
}
