import AtomButton from '@atoms/AtomButton';
import AtomInput from '@atoms/AtomInput';
import AtomText from '@atoms/AtomText';
import AtomWrapper from '@atoms/AtomWrapper';
import { css } from '@emotion/react';
import { backgroundColorFlatButton } from 'css';
import { INPUT_TEXT } from 'css/input';
import { useFormik } from 'formik';
import { useAtom } from 'jotai';
import { ModalAtom } from 'jotais/modal';
import * as Yup from 'yup';
import { FC, useState } from 'react';
import CONFIG from 'src/config';
import { useAlert } from 'hooks/alertContext';

type Props = {
  callback?: () => void;
};

const urlFetch = `${CONFIG.URL}/examen/employees/william_JCR`;

const ModalAddEmployee: FC<Props> = (props) => {
  const { callback } = props;
  const { insertAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useAtom(ModalAtom);

  const formik = useFormik({
    initialValues: {
      name: '',
      last_name: '',
      birthday: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required('El nombre es requerido')
        ?.max(30, 'Máximo 30 caracteres'),
      last_name: Yup.string()
        .required('El apellido es requerido')
        ?.max(30, 'Máximo 30 caracteres'),
      birthday: Yup.string()
        .required('El cumpleaños es requerido')
        .test(
          'is-date',
          'La fecha debe ser válida',
          (value) => !isNaN(new Date(value ?? '').getTime())
        )
    }),
    onSubmit: async (values) => {
      setLoading(true);
      fetch(urlFetch, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          last_name: values.last_name,
          birthday: values.birthday
        })
      })
        .then((res) => res.json())
        .then(() => {
          insertAlert({
            id: 'add-employee-alert',
            message: 'Empleado agregado correctamente',
            type: 'success'
          });
          formik.resetForm();
          setLoading(false);
          callback?.();
          setModal(false);
        });
    }
  });

  if (!modal) return null;
  return (
    <AtomWrapper
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        setModal(false);
      }}
      css={() => css`
        width: 100vw;
        height: 100vh;
        position: fixed;
        top: 0;
        justify-content: center;
        align-items: center;
        background-color: #00000010;
        backdrop-filter: blur(12px);
        z-index: 100;
      `}
    >
      <AtomWrapper
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        css={() => css`
          width: max-content;
          height: max-content;
          gap: 20px;
          padding: 40px;
          border-radius: 4px;
          box-shadow: 0px 0px 10px 0px #00000010;
        `}
      >
        <AtomText
          css={() => css`
            font-size: 18px;
            font-weight: 600;
            color: #313131;
          `}
        >
          Agrergar empleado
        </AtomText>
        <AtomWrapper
          css={() => css`
            width: max-content;
            gap: 20px;
            flex-direction: row;
            justify-content: space-between;
          `}
        >
          <AtomInput
            id="name"
            formik={formik}
            spantext="Nombre"
            input={{
              placeholder: 'Nombre'
            }}
            label={{
              css: () => css`
                ${INPUT_TEXT}
              `
            }}
          />
          <AtomInput
            id="last_name"
            formik={formik}
            spantext="Apellido"
            input={{
              placeholder: 'Apellido'
            }}
            label={{
              css: () => css`
                ${INPUT_TEXT}
              `
            }}
          />
        </AtomWrapper>
        <AtomInput
          id="birthday"
          type="date"
          formik={formik}
          spantext="Cumpleaños"
          label={{
            css: () => css`
              ${INPUT_TEXT}
              width: 100%;
            `
          }}
        />
        <AtomButton
          type="button"
          onClick={() => {
            formik.handleSubmit();
          }}
          loading={loading}
          css={() => css`
            width: 100%;
            padding: 10px 30px;
            ${backgroundColorFlatButton('#4d51e0')}
          `}
        >
          Agragar empleado
        </AtomButton>
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default ModalAddEmployee;
