import React from 'react';
import logo from '../../../pibpam-logo.svg';
import { Container } from './styles';
import Lower3th from '../../../components/Lower3th';
import { useLower } from '../../../hooks/useLower';

function ViewerLower3Th() {
  const { active, data } = useLower()
  return (
    <Container>
      <Lower3th data={data} active={active} logo={logo} />
    </Container>
  )
}

export default ViewerLower3Th;