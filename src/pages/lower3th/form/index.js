import { Button, Divider, TextField } from '@mui/material';
import React, { useState } from 'react';

import { Container, ListItem } from './styles';
import { v4 } from 'uuid';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const httpClient = axios.create({ baseURL: 'http://localhost:3333/io'})

function FormLower3Th() {

  const [messages, setMessages] = useState([])
  const [title, setTitle] = useState('')
  const [message, setMessage] = useState('')
  const { key } = useParams()

  const handleSend = (uuid) => {

    const selected = messages.find(item => item.uuid === uuid)

    if (!selected || !key) {
      return
    }

    httpClient.post('/add', {
      title: selected.title,
      subtitle: selected.message,
      key
    })
  }

  const handleAdd = () => {
    if (!title) {
      return
    }

    setMessages(state => [...state, { title, message, uuid: v4() }])
    setTitle('')
    setMessage('')
  }

  const handleRemove = (uuid) => {
    setMessages(state => state.filter(item => item.uuid !== uuid))
  }

  return (
    <Container>
      <TextField value={title} onChange={e => setTitle(e.target.value)} label="Título" variant="filled" />
      <TextField value={message} onChange={e => setMessage(e.target.value)} label="Mensagem" variant="filled" />
      <Button onClick={handleAdd} >Adicionar</Button>

      <Divider />

      {messages.map(item => <ListItem key={item.uuid}>
        <TextField disabled value={item.title} label="Título" variant="filled" />
        <TextField disabled value={item.message} label="Mensagem" variant="filled" />
        <div>
          <Button onClick={() => handleRemove(item.uuid)} >Remover</Button>
          {/* <Button onClick={handleAdd} >Editar</Button> */}
          <Button onClick={() => handleSend(item.uuid)} >Enviar</Button>
        </div>
      </ListItem>)}

    </Container>
  );
}

export default FormLower3Th;