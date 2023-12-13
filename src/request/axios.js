import axios from "axios"

export default axios.create({
    baseURL: 'https://ncm.kimisui56.work',
    timeout:3000,
})