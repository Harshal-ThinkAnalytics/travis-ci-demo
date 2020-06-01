import axios from 'axios'

const BASE_URL="http://3.6.39.193:9000/"

const setAxiosDefaults = () => {
  axios.defaults.baseURL = BASE_URL
  axios.defaults.withCredentials = true

  // axios.interceptors.request.use(config => {
  //   if (VendorService.token) {
  //     config.headers['Auth'] = VendorService.token
  //   }
  //   return config
  // })

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
