import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  width: 100%;
  background: #111;
  justify-content: center;
  position: relative;

  video {
    width: 100%;
    height: 100%;
  }
`;

export const LowerContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 40px;
  display: flex;
  align-items: flex-end;
`;

export const CronContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: flex-start;

  > div {
    font-family: 'Bebas Neue';
    font-size: 80px;
    padding: 0px 32px 0px 80px;
    background: #222;
    margin-top: 40px;
    background: #ABD531;
    transform: translateX(-100%);
    transition: ease 1s all;

    &.active {
      transform: translateX(0px);
    }
  }
`;

