import axios from 'axios'



function sendRequest(path:string,data:any,method:string) {
  if (method === 'POST') {
    console.log(JSON.stringify(data))
    return axios.post(path, JSON.stringify(data), {headers: {
      'content-Type': 'application/json'
  }})
  } else return axios.get(path)
}

export default sendRequest
