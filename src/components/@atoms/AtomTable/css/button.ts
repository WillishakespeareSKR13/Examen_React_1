import { css } from '@emotion/react';

export const BUTTON_SMALL = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  min-height: 34px;
  font-size: 10px;
  padding: 8px 20px 8px 20px;
  font-weight: 700;
`;

export const BUTTON_ICON = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  padding: 0px 0px;
  min-height: 34px;
  background-color: transparent;
  :hover {
    background-color: transparent;
  }
`;
