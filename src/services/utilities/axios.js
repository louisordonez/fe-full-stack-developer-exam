import axios from 'axios'
import { SPACE_X_BASE_URL } from '../constants/endpoints'

export const SpaceXRef = axios.create({
  baseURL: SPACE_X_BASE_URL,
})
