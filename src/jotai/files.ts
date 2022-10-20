import { atom } from 'jotai';

export const FilesAtom = atom([] as File[]);

export const ImagesAtom = atom((get) =>
  get(FilesAtom).map((file) => URL.createObjectURL(file))
);
