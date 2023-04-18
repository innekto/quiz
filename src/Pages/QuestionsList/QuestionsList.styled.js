import styled from 'styled-components';

export const QuestList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(12, auto);
  gap: 16px;
`;

export const QuestItem = styled.li`
  /* display: flex; */
  border: 1px solid teal;
`;
