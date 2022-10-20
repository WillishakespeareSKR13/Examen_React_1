import AtomButton from '@atoms/AtomButton';
import AtomIcon from '@atoms/AtomIcon';
import AtomImage from '@atoms/AtomImage';
import AtomWrapper from '@atoms/AtomWrapper';
import { css } from '@emotion/react';
import { useAtom, useAtomValue } from 'jotai';
import {
  ImagePreviewAtom,
  ImagePreviewSelectedAtom,
  ImagesAtom
} from 'jotais/images';
import { ModalPreviewImagesAtom } from 'jotais/modal';
import { FC } from 'react';

const ModalPreviewImage: FC = () => {
  const [modal, setModal] = useAtom(ModalPreviewImagesAtom);
  const imagePreviewSelectedAtom = useAtomValue(ImagePreviewSelectedAtom);
  const images = useAtomValue(ImagesAtom);
  const [imagePreview, setImagePreview] = useAtom(ImagePreviewAtom);

  if (!modal) return null;
  return (
    <AtomWrapper
      onClick={() => {
        setModal(false);
      }}
      css={() => css`
        flex-direction: column;
        top: 0;
        width: 100vw;
        height: 100vh;
        position: fixed;
        justify-content: center;
        align-items: center;
        background-color: #00000010;
        backdrop-filter: blur(12px);
        z-index: 100;
        gap: 40px;
      `}
    >
      <AtomWrapper
        onClick={() => {
          setModal(false);
        }}
        css={() => css`
          flex-direction: row;
          width: 90%;
          height: 70vh;
          background-color: transparent;
          align-items: center;
          justify-content: center;
          gap: 30px;
        `}
      >
        <AtomButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setImagePreview(Math.max(0, imagePreview - 1));
          }}
          css={() => css`
            padding: 10px;
            background-color: transparent;
            :hover {
              background-color: transparent;
            }
          `}
        >
          <AtomIcon
            icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/MDC-0001/svg/chevron-left-solid%20(2).svg"
            css={() => css`
              width: 30px;
              height: 30px;
              svg {
                path {
                  fill: ${imagePreview === 0 ? '#c0c0c0' : '#393dcc'};
                }
              }
            `}
          />
        </AtomButton>
        <AtomImage
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          src={imagePreviewSelectedAtom}
          css={() => css`
            flex: 1;
            max-height: 100%;
            box-shadow: rgb(0 0 0 / 5%) 0px 3px 6px;
            height: max-content;
            background-color: transparent;
            border-radius: 8px;
            overflow: hidden;

            img {
              background-color: transparent;
              object-fit: contain;
              width: 100%;
              height: 100%;
            }
          `}
        />
        <AtomButton
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setImagePreview(Math.min(images.length - 1, imagePreview + 1));
          }}
          css={() => css`
            padding: 10px;
            background-color: transparent;
            :hover {
              background-color: transparent;
            }
          `}
        >
          <AtomIcon
            icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/MDC-0001/svg/chevron-left-solid%20(2).svg"
            css={() => css`
              transform: rotate(180deg);
              width: 30px;
              height: 30px;
              svg {
                path {
                  fill: ${imagePreview === images?.length - 1
                    ? '#c0c0c0'
                    : '#393dcc'};
                }
              }
            `}
          />
        </AtomButton>
      </AtomWrapper>
      <AtomWrapper
        css={() => css`
          width: 90%;
          height: 10vh;
          overflow-x: auto;
          background-color: transparent;
          justify-content: center;
          align-items: center;
        `}
      >
        <AtomWrapper
          css={() => css`
            max-width: max-content;
            width: max-content;
            flex-direction: row;
            background-color: transparent;
            gap: 10px;
          `}
        >
          {images.map((image) => (
            <AtomButton
              key={image}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                setImagePreview(images.indexOf(image));
              }}
              css={() => css`
                padding: 0;
                background-color: transparent;
                box-shadow: rgb(0 0 0 / 5%) 0px 3px 6px;
                border-radius: 4px;
                overflow: hidden;
                :hover {
                  background-color: transparent;
                }
              `}
            >
              <AtomImage
                key={image}
                src={image}
                css={() => css`
                  width: 80px;
                  height: 80px;
                  img {
                    width: 100%;
                    height: 100%;
                  }
                `}
              />
            </AtomButton>
          ))}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default ModalPreviewImage;
