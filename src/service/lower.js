import axios from "axios";

const client = axios.create({
  baseURL: 'http://ec2-52-207-255-226.compute-1.amazonaws.com/io'
})

const getAllLower = async (identifier) => {
  const { data } = await client.get('/lower-third', {
    params: {
      identifier
    }
  })
  return data
}

const createLower = async (identifier, createData) => {
  const { data } = await client.post('/lower-third', { identifier, data: createData })
  return data
}

const updateLower = async (uuid, identifier, updateData) => {
  const { data } = await client.put('/lower-third/' + uuid, { identifier, data: updateData })
  return data
}

const updateConfig = async (identifier, createData) => {
  const { data } = await client.put('/config', { identifier, config: createData })
  return data
}

const getConfig = async (identifier) => {
  const { data } = await client.get('/config', { params: { identifier } })
  return data
}

const deleteLower = async (uuid) => {
  const data = await client.delete('/lower-third/' + uuid)
  return data
}

export {
  createLower,
  updateLower,
  getAllLower,
  deleteLower,
  updateConfig,
  getConfig
}