import { FC } from 'react';
import { get } from 'lodash';
import InputTextError from './error';
import {
  InputOptionStyled,
  InputSelectStyled,
  InputTextLabelStyled,
  InputTextSpanStyled
} from './styled';
import { AtomInputTypes } from './types';

const Animation = {
  whileTap: { scale: 0.98, opacity: 0.8 }
};
const DefaultAnimation = {
  whileTap: { scale: 0.98, opacity: 0.8 },
  transition: {
    default: { duration: 0.3 }
  },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
};

const InputSelect: FC<AtomInputTypes> = (props) => {
  const { formik, id, type, children, astheme = 'primary' } = props;
  const { error, label, select, span, spantext, option, options } = props;
  return (
    <InputTextLabelStyled htmlFor={id} {...label}>
      {spantext && (
        <InputTextSpanStyled astheme={astheme} {...span}>
          {spantext}
        </InputTextSpanStyled>
      )}
      <InputSelectStyled
        id={id}
        astheme={astheme}
        type={type}
        {...select}
        {...Animation}
        value={select?.value ?? get(formik?.values, id ?? '')}
        onChange={(e) => {
          formik?.handleChange(e);
          select?.onChange?.(e);
        }}
        onBlur={(e) => {
          formik?.handleBlur(e);
          select?.onBlur?.(e);
        }}
      >
        {(options?.length ?? 0) > 0 &&
          options?.map((e) => (
            <InputOptionStyled
              {...option}
              {...DefaultAnimation}
              value={e.value}
              key={e.id}
            >
              {e.label}
            </InputOptionStyled>
          ))}
      </InputSelectStyled>
      {children}
      <InputTextError id={id} astheme={astheme} formik={formik} {...error} />
    </InputTextLabelStyled>
  );
};

export default InputSelect;
