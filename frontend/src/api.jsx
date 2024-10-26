import axios from 'axios'

const api = axios.create({
    baseURL: 'https://instagram-tl0r.onrender.com/api'
})

export default api
