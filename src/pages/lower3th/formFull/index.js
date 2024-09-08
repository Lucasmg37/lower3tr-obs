import { Button, Divider, TextField } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

import { Container, Form, Grid, ListItem, Row } from './styles';
import axios from 'axios';
import { useParams, useSearchParams } from 'react-router-dom';
import { createLower, deleteLower, getAllLower, updateLower } from '../../../service/lower';
import { v4 } from 'uuid';
import { addSeconds, format } from 'date-fns';

const httpClient = axios.create({ baseURL: 'https://api.pibpam.org/io' })

function FormLower3ThFull() {
  const [searchParams] = useSearchParams()
  const fetching = useRef(false)

  const routeMessage = () => {
    const title = searchParams.get('title')

    if (title) {
      return [{
        uuid: v4(),
        notSaved: true,
        external: true,
        data: {
          title,
          message: searchParams.get('message'),
          type: 'auto',
        }
      }]
    }

    return []
  }

  const [newmessages, setnewMessages] = useState(routeMessage())

  const [messages, setMessages] = useState([])
  const [seconds, setSeconds] = useState('')
  const [dateTime, setDateTime] = useState(format(new Date(), 'yyyy-MM-dd hh:mm'))

  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const { key } = useParams()

  // const { configs, setConfigs, handleSaveConfig } = useHolyrics(key)

  const initData = async () => {
    if (fetching.current) {
      return
    }

    fetching.current = true
    const data = await getAllLower(key)
    setnewMessages(state => [...state, ...data])
    fetching.current = false
  }

  useEffect(() => {
    if (key) {
      initData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  const handleSend = (uuid) => {

    const selected = newmessages.find(item => item.uuid === uuid)

    if (!selected || !key) {
      return
    }

    httpClient.post('/add', {
      title: selected.data.title,
      subtitle: selected.data.message,
      key
    })
  }

  const handleAdd = async () => {
    if (!title) {
      return
    }

    const data = await createLower(key, { title, message })

    setnewMessages(state => [...state, data])
    setTitle('')
    setMessage('')
  }

  const handleRemove = (uuid) => {
    deleteLower(uuid)
    setnewMessages(state => state.filter(item => item.uuid !== uuid))
  }

  const handleUpdate = (uuid) => {
    updateLower(uuid, key, newmessages.find(item => item.uuid === uuid).data)
  }

  const handleUpdateItem = (uuid, attr, value) => {
    setnewMessages(state => state.map(item => {
      if (item.uuid === uuid) {
        item.data[attr] = value
      }
      return item
    }))
  }


  const handleSendCron = (uuid) => {

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

  const handleAddCron = () => {
    if (!seconds && !dateTime) {
      return
    }

    setMessages(state => [...state, { seconds, dateTime, uuid: v4() }])
    setSeconds('')
    setDateTime(format(new Date(), 'yyyy-MM-dd hh:mm'))
  }

  const handleRemoveCron = (uuid) => {
    setMessages(state => state.filter(item => item.uuid !== uuid))
  }

  const handleClean = () => {
    httpClient.post('/remove-cron', {
      key
    })
  }

  return (
    <Container>
      <Form>
        <h3>
          Crie uma Lower 3th
        </h3>
        <TextField value={title} onChange={e => setTitle(e.target.value)} label="Título" variant="filled" />
        <TextField value={message} onChange={e => setMessage(e.target.value)} label="Mensagem" variant="filled" />
        <Button onClick={handleAdd} >Adicionar</Button>

        <Divider />

        <h3>
          Cronômetro
        </h3>

        <TextField type='number' value={seconds} onChange={e => setSeconds(e.target.value)} label="Segundos" variant="filled" />
        <Divider>ou</Divider>
        <TextField type='datetime-local' value={dateTime} onChange={e => setDateTime(e.target.value)} label="Horário Final" variant="filled" />

        <Row>
          <Button fullWidth onClick={handleAddCron} >Adicionar</Button>
          {/* <Button fullWidth onClick={handleAddCron} >Enviar</Button> */}
        </Row>

        {messages.map(item => <ListItem key={item.uuid}>
          <TextField disabled value={item.seconds ? item.seconds : item.dateTime} label={item.seconds ? 'Segundos' : 'Horário Final'} variant="filled" />
          <div>
            <Button onClick={() => handleRemoveCron(item.uuid)} >Remover</Button>
            <Button onClick={() => handleSendCron(item.uuid)} >Enviar</Button>
          </div>
        </ListItem>)}

        <Button onClick={handleClean} >Limpar Cronomêtro</Button>

        <Divider />
        {/* 
        <h3>
          Configurações
        </h3> */}

        {/* <TextField value={configs.holyrics} onChange={e => setConfigs({ ...configs, holyrics: e.target.value })} label="Holyrycs API" variant="filled" />
        <TextField value={configs.holyricsKey} onChange={e => setConfigs({ ...configs, holyricsKey: e.target.value })} label="Holyrycs Key" variant="filled" />

        <Button onClick={handleSaveConfig} >Salvar</Button> */}
      </Form>

      <Grid>
        {newmessages.map(({ data, identifier, uuid, external }) => <ListItem key={uuid}>
          <TextField value={data.title} onChange={(e) => handleUpdateItem(uuid, 'title', e.target.value)} label="Título" variant="filled" />
          <TextField value={data.message} onChange={(e) => handleUpdateItem(uuid, 'message', e.target.value)} label="Mensagem" variant="filled" />
          <div>
            {!external && (
            <>
                <Button onClick={() => handleRemove(uuid)} >Remover</Button>
                <Button onClick={() => handleUpdate(uuid)} >Atualizar</Button>
                </>
            )}
            <Button onClick={() => handleSend(uuid)} >Enviar</Button>
          </div>
        </ListItem>)}
      </Grid>

    </Container>
  );
}

export default FormLower3ThFull;