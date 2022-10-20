# Examen React 1ª Evaluación Programación React

## Repository

[Repository](https://github.com/WillishakespeareSKR13/Examen_React_1)

[Flujo de trabajo](https://github.com/WillishakespeareSKR13/Examen_React_1/blob/main/Examen_React.1.pdf)

## Test User

Email: skr13@outlook.com

Password: 12345678

## Web Deployments

[Production](https://examen-react-1-production.vercel.app/)

[Development](https://examen-react-1-develop.vercel.app/)

## Run Locally

Clone the project

```bash
  git clone git@github.com:WillishakespeareSKR13/Examen_React_1.git
```

Go to the project directory

```bash
  cd Examen_React_1
```

Install dependencies

```bash
  yarn install
```

Start the server

```bash
  yarn next
```

## Tree Structure

![alt Tree Structure](https://res.cloudinary.com/design-code-mx/image/upload/v1619492715/Stacklycode/Group_1519_k38wib.svg)

## Folder Structure

![alt Folder Structure](https://res.cloudinary.com/design-code-mx/image/upload/v1619492715/Stacklycode/Group_1519_k38wib.svg)

## Component Structure @Atoms

Implements Atomic Design Patterns [https://bradfrost.com/blog/post/atomic-web-design/](https://bradfrost.com/blog/post/atomic-web-design/)

### index.tsx

```js
import { forwardRef } from 'react';
import { ButtonStyled } from './styled';
import { AtomButtonTypes } from './types';
import AtomLoader from '../AtomLoader';

const Animation = {
  whileHover: { scale: 1.05, transition: { duration: 0.3 } },
  whileTap: { scale: 0.98 }
};
const isDisabledAnimation = (disabled: boolean | 'true' | 'false') =>
  disabled ? {} : Animation;

const AtomButton = forwardRef<HTMLButtonElement, AtomButtonTypes>(
  (props, ref) => {
    const { loading, children, disabled } = props;
    return (
      <ButtonStyled
        {...isDisabledAnimation(disabled ?? loading)}
        {...props}
        ref={ref}
      >
        <AtomLoader astype="button" loading={loading}>
          {children || `Text Default`}
        </AtomLoader>
      </ButtonStyled>
    );
  }
);

export default AtomButton;
```

### types.ts

```js
import { CSSType, ThemeAtomButton } from 'types';
import { HTMLMotionProps } from 'framer-motion';

export type AtomButtonTypes = HTMLMotionProps<'button'> & {
  loading?: boolean | 'true' | 'false';
  astheme?: keyof ThemeAtomButton['color'];
  astype?: ThemeAtomButton['type'];
  css?: CSSType;
};
```

style.tsx

```js
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { SSP } from 'types';
import { backgroundColorHoverFlat, backgroundColorOutline } from 'css';
import { AtomButtonTypes } from './types';

export const ButtonStyled =
  styled(motion.button) <
  AtomButtonTypes >
  `
  width: max-content;
  height: max-content;
  padding: 8px 30px;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  min-height: 40px;
  border: 1px solid transparent;
  border-radius: 4px;
  line-height: 150%;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
  * {
    cursor: pointer;
  }
  ${(props) => css`
    ${CSSAsType(props)}
    ${IsDisabled(props)}
    ${props?.theme?.button?.css?.(props.theme)}
  `}
`;

const CSSAsType: SSP<AtomButtonTypes> = (props) => {
  const { astype, astheme, theme } = props;
  const MAINTYPE = astype ?? theme?.button?.type ?? 'flat';
  const MAINTHEME = astheme ?? theme?.button?.theme ?? 'primary';
  switch (MAINTYPE) {
    case 'outline':
      return backgroundColorOutline(
        theme?.button?.color?.[MAINTHEME] ?? '#fe6a6a'
      );
    default:
      return backgroundColorHoverFlat(
        theme?.button?.color?.[MAINTHEME] ?? '#fe6a6a'
      );
  }
};

const IsDisabled: SSP<AtomButtonTypes> = (props) => {
  const { disabled } = props;
  return css`
    ${disabled &&
    css`
      background-color: #e6e6e6 !important;
      color: #7e7e7e !important;
      cursor: not-allowed !important;
    `}
  `;
};
```

## Git Flow

![alt GitFlow](https://res.cloudinary.com/design-code-mx/image/upload/v1619492714/Stacklycode/Group_1521_bn3jax.svg)

## Authors

- [William Jesus Covarrubias Ramos : Senior Frontend Developer](https://www.github.com/WillishakespeareSKR13)

## Documentation

[Jotai](https://jotai.org/) : Context State Management Better Than Redux & Context API

[Framer Motion](https://www.framer.com/motion/) : Animated Library for React

[Emotion](https://emotion.sh/docs/introduction) : Library Styled Components for more customization and dynamic styles

[React](https://reactjs.org/) : The most famous library for building UIs

[Next](https://nextjs.org/) : Framework for React apps to optimize SEO, file-system routing & developing experience
