import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { AtomImageTypes } from './types';

export const AtomImageStyled = styled(motion.img)<AtomImageTypes>((props) => {
  const { theme } = props;
  return css`
    position: relative;
    width: 300px;
    height: 300px;
    background-color: #f6f7f8;
    object-fit: cover;
    ${props?.css?.(theme)}
  `;
});
