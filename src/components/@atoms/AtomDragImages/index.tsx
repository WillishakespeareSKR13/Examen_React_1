import AtomButton from '@atoms/AtomButton';
import AtomImage from '@atoms/AtomImage';
import AtomText from '@atoms/AtomText';
import AtomWrapper from '@atoms/AtomWrapper';
import { css } from '@emotion/react';
import { useAtom, useAtomValue } from 'jotai';
import { FilesAtom, ImagesAtom } from 'jotais/files';
import { useState, useRef } from 'react';

const AtomDragImages = () => {
  const [hover, setHover] = useState(false);
  const [files, setFiles] = useAtom(FilesAtom);
  const images = useAtomValue(ImagesAtom);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { files: getFiles } = e.dataTransfer;
    if (getFiles.length) {
      const newFiles = Array.from(getFiles).filter(
        (file) => !files.find((f) => f.name === file.name)
      );
      setFiles([...files, ...newFiles]);
    }
    setHover(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setHover(false);
  };

  const handleRemoveImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleUploadImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      const newFiles = Array.from(files).filter(
        (file) => ![...files].find((f) => f.name === file.name)
      );
      setFiles([...files, ...newFiles]);
    }
  };

  return (
    <AtomWrapper
      css={() => css`
        flex-direction: column;
        width: 600px;
        height: 400px;
        border-radius: 4px;
        border: 1px solid #00000010;
        background-color: #fafafa;
        padding: 20px;
        gap: 20px;
        .container {
          flex: 1;
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
          overflow: hidden;
          padding: 20px;
          justify-content: center;
          align-items: center;
          background-color: transparent;
          border: 2px dashed #00000010;
          .container-images {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            width: 100%;
            height: 100%;
            .container-image {
              position: relative;
              flex-basis: 100px;
              flex-shrink: 1;
              flex-grow: 1;
              button {
                z-index: 10;
                position: absolute;
                top: -15px;
                right: -15px;
                padding: 0;
                width: 30px;
                height: 30px;
                min-height: 0;
                border-radius: 50%;
                display: flex;
                background-color: #4d51e0;
                justify-content: center;
                align-items: center;
              }
              div {
                width: 100%;
                height: 100%;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
              z-index: ${files?.length === 0 || hover ? -2 : 0};
            }
          }
          .container-info {
            position: absolute;
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            background-color: ${hover ? '#f3f3f310' : 'transparent'};
            backdrop-filter: blur(${hover ? '12px' : '0px'});
            justify-content: center;
            align-items: center;
            z-index: ${files?.length === 0 || hover ? 0 : -1};
          }
        }
      `}
    >
      <div
        className="container"
        onClick={handleUploadImage}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div className="container-info">
          {hover ? (
            <AtomText
              css={() => css`
                font-size: 18px;
                text-align: center;
                font-weight: 700;
                color: #3a3a3a;
                user-select: none;
              `}
            >
              Suelte para agregar imagenes
            </AtomText>
          ) : (
            <>
              {images?.length === 0 && (
                <AtomText
                  css={() => css`
                    font-size: 18px;
                    text-align: center;
                    font-weight: 700;
                    color: #3a3a3a;
                    user-select: none;
                  `}
                >
                  Arrastre las imagenes aqui
                </AtomText>
              )}
            </>
          )}
        </div>
        <div className="container-images">
          {images.map((image) => (
            <div key={image} className="container-image">
              <AtomButton
                onClick={() => handleRemoveImage(images.indexOf(image))}
              >
                x
              </AtomButton>
              <AtomImage src={image} alt={image} />
            </div>
          ))}
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        multiple
        onChange={handleChange}
        style={{ display: 'none' }}
      />
    </AtomWrapper>
  );
};

export default AtomDragImages;
