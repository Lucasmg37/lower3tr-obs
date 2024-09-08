import styled from 'styled-components';

export const Container = styled.div`
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;

    > div {
      width: 500px;
      gap: 40px;
      display: flex;
      flex-direction: column;

      div:first-child {
        gap: 24px;
        display: flex;
        flex-direction: column;

        h3 {
          font-weight: 400;
          font-size: 32px;
        }
      }
    }
`;
