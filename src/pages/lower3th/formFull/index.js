import { Button, Divider, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import { Container, Form, Grid, ListItem } from './styles';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { createLower, deleteLower, getAllLower, updateLower } from '../../../service/lower';
import useHolyrics from '../../../hooks/useHolyrics';

const httpClient = axios.create({ baseURL: 'http://ec2-52-207-255-226.compute-1.amazonaws.com/io' })

function FormLower3ThFull() {
  const [newmessages, setnewMessages] = useState([])
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const { key } = useParams()

  const {configs, setConfigs, handleSaveConfig} = useHolyrics(key)


  const initData = async () => {
    const data = await getAllLower(key)
    setnewMessages(data)
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

  return (
    <Container>
      <Form>

        <h3>
          Crie uma Lower3th
        </h3>
        <TextField value={title} onChange={e => setTitle(e.target.value)} label="Título" variant="filled" />
        <TextField value={message} onChange={e => setMessage(e.target.value)} label="Mensagem" variant="filled" />
        <Button onClick={handleAdd} >Adicionar</Button>

        <Divider />

        <h3>
          Configurações
        </h3>

        <TextField value={configs.holyrics} onChange={e => setConfigs({ ...configs, holyrics: e.target.value })} label="Holyrycs API" variant="filled" />
        <TextField value={configs.holyricsKey} onChange={e => setConfigs({ ...configs, holyricsKey: e.target.value })} label="Holyrycs Key" variant="filled" />

        <Button onClick={handleSaveConfig} >Salvar</Button>
      </Form>

      <Grid>
        {newmessages.map(({ data, identifier, uuid }) => <ListItem key={uuid}>
          <TextField value={data.title} onChange={(e) => handleUpdateItem(uuid, 'title', e.target.value)} label="Título" variant="filled" />
          <TextField value={data.message} onChange={(e) => handleUpdateItem(uuid, 'message', e.target.value)} label="Mensagem" variant="filled" />
          <div>
            <Button onClick={() => handleRemove(uuid)} >Remover</Button>
            <Button onClick={() => handleUpdate(uuid)} >Atualizar</Button>
            <Button onClick={() => handleSend(uuid)} >Enviar</Button>
          </div>
        </ListItem>)}
      </Grid>

    </Container>
  );
}

export default FormLower3ThFull;