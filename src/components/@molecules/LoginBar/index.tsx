import AtomButton from '@atoms/AtomButton';
import AtomImage from '@atoms/AtomImage';
import AtomLink from '@atoms/AtomLink';
import AtomText from '@atoms/AtomText';
import AtomWrapper from '@atoms/AtomWrapper';
import { css } from '@emotion/react';
import { backgroundColorFlatButton } from 'css';
import { useAtom, useSetAtom } from 'jotai';
import { TokenAtom } from 'jotais/token';
import { IUser, UserLoginAtom } from 'jotais/users';
import { useRouter } from 'next/router';
import React from 'react';

const LoginBar = () => {
  const router = useRouter();
  const setToken = useSetAtom(TokenAtom);
  const [userLogin, setUserLogin] = useAtom(UserLoginAtom);
  return (
    <AtomWrapper
      css={() => css`
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 80px;
        box-shadow: rgb(0 0 0 / 5%) 0px 3px 6px;
        background-color: #ffffff;
        padding: 0px 90px;
      `}
    >
      <AtomWrapper
        css={() => css`
          width: max-content;
          flex-direction: row;
          background-color: transparent;
          align-items: center;
          gap: 20px;
        `}
      >
        <AtomImage
          src={
            userLogin?.image ??
            'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
          }
          css={() => css`
            width: max-content;
            img {
              width: 45px;
              height: 45px;
              border-radius: 100%;
            }
            box-shadow: rgb(0 0 0 / 5%) 0px 3px 6px;
          `}
        />
        <AtomText
          css={() => css`
            font-weight: 700;
          `}
        >
          {userLogin?.name ?? 'Nombre Apellido'}
        </AtomText>
      </AtomWrapper>
      <AtomWrapper
        css={() => css`
          flex-direction: row;
          width: max-content;
          background-color: transparent;
          gap: 20px;
        `}
      >
        {[
          {
            id: 1,
            label: 'Trabajadores',
            path: '/employees'
          },
          {
            id: 2,
            label: 'Imagenes',
            path: '/upload'
          }
        ]?.map((item) => (
          <AtomLink
            key={item.id}
            link={item.path}
            css={() => css`
              font-weight: ${router.pathname === item.path ? '700' : '500'};
              color: ${router.pathname === item.path ? '#4d51e0' : '#000000'};
              cursor: pointer;
            `}
          >
            {item.label}
          </AtomLink>
        ))}
      </AtomWrapper>
      <AtomButton
        onClick={() => {
          setToken(null as unknown as string);
          setUserLogin(null as unknown as IUser);
          router.reload();
        }}
        css={() => css`
          padding: 10px 30px;
          ${backgroundColorFlatButton('#4d51e0')}
        `}
      >
        Cerrar Sesión
      </AtomButton>
    </AtomWrapper>
  );
};

export default LoginBar;
