import axios from 'axios'
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const token =cookies.get('token')

const BASE_URL="http://3.6.39.193:9000/"

const setAxiosDefaults = () => {
  axios.defaults.baseURL = BASE_URL
  // axios.defaults.withCredentials = true


  axios.interceptors.request.use(config => {
    if (token) {
      config.headers['TOKEN'] = token
      config.headers['Access-Control-Allow-Origin'] = '*'
    }
    return config
  })

  // axios.interceptors.response.use(
  //   async error => {
  //     console.log(error)
  //     const status = error.response ? error.response.status : null
  //     if (status === 401) {
  //       try {
  //         await VendorService.login()
  //         return await axios.request(error.config)
  //       } catch (err) {
  //         return Promise.reject(err)
  //       }
  //     }
  //     return Promise.reject(error)
  //   }
  // )
}
export default setAxiosDefaults
