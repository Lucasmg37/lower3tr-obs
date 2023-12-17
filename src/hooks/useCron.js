import { useEffect, useRef, useState } from "react"
import useSocketIO from "./useSocketIO"
import { useParams } from "react-router-dom"

const useCron = () => {
  const [seconds, setSeconds] = useState(0)
  const timeOutRef = useRef()
  const callbackRef = useRef()

  const init = useRef(false)

  const { addEvent, initilialize } = useSocketIO()

  const { key } = useParams()

  useEffect(() => {
    if (init.current && !key) {
      return
    }

    init.current = true

    initilialize(key)

    addEvent('addCron', data => {
      console.log(data.finish)
      setCron((new Date(data.finish)).getTime() - (new Date()).getTime())
    })


    addEvent('removeCron', data => {
      setCron(0)
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addEvent, initilialize, key])

  const handleTimeOut = (seconds) => {
    setSeconds(seconds)

    if (seconds === 0) {
      handleFinishCount()
      return;
    }

    timeOutRef.current = setTimeout(() => {
      handleTimeOut(seconds - 1000 <= 0 ? 0 : seconds - 1000)
    }, 1000)
  }

  const setCron = (seconds) => {
    if (seconds < 0) {
      setCron(0)
      return
    }
    clearTimeout(timeOutRef.current)
    handleTimeOut(seconds)
  }

  const getSecondsFormatted = () => {
    if (seconds === 0) {
      return "00:00"
    }
    const minutes = Math.trunc(seconds / 60000)
    const secondsRest = Math.trunc((seconds % 60000) / 1000)
    return `${minutes < 10 ? '0' + minutes : minutes}:${secondsRest < 10 ? '0' + secondsRest : secondsRest}`
  }

  const setCallback = (callback = () => { }) => {
    callbackRef.current = callback
  }

  const handleFinishCount = () => {
    callbackRef.current && callbackRef.current()
  }

  return { setCron, getSecondsFormatted, isCounting: !!seconds, setCallback }
}

export default useCron