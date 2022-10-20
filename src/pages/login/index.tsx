import { css } from '@emotion/react';

import { NextPageFC } from 'next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import AtomLink from '@atoms/AtomLink';
import AtomWrapper from '@atoms/AtomWrapper';
import AtomText from '@atoms/AtomText';
import AtomInput from '@atoms/AtomInput';
import AtomButton from '@atoms/AtomButton';
import { backgroundColorFlatButton } from 'css';
import { useAtomValue, useSetAtom } from 'jotai';
import { UserLoginAtom, UsersAtom } from 'jotais/users';
import { useAlert } from 'hooks/alertContext';
import { TokenAtom } from 'jotais/token';
import jwt from 'jsonwebtoken';
import CONFIG from 'src/config';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { AtomInputInputProps } from '@atoms/AtomInput/types';
import { WrapperStyle } from 'css/wrappers';

const initialValues = {
  email: '',
  password: ''
};

const PageLogin: NextPageFC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { insertAlert } = useAlert();
  const users = useAtomValue(UsersAtom);
  const setToken = useSetAtom(TokenAtom);
  const setUserLogin = useSetAtom(UserLoginAtom);
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Por favor, ingrese un email válido')
        .required('Por favor, ingrese un email'),
      password: Yup.string().required('Por favor, ingrese una contraseña')
    }),
    onSubmit: async (valores) => {
      setLoading(true);
      setTimeout(() => {
        const { email, password } = valores;
        const userFind = users?.find((user) => user.email === email);
        if (!userFind) {
          insertAlert({
            id: 'login-alert',
            message: 'El usuario no está regislado en la base de datos',
            type: 'error'
          });
          setLoading(false);
          return;
        }
        const isPassValid = password === userFind?.password;
        if (!isPassValid) {
          insertAlert({
            id: 'login-alert',
            message: 'La contraseña es incorrecta',
            type: 'error'
          });
          setLoading(false);
          return;
        }
        const token = jwt.sign(userFind, CONFIG?.SECRET);
        setToken(token);
        setUserLogin(userFind);
        insertAlert({
          id: 'login-alert',
          message: 'Sesión iniciada correctamente',
          type: 'success'
        });
        router.push('/employees');
        setLoading(false);
      }, 2000);
    }
  });

  return (
    <AtomWrapper css={() => WrapperStyle}>
      <AtomWrapper
        as="form"
        autoComplete="new-off"
        css={() => css`
          width: max-content;
          height: max-content;
          padding: 40px 40px;
          border-radius: 4px;
          box-shadow: 0px 2px 12px rgba(198, 198, 198, 0.5);
          user-select: none;
          -moz-user-select: none;
          -khtml-user-select: none;
          -webkit-user-select: none;
          -o-user-select: none;
        `}
      >
        <AtomText
          css={() => css`
            font-size: 28px;
            margin: 0px 0px 10px 0px;
            font-weight: 700;
            margin-bottom: 20px;
          `}
        >
          Ingresar
        </AtomText>
        <AtomInput
          formik={formik}
          id="email"
          span={{
            css: () => css`
              font-size: 12px;
              margin-bottom: 5px;
            `
          }}
          spantext="Por favor, ingrese un email"
          input={InputProps}
        />
        <AtomInput
          formik={formik}
          id="password"
          type="password"
          span={{
            css: () => css`
              font-size: 12px;
              margin-bottom: 5px;
            `
          }}
          spantext="Por favor, ingrese una contraseña"
          input={InputProps}
        />
        <AtomLink
          link="/resetpasword"
          css={() => css`
            font-size: 13px;
            color: #4d51e0;
            font-weight: 600;
          `}
        >
          Olvidé mi contraseña
        </AtomLink>
        <AtomButton
          onClick={() => {
            formik.handleSubmit();
          }}
          loading={loading}
          astheme="primary"
          type="button"
          css={() => css`
            padding: 10px 30px;
            margin: 25px 0px 0px 0px;
            width: 100%;
            ${backgroundColorFlatButton('#4d51e0')}
          `}
        >
          Ingresar
        </AtomButton>
      </AtomWrapper>
    </AtomWrapper>
  );
};

const InputProps = {
  autoComplete: 'new-off',
  onPaste: (e) => {
    e.preventDefault();
    return false;
  },
  onCopy: (e) => {
    e.preventDefault();
    return false;
  },
  placeholder: 'Correo Electrónico',
  css: () => css`
    color: #222222;
  `
} as AtomInputInputProps;

PageLogin.Layout = 'login';

export default PageLogin;
