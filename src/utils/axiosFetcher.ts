import axios from 'axios'

const axiosFetcher = async (path: string) => {
  const response = await axios.get(path)
  return response.data
}

export default axiosFetcher
