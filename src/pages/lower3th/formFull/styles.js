import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    padding: 24px;
    gap: 32px;
`;

export const Form = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 300px;
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
`;
