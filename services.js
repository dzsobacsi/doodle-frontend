import axios from 'https://cdn.jsdelivr.net/npm/axios@1.6.2/+esm'

//axios.defaults.baseURL = 'https://api-doodle-iorfo3kg6a-ew.a.run.app/'
const baseURL = 'https://api-doodle-iorfo3kg6a-ew.a.run.app/'

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
  try {
    response = await axios.get(baseURL)
    return response.data
  }
  catch (e) {
    console.error(e.message)
  }
}
