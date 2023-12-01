import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.2/+esm'

axios.defaults.baseURL = 'https://api-doodle-iorfo3kg6a-uc.a.run.app/'
//axios.defaults.baseURL = 'http://127.0.0.1:8000'

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

export async function getHello() {
  try {
    const response = await axios.get()
    return response.data
  }
  catch (e) {
    console.error(e.message)
  }
}
