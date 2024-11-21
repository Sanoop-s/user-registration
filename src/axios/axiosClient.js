import axios from 'axios'

axios.defaults.baseURL = 'https://dummyjson.com/';
axios.defaults.headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
}

export const getRequest = (url) => {
    return axios.get(url).then((response) => response)
}
export const postRequest = (url, payload) => {
    return axios.post(url, payload)
        .then((response) => {
            return { type: 1, response }
        })
        .catch((error) => {
            return { type: 2,error }
        })

}