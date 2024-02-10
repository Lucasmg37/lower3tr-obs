import axios from "axios";

const client = axios.create({
  baseURL: 'http://ec2-52-207-255-226.compute-1.amazonaws.com/io/lower-third'
})

const getAllLower = async (identifier) => {
  const { data } = await client.get('', {
    params: {
      identifier
    }
  })
  return data
}

const createLower = async (identifier, createData) => {
  const { data } = await client.post('', { identifier, data: createData })
  return data
}

const updateLower = async (uuid, identifier, updateData) => {
  const { data } = await client.put('/' + uuid, { identifier, data: updateData })
  return data
}

const deleteLower = async (uuid) => {
  const data = await client.delete('/' + uuid)
  return data
}

export {
  createLower,
  updateLower,
  getAllLower,
  deleteLower,
}