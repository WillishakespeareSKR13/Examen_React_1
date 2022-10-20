import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/utils';
import { motion } from 'framer-motion';

type Types = {
  css?: SerializedStyles;
};

export const AtomTableStyled = styled(motion.table)<Types>`
  position: relative;
  border-collapse: collapse;
  table-layout: auto;
  font-family: 'Montserrat', sans-serif;
  width: 100%;
  height: max-content;
  margin: 0;
  border-radius: 4px;
  overflow: hidden;
  outline: 1px solid #eeeeee;
  color: ${({ color }) => color || `black`};
  min-width: 100%;
  thead {
    font-family: 'Montserrat', sans-serif;
    height: fit-content;
    text-align: center;
    background-color: white;
    border-bottom: 1px solid #eeeeee;
    th {
      font-family: 'Montserrat', sans-serif;
      text-align: left;
      color: #565656;
      font-size: 14px;
      font-weight: 700;
      padding: 15px 30px 15px 30px;
      span {
        font-size: 8px;
      }
    }
    .searchTR {
      background-color: #fbfbfb;
      padding: 15px 30px 15px 30px;
      span {
        font-size: 12px;
        font-weight: 600;
        color: #383838;
      }
    }
  }
  thead,
  tbody tr {
    display: table;
    width: 100%;
    table-layout: fixed;
  }
  ${({ css }) => css}
`;

export const AtomTbodyStyled = styled(motion.tbody)<Types>`
  display: block;
  overflow: auto;
  tr {
    background-color: #ffffff;
    transition: all 0.3s ease-in-out;
  }
  tr:nth-child(odd) {
    background-color: #fbfbfb;
  }
  tr:hover {
    background-color: #f0f0f0;
  }
`;

export const TRStyled = styled(motion.tr)<Types>`
  ${({ css }) => css};
`;

export const TDStyled = styled(motion.td)<Types>`
  font-family: 'Montserrat', sans-serif;
  color: #565656;
  font-size: 12px;
  font-weight: 500;
  padding: 15px 30px;
  text-align: left;
  border-bottom: 1px solid #eeeeee;
  ${({ css }) => css};
`;

export const AtomTfootStyled = styled(motion.tfoot)<Types>`
  td {
    font-family: 'Montserrat', sans-serif;
    color: #565656;
    font-size: 14px;
    padding: 15px 30px;
    font-weight: 700;
    text-align: left;
    border-bottom: 1px solid #eeeeee;
  }
`;
