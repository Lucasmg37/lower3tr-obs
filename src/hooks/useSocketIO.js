import { useRef } from "react"
import { io } from "socket.io-client"
import { getGlobal, setGlobal } from "../global/io"

const useSocketIO = () => {
  const ioClient = useRef()

  const initilialize = (key) => {
    if (getGlobal()) {
      ioClient.current = getGlobal()
      return
    }

    ioClient.current =  io('https://api.pibpam.org', {
      query: {
        auth: key
      }
    })

    setGlobal(ioClient.current)
  }

  const addEvent =(event, callback = () => {}) => {
    ioClient.current.on(event, callback)
  }

  return { initilialize, ioClient, addEvent }
}


export default useSocketIO