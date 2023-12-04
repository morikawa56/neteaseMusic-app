import axios from "axios"

export default axios.create({
    baseURL: 'http://192.168.129.164:3000',
    timeout:3000,
})