import { atom } from 'jotai';

export type IUser = {
  id: number;
  name: string;
  email: string;
  password: string;
};

export const UsersAtom = atom<IUser[]>([
  {
    id: 1,
    name: 'William Jesus Covarrubias Ramos',
    email: 'skr13@outlook.com',
    password: '12345678'
  }
]);

export const UserLoginAtom = atom(null as unknown as IUser);
