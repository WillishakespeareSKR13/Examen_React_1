import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export const ImagesAtom = atomWithStorage('IMAGES', [] as string[]);

export const ImagePreviewAtom = atom(0);

export const ImagePreviewSelectedAtom = atom(
  (get) => get(ImagesAtom)[get(ImagePreviewAtom)]
);
