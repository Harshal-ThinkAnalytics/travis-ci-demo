import axios from 'axios'



function sendRequest(path:string,data:any,method:string) {
  if (method === 'POST') {
    let formData = new FormData()
    if (data instanceof FormData) {
      formData = data
    } else formData.append('data',data)
    return axios.post(path, formData)
  } else return axios.get(path)
}

export default sendRequest
