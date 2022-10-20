import { css } from '@emotion/react';

export const INPUT_TEXT = css`
  span:nth-of-type(1) {
    margin: 0 0 0 0;
    font-size: 12px;
    font-weight: 600;
    padding-bottom: 10px;
  }
  input {
    width: 100%;
    height: 35px;
    min-width: 200px;
    border: 1px solid #e5e5e5;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 12px;
    padding: 0px 0px 0px 15px;
    ::placeholder {
      color: #e5e5e5;
    }
  }
  span:nth-of-type(2) {
    margin: 0 0 0 0;
    font-size: 8px;
    font-weight: 700;
    padding-top: 5px;
  }
`;
