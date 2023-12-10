import React, { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import logo from '../../../pibpam-logo.svg';
import { Container } from './styles';
import { useNavigate, useParams } from 'react-router-dom';

function ViewerLower3Th() {
  const init = useRef(false)
  const [active, setActive] = useState(false)
  const [data, setData] = useState({})
  const timeOut = useRef()

  const {key} = useParams()
  // const navigate = useNavigate()

  useEffect(() => {

    // if (!key) {
    //   navigate('/unauthorized')
    //   return
    // }

    if (init.current || !key) {
      return
    }
    init.current = true

    const ioClient = io('http://localhost:3333', {
      query: {
        auth: key
      }
    })

    ioClient.on('add', data => {
      console.log(data)
      setData(data)
      setActive(true)
      clearTimeout(timeOut.current)
      timeOut.current = setTimeout(() => {
        setActive(false)
      }, 20000)
    })

  }, [key])
  return (
    <Container>
      <div className={`lower ${active && 'active'}`}>
        <div className='image' >
          <img src={logo} alt="PIBPM logo" />
        </div>
        <div className="textinfo" >
          <div className='title' >
            <div>{data?.title || ''}</div>
          </div>
          {data.subtitle && (
            <div className='subtitle' >
              <div>
                {data?.subtitle || ''}
              </div>
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}

export default ViewerLower3Th;