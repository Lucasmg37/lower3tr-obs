import styled from 'styled-components';

export const Container = styled.div`
  display: inline-flex;
  color: #fff;
  width: 100%;
  align-items: center;
  font-family: 'Bebas Neue', sans-serif;
  transform: translateX(-100%);
  transition: ease 1s all;

  &.active {
    transform: translateX(0px);
  }

  .image {
    padding: 0 32px;
    background: #fff;
    height: 89px;
    display: flex;
    align-items: center;
    /* backdrop-filter: blur(10px); */
  }

  .textinfo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
    position: relative;
    width: auto;
  }

  .title {
    font-size: 24px;
    font-weight: 500;
    z-index: 1;
    max-width: calc(100% - 48px);
    position: relative;
    width: 100%;
  }

  .title>div {
    background: #B5DA35;
    padding: 8px 32px;
    display: inline-flex;
    color: #333;
  }

  .subtitle {
    font-size: 20px;
    font-weight: lighter;
    position: relative;
    /* margin-left: 16px; */
    z-index: 0;
    max-width: calc(100% - 24px);
    /* top: -4px; */
  }

  .subtitle>div {
    padding: 8px 32px;
    background: #5FD9DA;
    display: inline-flex;
    color: #333;
  }
`;
