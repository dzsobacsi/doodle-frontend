import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.2/+esm'

//axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.baseURL = 'http://64.225.93.200:8000'
axios.defaults.timeout = 3000

export async function getPrediction(image) {
  try {
    const body = {data: image}
    const response = await axios.post('/predict', body)
    return response.data
  }
  catch (e) {
    console.error(e.message)
  }
}

/*export async function getHello() {
  try {
    const response = await axios.get()
    return response.data
  }
  catch (e) {
    console.error(e.message)
  }
}*/
