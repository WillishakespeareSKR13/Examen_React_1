import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { backgroundColorInput, backgroundColorInputToggle } from 'css';
import { motion } from 'framer-motion';
import {
  AtomInputErrorProps,
  AtomInputInputProps,
  AtomInputLabelProps,
  AtomInputOptionProps,
  AtomInputSelectProps,
  AtomInputTypes
} from './types';

export const InputTextLabelStyled = styled(motion.label)<AtomInputTypes>(
  (props) => {
    const { theme } = props;
    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      width: max-content;
      height: max-content;
      font-size: 16px;
      text-align: left;
      font-weight: 500;
      ${theme?.input?.css?.(theme)}
      ${props?.css?.(theme)}
    `;
  }
);

export const InputTextSpanStyled = styled(motion.span)<AtomInputLabelProps>(
  (props) => {
    const { theme } = props;
    return css`
      padding: 0px 0px 4px 0px;
      font-family: 'Montserrat', sans-serif;
      font-size: 14px;
      font-weight: 600;
      margin: 0px 0px 0px 0px;
      color: #222222;
      ${props?.css?.(theme)}
    `;
  }
);

export const InputTextStyled = styled(motion.input)<AtomInputInputProps>(
  (props) => {
    const { theme, astheme = 'primary' } = props;
    return css`
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      font-weight: 600;
      margin: 0px 0px 0px 0px;
      padding: 0px 0px 0px 15px;
      height: 40px;
      width: 250px;
      border-radius: 4px;
      color: #222222;
      ${backgroundColorInput(theme?.input?.color?.[astheme] ?? '#ffffff')}
      ${props?.css?.(theme)}
    `;
  }
);

export const InputSelectStyled = styled(motion.select)<AtomInputSelectProps>(
  (props) => {
    const { theme, astheme = 'primary' } = props;
    return css`
      font-family: 'Montserrat', sans-serif;
      font-size: 12px;
      font-weight: 600;
      margin: 0px 0px 0px 0px;
      padding: 0px 0px 0px 15px;
      height: 40px;
      width: 250px;
      border-radius: 4px;
      color: #222222;
      ${backgroundColorInput(theme?.input?.color?.[astheme] ?? '#ffffff')}
      ${props?.css?.(theme)}
    `;
  }
);

export const InputOptionStyled = styled(motion.option)<AtomInputOptionProps>(
  (props) => {
    const { theme } = props;
    return css`
      font-size: 12px;
      font-weight: 600;
      color: #222222;
      ${props?.css?.(theme)}
    `;
  }
);

export const InputErrorStyled = styled(motion.span)<AtomInputErrorProps>(
  (props) => {
    const { theme } = props;
    return css`
      font-family: Montserrat, sans-serif;
      font-size: 10px;
      font-weight: 700;
      color: #db4a4a;
      height: 30px;
      margin: 0px 0px 0px 0px;
      padding: 5px 0px 0px 0px;
      ${props?.css?.(theme)}
    `;
  }
);

export const InputToggleLabelStyled = styled(motion.label)<AtomInputTypes>(
  (props) => {
    const { theme } = props;
    return css`
      position: relative;
      display: flex;
      flex-direction: column;
      width: max-content;
      height: max-content;
      font-size: 16px;
      text-align: left;
      font-weight: 500;
      ${theme?.input?.css?.(theme)}
      ${props?.css?.(theme)}
    `;
  }
);

export const InputToggleStyled = styled(motion.input)<AtomInputInputProps>(
  (props) => {
    const { theme, astheme = 'primary' } = props;
    return css`
      margin: 0px;
      position: relative;
      width: 35px;
      height: 14px;
      appearance: none;
      background: #fff;
      outline: none;
      border-radius: 20px;
      border: none;
      transition: all 0.5s;
      cursor: pointer;

      :before {
        content: '';
        position: absolute;
        height: 20px;
        width: 20px;
        border-radius: 50%;
        top: 50%;
        left: 0;
        transform: translate(-50%, -50%);
        transition: all 0.5s;
      }
      ${backgroundColorInputToggle(theme?.input?.color?.[astheme] ?? '#db4a4a')}

      ${backgroundColorInput(theme?.input?.color?.[astheme] ?? '#ffffff')}
      ${props?.css?.(theme)}
    `;
  }
);
