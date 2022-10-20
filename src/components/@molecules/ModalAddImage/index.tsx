import AtomButton from '@atoms/AtomButton';
import AtomText from '@atoms/AtomText';
import AtomWrapper from '@atoms/AtomWrapper';
import { css } from '@emotion/react';
import { backgroundColorFlatButton } from 'css';
import { useFormik } from 'formik';
import { useAtom, useSetAtom } from 'jotai';
import { ModalImagesAtom } from 'jotais/modal';
import * as Yup from 'yup';
import { FC, useState } from 'react';
import { useAlert } from 'hooks/alertContext';
import AtomDragImages from '@atoms/AtomDragImages';
import { FilesAtom } from 'jotais/files';
import InputTextError from '@atoms/AtomInput/error';
import uploadImage from 'utils/uploadImage';
import CONFIG from 'src/config';
import { v4 as uuidv4 } from 'uuid';
import { ImagesAtom } from 'jotais/images';

const ModalAddImage: FC = () => {
  const { insertAlert } = useAlert();
  const setImages = useSetAtom(ImagesAtom);
  const [files, setFiles] = useAtom(FilesAtom);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useAtom(ModalImagesAtom);

  const formik = useFormik({
    initialValues: {
      files: files
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      files: Yup.array().min(1, 'Debe seleccionar al menos una imagen')
    }),
    onSubmit: async (values) => {
      setLoading(true);
      const arrayPromises = values.files.map(
        async (file) =>
          await uploadImage(file, {
            name: `${file.name}-${uuidv4()}`,
            orgcode: CONFIG?.CODE
          })
      );
      const images = await Promise.all(arrayPromises);
      insertAlert({
        id: 'addImages',
        message: 'Empleado agregado correctamente',
        type: 'success'
      });
      setImages(images);
      setFiles([]);
      setLoading(false);
      setModal(false);
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
          Agregar imagenes
        </AtomText>
        <AtomWrapper
          css={() => css`
            width: max-content;
            gap: 5px;
            flex-direction: column;
            justify-content: space-between;
          `}
        >
          <AtomDragImages />
          <InputTextError id="files" formik={formik} />
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
            Agregar imagenes
          </AtomButton>
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default ModalAddImage;
