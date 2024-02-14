import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 500px;
    padding: 80px 32px;
`;

export const ListItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    background: #eee;
    padding: 16px;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 16px;
    flex: 1;
    overflow: auto;
    padding: 80px 32px;
`;
