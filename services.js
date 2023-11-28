import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.2/+esm'

axios.defaults.baseURL = 'https://0.0.0.0:8000'

export async function getPrediction(image) {
  try {
    const body = {image}
    response = await axios.post('/predict', body)
    return response.data
  }
  catch (e) {
    console.error(e.message)
  }
}

export async function getHello() {
  return {status: 'hello'}
  /*try {
    response = await axios.get(baseurl)
    return response.data
  }
  catch (e) {
    console.error(e.message)
  }*/
}
