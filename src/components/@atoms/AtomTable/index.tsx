import { css } from '@emotion/react';
import { useMemo, useState } from 'react';
import AtomWrapper from '../AtomWrapper';
import AtomText from '../AtomText';
import AtomButton from '../AtomButton';
import AtomInput from '../AtomInput';
import AtomIcon from '../AtomIcon';

import { INPUT_TEXT, INPUT_SELECT } from './css/inputs';
import { BUTTON_ICON } from './css/button';

import {
  AtomTableStyled,
  AtomTbodyStyled,
  AtomTfootStyled,
  TDStyled,
  TRStyled
} from './styled';
import { AtomTableTypes } from './types';

const OptionsTake = [
  {
    id: 'takeKey0',
    label: '5',
    value: '5'
  },
  {
    id: 'takeKey1',
    label: '10',
    value: '10'
  },
  {
    id: 'takeKey2',
    label: '25',
    value: '25'
  },
  {
    id: 'takeKey3',
    label: '50',
    value: '50'
  }
];

type ISort = {
  [key: string]: 'ASC' | 'DESC' | 'NONE';
};

const AtomTable = <T extends object>(props: AtomTableTypes<T>) => {
  const { columnscss, data, columns, css: cssTable } = props;
  const [take, setTake] = useState(10);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<ISort>({});

  const filters = useMemo(
    () =>
      columns?.reduce(
        (acc, item) => [
          ...acc,
          ...(item?.searchable ? [item?.key ?? 'KEY'] : [])
        ],
        [] as string[]
      ),
    [columns]
  );

  const dataChunks = useMemo(
    () =>
      data
        ?.slice()
        ?.filter((item) => {
          if (filters?.length === 0) {
            return true;
          }
          const isValid = filters?.find((filter) => {
            const value = `${item[filter as keyof T]}`.toLowerCase();
            return search === '' ? true : value.includes(search.toLowerCase());
          });
          return Boolean(isValid);
        })
        ?.sort((a, b) => {
          const keys = Object.keys(sort);
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const valueA = a[key as keyof T];
            const valueB = b[key as keyof T];
            if (valueA === valueB) {
              continue;
            }
            if (sort[key] === 'ASC') {
              return valueA < valueB ? -1 : 1;
            }
            if (sort[key] === 'DESC') {
              return valueA < valueB ? 1 : -1;
            }
          }
          return 0;
        })
        ?.reduce((acc, item, index) => {
          const chunkIndex = Math.floor(index / take);
          if (!acc[chunkIndex]) {
            acc[chunkIndex] = [];
          }
          acc[chunkIndex].push(item);
          return acc;
        }, [] as T[][]),
    [data, take, search, filters, sort]
  );

  const selectChunk = useMemo(() => dataChunks?.[page], [dataChunks, page]);

  const getArrayPagesShow = useMemo(
    () =>
      dataChunks
        ?.map((_, index) => index)
        ?.filter(
          (_, index) =>
            index >= Math.min(page - 2, dataChunks?.length - 5) &&
            index <= Math.max(page + 2, 4)
        ),
    [dataChunks, page]
  );

  return (
    <AtomTableStyled css={cssTable?.()}>
      <thead>
        {columns.filter((item) => item?.searchable).length > 0 && (
          <tr className="searchTR">
            {columns.map((_, index) =>
              columns?.length === index + 1 ? (
                <th>
                  <AtomWrapper
                    css={() => css`
                      flex-direction: row;
                      justify-content: flex-end;
                      align-items: center;
                      gap: 10px;
                    `}
                  >
                    <AtomText>Buscar </AtomText>
                    <AtomInput
                      input={{
                        value: search,
                        onChange: (e) => setSearch(e.target.value)
                      }}
                      label={{
                        css: () => css`
                          ${INPUT_TEXT}
                          input {
                            font-size: 10px;
                            font-weight: 700;
                            color: #424242;
                            height: 30px;
                            min-width: 180px;
                          }
                        `
                      }}
                    />
                  </AtomWrapper>
                </th>
              ) : (
                <th>
                  <></>
                </th>
              )
            )}
          </tr>
        )}
        <tr>
          {columns?.map((e, i) => (
            <th key={`header ${i + 1}`}>
              <AtomWrapper
                css={() => css`
                  background-color: transparent;
                  padding-right: 10px;
                  align-items: center;
                  justify-content: space-between;
                  flex-direction: row;
                  width: 100%;
                `}
              >
                {e.title}
                {e?.sortable && (
                  <AtomWrapper
                    css={() => css`
                      background-color: transparent;
                      width: max-content;
                    `}
                  >
                    <AtomButton
                      onClick={() => {
                        setSort({
                          ...sort,
                          [e?.key ?? 'KEY']:
                            sort?.[e?.key ?? 'KEY'] === 'ASC' ? 'NONE' : 'ASC'
                        });
                      }}
                      css={() => css`
                        ${BUTTON_ICON}
                        transform: rotate(90deg)!important;
                        min-height: 0;
                      `}
                    >
                      <AtomIcon
                        icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/MDC-0001/svg/chevron-left-solid%20(2).svg"
                        css={() => css`
                          width: 10px;
                          height: 10px;
                          svg {
                            path {
                              fill: ${sort?.[e?.key ?? 'KEY'] === 'ASC'
                                ? '#565656'
                                : '#c0c0c0'};
                            }
                          }
                        `}
                      />
                    </AtomButton>
                    <AtomButton
                      onClick={() => {
                        setSort({
                          ...sort,
                          [e?.key ?? 'KEY']:
                            sort?.[e?.key ?? 'KEY'] === 'DESC' ? 'NONE' : 'DESC'
                        });
                      }}
                      css={() => css`
                        ${BUTTON_ICON}
                        transform: rotate(90deg)!important;
                        min-height: 0;
                      `}
                    >
                      <AtomIcon
                        css={() => css`
                          width: 10px;
                          height: 10px;
                          svg {
                            path {
                              fill: ${sort?.[e?.key ?? 'KEY'] === 'DESC'
                                ? '#565656'
                                : '#c0c0c0'};
                            }
                          }
                        `}
                        icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/MDC-0001/svg/chevron-right-solid%20(7).svg"
                      />
                    </AtomButton>
                  </AtomWrapper>
                )}
              </AtomWrapper>
            </th>
          ))}
        </tr>
      </thead>

      <AtomTbodyStyled>
        {selectChunk?.map((e, i: number) => (
          <TRStyled
            key={`row${i + 1}-${page}-${take}`}
            animate={{
              opacity: 1
            }}
            initial={{ opacity: 0 }}
            transition={{ delay: i * 0.03, duration: 0, ease: 'easeOut' }}
            css={columnscss?.(e)}
          >
            {columns?.map((td, j) => (
              <TDStyled
                key={`cell ${i + 1} ${j + 1}`}
                {...td}
                title={`${td?.key} ${i + 1}`?.toUpperCase()}
                css={td?.css?.(e)}
              >
                {td.view(e)}
              </TDStyled>
            ))}
          </TRStyled>
        ))}
      </AtomTbodyStyled>

      <AtomTfootStyled>
        <tr>
          <td colSpan={columns.length}>
            <AtomWrapper
              css={() => css`
                display: flex;
                table-layout: inherit;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
              `}
            >
              <AtomWrapper
                css={() => css`
                  flex-direction: row;
                  align-items: center;
                  gap: 20px;
                  width: max-content;
                `}
              >
                <AtomWrapper
                  css={() => css`
                    width: max-content;
                    span {
                      font-size: 12px;
                      font-weight: 600;
                      color: #383838;
                    }
                  `}
                >
                  <AtomText>
                    Pagina {page + 1} de {dataChunks?.length}
                  </AtomText>
                  <AtomText>Elementos {data?.length}</AtomText>
                </AtomWrapper>

                <AtomInput
                  id="take"
                  options={OptionsTake}
                  select={{
                    value: take,
                    onChange: (e) => {
                      setTake(Number(e?.target?.value));
                      setPage(0);
                    }
                  }}
                  type="select"
                  label={{
                    css: () => css`
                      ${INPUT_SELECT}
                      select {
                        height: 30px;
                        font-size: 10px;
                        min-width: 150px;
                      }
                    `
                  }}
                />
              </AtomWrapper>

              <AtomWrapper
                css={() => css`
                  flex-direction: row;
                  align-items: center;
                  gap: 10px;
                  width: max-content;
                `}
              >
                <AtomWrapper
                  css={() => css`
                    width: max-content;
                    flex-direction: row;
                    align-items: center;
                    gap: 10px;
                  `}
                >
                  <AtomButton
                    onClick={() => setPage(Math.max(0, page - 1))}
                    css={() => css`
                      ${BUTTON_ICON}
                    `}
                  >
                    <AtomIcon
                      icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/MDC-0001/svg/chevron-left-solid%20(2).svg"
                      css={() => css`
                        width: 16px;
                        height: 16px;
                        svg {
                          path {
                            fill: ${page === 0 ? '#c0c0c0' : '#4d51e0'};
                          }
                        }
                      `}
                    />
                  </AtomButton>
                  <AtomWrapper
                    css={() => css`
                      width: max-content;
                      flex-direction: row;
                      align-items: center;
                      gap: 10px;
                      overflow: hidden;
                    `}
                  >
                    {getArrayPagesShow?.map((i) => (
                      <AtomButton
                        key={`page ${i}`}
                        onClick={() => setPage(i)}
                        css={() => css`
                          display: flex;
                          align-items: center;
                          justify-content: center;
                          width: 35px;
                          padding: 0;
                          font-size: 12px;
                          background-color: ${page === i
                            ? '#4d51e0'
                            : 'white'} !important;
                          color: ${page === i ? 'white' : '#383838'} !important;
                        `}
                      >
                        {`${i + 1}`}
                      </AtomButton>
                    ))}
                  </AtomWrapper>
                  <AtomButton
                    onClick={() =>
                      setPage(Math.min((dataChunks?.length ?? 0) - 1, page + 1))
                    }
                    css={() => css`
                      ${BUTTON_ICON}
                    `}
                  >
                    <AtomIcon
                      icon="https://storage.googleapis.com/cdn-bucket-ixulabs-platform/MDC-0001/svg/chevron-right-solid%20(7).svg"
                      css={() => css`
                        width: 16px;
                        height: 16px;
                        svg {
                          path {
                            fill: ${page === (dataChunks?.length ?? 0) - 1
                              ? '#c0c0c0'
                              : '#4d51e0'};
                          }
                        }
                      `}
                    />
                  </AtomButton>
                </AtomWrapper>
              </AtomWrapper>
            </AtomWrapper>
          </td>
        </tr>
      </AtomTfootStyled>
    </AtomTableStyled>
  );
};
export default AtomTable;
