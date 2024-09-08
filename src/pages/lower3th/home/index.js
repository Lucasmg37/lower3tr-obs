import React, { useState } from 'react';

import { Container } from './styles';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [key, setKey] = useState(localStorage.getItem('@L3TH-KEY'))

  const navigate = useNavigate()
  const accessByKey = () => {
    if (!key){
      return
    }


    localStorage.setItem('@L3TH-KEY', key)
    navigate('/iframe/' + key)
  }

  return <Container>
    <div>
      <div>
        <h3>
          Lower 3th | Management
        </h3>
        <TextField className='' value={key} onChange={(e) => setKey(e.target.value)} fullWidth label="Chave" variant="filled" />
      </div>
      <div>
        <Button onClick={accessByKey} fullWidth >Acessar</Button>
      </div>
    </div>
  </Container>;
}

export default Home;