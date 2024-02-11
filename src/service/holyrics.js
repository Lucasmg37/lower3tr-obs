import axios from "axios";


export class ClientHolyrics {
  constructor(baseUrl, key) {
    this.key = key
    this.client = axios.create({
      baseURL: baseUrl + '/api/',
    })
  }

  async getSongsPlaylist() {
    try {
      const {data} = await this.client?.post('GetSongPlaylist', { params: { token: this.key }})
      return data
    } catch (error) {
      console.log(error)
    }
  }
}