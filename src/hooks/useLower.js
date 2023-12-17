import { useEffect, useRef, useState } from "react"
import useSocketIO from "./useSocketIO"
import { useParams } from "react-router-dom"

export const useLower = () => {
  const [active, setActive] = useState(false)
  const [data, setData] = useState({})
  const init = useRef(false)

  const timeOut = useRef()

  const { addEvent, initilialize } = useSocketIO()

  const { key } = useParams()

  useEffect(() => {
    if (init.current && !key) {
      return
    }

    init.current = true

    initilialize(key)

    addEvent('add', data => {
      console.log(data)
      setData(data)
      setActive(true)
      clearTimeout(timeOut.current)
      timeOut.current = setTimeout(() => {
        setActive(false)
      }, 20000)
    })

  }, [addEvent, initilialize, key])

  return {data, active}
}