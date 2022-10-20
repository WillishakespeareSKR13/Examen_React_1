import { AnimatePresence } from 'framer-motion';
import { FC } from 'react';
import { useRouter } from 'next/router';
import { AtomWrapperTypes } from '@atoms/AtomWrapper/types';
import AtomWrapper from '@atoms/AtomWrapper';
import { css } from '@emotion/react';

const spring = {
  x: { type: `spring`, damping: 20, stiffness: 180, when: `afterChildren` },
  default: { duration: 0.45 }
};

const animation = {
  transition: spring,
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const LayoutAnimation: FC<AtomWrapperTypes> = (props) => {
  const { children } = props;
  const router = useRouter();
  return (
    <AnimatePresence exitBeforeEnter>
      <AtomWrapper
        as="main"
        {...props}
        {...animation}
        key={router.pathname}
        css={(theme) => css`
          height: 100vh;
          justify-content: flex-start;
          align-items: center;
          ${props?.css?.(theme)}
        `}
      >
        {children}
      </AtomWrapper>
    </AnimatePresence>
  );
};
export default LayoutAnimation;
