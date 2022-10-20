import AtomButton from '@atoms/AtomButton';
import AtomImage from '@atoms/AtomImage';
import AtomText from '@atoms/AtomText';
import AtomWrapper from '@atoms/AtomWrapper';
import { css } from '@emotion/react';
import ModalAddImage from '@molecules/ModalAddImage';
import ModalPreviewImage from '@molecules/ModalPreviewImage';
import { backgroundColorFlatButton } from 'css';
import { WrapperStyle } from 'css/wrappers';
import { useAtomValue, useSetAtom } from 'jotai';
import { ImagePreviewAtom, ImagesAtom } from 'jotais/images';
import { ModalImagesAtom, ModalPreviewImagesAtom } from 'jotais/modal';
import { NextPageFC } from 'next';

const Upload: NextPageFC = () => {
  const images = useAtomValue(ImagesAtom);
  const setModal = useSetAtom(ModalImagesAtom);
  const setModalPreview = useSetAtom(ModalPreviewImagesAtom);
  const setImagePreview = useSetAtom(ImagePreviewAtom);

  return (
    <AtomWrapper
      css={() => css`
        ${WrapperStyle}
        align-items: flex-start;
        background-color: #fafbfc;
      `}
    >
      <ModalPreviewImage />
      <ModalAddImage />
      <AtomWrapper
        css={() => css`
          padding: 20px 90px;
          width: 100%;
          height: 100%;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 20px;
        `}
      >
        <AtomWrapper
          css={() => css`
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            background-color: #fff;
            padding: 20px 40px;
            border-radius: 4px;
            box-shadow: rgb(0 0 0 / 5%) 0px 3px 6px;
          `}
        >
          <AtomText
            css={() => css`
              font-weight: 700;
              font-size: 24px;
            `}
          >
            Imagenes -{' '}
            <AtomText
              css={() => css`
                font-weight: 600;
                font-size: 16px;
              `}
            >
              {images.length > 0
                ? `${images.length} Imagenes agregadas`
                : 'No hay imagenes'}
            </AtomText>
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
            Agrergar Imagenes
          </AtomButton>
        </AtomWrapper>
        <AtomWrapper
          css={() => css`
            flex: 1;
            width: 100%;
            justify-content: flex-start;
            align-items: flex-start;
            flex-direction: row;
            overflow-y: auto;
            background-color: #fff;
            padding: 20px 40px;
            border-radius: 4px;
            box-shadow: rgb(0 0 0 / 5%) 0px 3px 6px;
            padding: 40px;
            gap: 20px;
          `}
        >
          <AtomWrapper
            css={() => css`
              display: flex;
              width: 100%;
              justify-content: flex-start;
              align-items: flex-start;
              gap: 20px;
              height: max-content;
              flex-direction: row;
              overflow: visible;
            `}
          >
            {images.map((image) => (
              <AtomButton
                key={image}
                onClick={() => {
                  setModalPreview(true);
                  setImagePreview(images.indexOf(image));
                }}
                css={() => css`
                  display: flex;
                  flex-grow: 1;
                  flex-basis: 400px;
                  padding: 0;
                  background-color: transparent;
                  border-radius: 4px;
                  border: 1px solid #e1e4e8;
                  box-shadow: rgb(0 0 0 / 5%) 0px 3px 6px;
                  overflow: hidden;
                `}
              >
                <AtomImage
                  alt={image}
                  src={image}
                  css={() => css`
                    width: 100%;
                    height: 100%;
                    img {
                      width: 100%;
                    }
                  `}
                />
              </AtomButton>
            ))}
          </AtomWrapper>
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};

Upload.Layout = 'prvate';

export default Upload;
