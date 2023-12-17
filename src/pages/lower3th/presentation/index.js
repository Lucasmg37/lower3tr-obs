import React from 'react';
import { Container, CronContainer, LowerContainer } from './styles';
import video from '../../../assets/Intro Culto.mp4'
import { useLower } from '../../../hooks/useLower';
import Lower3th from '../../../components/Lower3th';
import logo from '../../../pibpam-logo.svg';
import useCron from '../../../hooks/useCron';

function Presentation() {
  const { active, data } = useLower()
  const {getSecondsFormatted, isCounting} = useCron()

  return (
    <Container>
      <video loop muted autoPlay src={video}></video>
      <CronContainer>
        <div className={`${isCounting && "active"}`} >
          {getSecondsFormatted()}
        </div>
      </CronContainer>
      <LowerContainer>
        <Lower3th data={data} active={active} logo={logo} />
      </LowerContainer>
    </Container>
  )
}

export default Presentation;