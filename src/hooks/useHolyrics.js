import { useEffect, useState } from "react"
import { getConfig, updateConfig } from "../service/lower"
import { ClientHolyrics } from "../service/holyrics"

const useHolyrics = (key) => {
  const [configs, setConfigs] = useState({
    holyrics: '',
    holyricsKey: ''
  })


  const initData = async () => {
    const configApi = await getConfig(key)
    if (configApi) {
      setConfigs({ ...configs, ...configApi.config })
    }
  }

  useEffect(() => {
    if (key) {
      initData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const initHolyricsSongs = async () => {
    const holyricsApi = new ClientHolyrics(configs.holyrics, configs.holyricsKey)
    const data = await holyricsApi.getSongsPlaylist()
    console.log(data)
  }

  useEffect(() => {

    if (configs.holyrics && configs.holyricsKey) {
      initHolyricsSongs()
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configs])

  const handleSaveConfig = async () => {
    await updateConfig(key, configs)
  }


  return { configs, setConfigs, handleSaveConfig }

}

export default useHolyrics