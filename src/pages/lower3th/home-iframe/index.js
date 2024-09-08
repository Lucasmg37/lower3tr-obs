import React from 'react';

import { Container } from './styles';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomeIframe() {

  const navigate = useNavigate()
  const goTo = (route) => {
    if (!route) {
      return
    }

    navigate(route)
  }

  return <Container>
    <div>
      <Button onClick={() => goTo('painel')} fullWidth >Painel</Button>
      <Button onClick={() => goTo('form')} fullWidth >Lower3th OBS</Button>
      <Button onClick={() => goTo('form-full')} fullWidth >Lower3ths</Button>
      <Button onClick={() => goTo('viewer')} fullWidth >Lower3th Viewer</Button>
      <Button onClick={() => goTo('presentation')} fullWidth >Presentation Viewer</Button>
    </div>
  </Container>;
}

export default HomeIframe;