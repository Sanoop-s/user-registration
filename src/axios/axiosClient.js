import axios from 'axios'

axios.defaults.baseURL = 'https://dummyjson.com/';
axios.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}

export const getRequest = (url) => {
    return axios.get(url).then((response) => response)
}