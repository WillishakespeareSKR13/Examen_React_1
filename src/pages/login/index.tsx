import { css } from '@emotion/react';

import { NextPageFC } from 'next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AtomLink from '@atoms/AtomLink';
import AtomWrapper from '@atoms/AtomWrapper';
import AtomText from '@atoms/AtomText';
import AtomInput from '@atoms/AtomInput';
import AtomButton from '@atoms/AtomButton';

const initialValues = {
  email: '',
  password: ''
};

const PageLogin: NextPageFC = () => {
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Por favor, ingrese un email válido')
        .required('Por favor, ingrese un email'),
      password: Yup.string().required('Por favor, ingrese una contraseña')
    }),
    onSubmit: async (valores) => {
      console.warn(valores);
    }
  });

  return (
    <AtomWrapper
      css={() => css`
        height: 100vh;
        width: 100%;
        max-width: 1440px;
        flex-direction: row;
        justify-content: center;
        background-color: red;
        @media (max-width: 1200px) {
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }
        @media only screen and (max-width: 520px) {
          padding: 0px 20px;
        }
      `}
    >
      <AtomWrapper
        as="form"
        onSubmit={() => formik.handleSubmit()}
        css={() => css`
          align-items: center;
          justify-content: center;
          @media (max-width: 1200px) {
            padding: 50px 0px;
          }
        `}
      >
        <AtomText
          css={() => css`
            width: 60%;
            font-size: 34px;
            margin: 0px 0px 10px 0px;
            font-weight: 700;
          `}
        >
          Ingresar
        </AtomText>
        <AtomInput
          formik={formik}
          id="email"
          spantext="Por favor, ingrese un email"
          input={{
            placeholder: 'Correo Electrónico'
          }}
        />
        <AtomInput
          formik={formik}
          id="password"
          type="password"
          spantext="Por favor, ingrese una contraseña"
          input={{
            placeholder: 'Contraseña'
          }}
        />
        <AtomLink
          link="/resetpasword"
          css={() => css`
            font-weight: 600;
            width: 60%;
          `}
        >
          Olvidé mi contraseña
        </AtomLink>
        <AtomButton
          type="submit"
          css={() => css`
            padding: 10px 30px;
            margin: 25px 0px 0px 0px;
          `}
        >
          Ingresar
        </AtomButton>
      </AtomWrapper>
    </AtomWrapper>
  );
};

PageLogin.Layout = 'login';

export default PageLogin;
