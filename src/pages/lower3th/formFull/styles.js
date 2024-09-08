import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: flex-start;
    overflow: hidden;
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 500px;
    padding: 80px 32px;
    max-height: 100%;
    overflow: auto;
`;

export const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    background: #eee;
    padding: 16px;
    border-radius: 8px;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    flex: 1;
    padding: 80px 32px;
    max-height: 100%;
    overflow: auto;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`