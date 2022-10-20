import AtomButton from '@atoms/AtomButton';
import AtomTable from '@atoms/AtomTable';
import AtomText from '@atoms/AtomText';
import AtomWrapper from '@atoms/AtomWrapper';
import { css } from '@emotion/react';
import LoginBar from '@molecules/LoginBar';
import ModalAddEmployee from '@molecules/ModalAddEmployee';
import { backgroundColorFlatButton } from 'css';
import { WrapperStyle } from 'css/wrappers';
import { useSetAtom } from 'jotai';
import { ModalAtom } from 'jotais/modal';
import { NextPageFC } from 'next';
import React, { useMemo } from 'react';
import CONFIG from 'src/config';
import useSWR from 'swr';

type IEmployees = {
  id: number;
  name: string;
  last_name: string;
  birthday: number;
};

const urlFetch = `${CONFIG.URL}/examen/employees/william_JCR`;
const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((res) => res.data?.employees);

const Employees: NextPageFC = () => {
  const setModal = useSetAtom(ModalAtom);
  const { data, mutate } = useSWR<IEmployees[]>(urlFetch, fetcher);

  const EmployeesWithDate = useMemo(
    () =>
      data?.map((employee) => ({
        ...employee,
        birthday: new Date(employee?.birthday ?? 0).toISOString()?.split('T')[0]
      })),
    [data]
  );

  return (
    <AtomWrapper
      css={() => css`
        ${WrapperStyle}
        align-items: flex-start;
        background-color: #fafbfc;
      `}
    >
      <ModalAddEmployee callback={() => mutate()} />
      <LoginBar />
      <AtomWrapper
        css={() => css`
          padding: 40px 90px;
          width: 100%;
          height: calc(100% - 80px);
          align-items: flex-start;
          justify-content: flex-start;
          gap: 40px;
        `}
      >
        <AtomWrapper
          css={() => css`
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          `}
        >
          <AtomText
            css={() => css`
              font-weight: 700;
              font-size: 24px;
            `}
          >
            Empleados
          </AtomText>
          <AtomButton
            onClick={() => {
              setModal(true);
            }}
            css={() => css`
              padding: 10px 30px;
              ${backgroundColorFlatButton('#4d51e0')}
            `}
          >
            Agrergar Empleado
          </AtomButton>
        </AtomWrapper>
        <AtomTable
          data={EmployeesWithDate}
          columns={[
            {
              key: 'id',
              title: <>ID</>,
              sortable: true,
              searchable: true,
              view: (props) => <>{props?.id}</>
            },
            {
              key: 'name',
              title: <>Nombre</>,
              sortable: true,
              searchable: true,
              view: (props) => <>{props?.name}</>
            },
            {
              key: 'last_name',
              title: <>Apellido</>,
              sortable: true,
              searchable: true,
              view: (props) => <>{props?.last_name}</>
            },
            {
              key: 'birthday',
              title: <>Cumpleaños</>,
              sortable: true,
              searchable: true,
              view: (props) => <>{props?.birthday}</>
            }
          ]}
        />
      </AtomWrapper>
    </AtomWrapper>
  );
};

Employees.Layout = 'prvate';

export default Employees;
