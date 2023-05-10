import axios from 'axios'

const response = await axios.get('http://localhost:3000/SYSINFO')
const fakeApi = response.data

export { fakeApi }