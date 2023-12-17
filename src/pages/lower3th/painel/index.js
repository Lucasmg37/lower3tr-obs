import { Button, Divider, TextField } from '@mui/material';
import React, { useState } from 'react';

import { Container, ListItem } from './styles';
import { v4 } from 'uuid';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { addSeconds } from 'date-fns';

const httpClient = axios.create({ baseURL: 'http://ec2-52-207-255-226.compute-1.amazonaws.com/io' })

function Painel() {

  const [messages, setMessages] = useState([])
  const [seconds, setSeconds] = useState('')
  const [dateTime, setDateTime] = useState('')
  const { key } = useParams()

  const handleSend = (uuid) => {

    const selected = messages.find(item => item.uuid === uuid)

    if (!selected || !key) {
      return
    }

    if (selected.seconds) {
      const now = new Date()
      const finish = addSeconds(now, selected.seconds).toISOString()

      httpClient.post('/add-cron', {
        finish,
        key
      })
    }

    if (selected.dateTime) {
      const finish = new Date(selected.dateTime)
      httpClient.post('/add-cron', {
        finish,
        key
      })
    }
  }

  const handleAdd = () => {
    if (!seconds && !dateTime) {
      return
    }

    setMessages(state => [...state, { seconds, dateTime, uuid: v4() }])
    setSeconds('')
    setDateTime('')
  }

  const handleRemove = (uuid) => {
    setMessages(state => state.filter(item => item.uuid !== uuid))
  }

  const handleClean = () => {
    httpClient.post('/remove-cron', {
      key
    })
  }

  return (
    <Container>
      <TextField type='number' value={seconds} onChange={e => setSeconds(e.target.value)} label="Segundos" variant="filled" />
      <Divider>ou</Divider>
      <TextField type='datetime-local' value={dateTime} onChange={e => setDateTime(e.target.value)} label="Horário Final" variant="filled" />
      <Button onClick={handleAdd} >Adicionar</Button>

      <Divider />

      {messages.map(item => <ListItem key={item.uuid}>
        <TextField disabled value={item.seconds ? item.seconds : item.dateTime} label={item.seconds ? 'Segundos' : 'Horário Final'} variant="filled" />
        <div>
          <Button onClick={() => handleRemove(item.uuid)} >Remover</Button>
          <Button onClick={() => handleSend(item.uuid)} >Enviar</Button>
        </div>
      </ListItem>)}

      <Divider />

      <Button onClick={handleClean} >Limpar Cronomêtro</Button>
    </Container>
  );
}

export default Painel;