import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;

    > div {
      width: 200px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
`;
