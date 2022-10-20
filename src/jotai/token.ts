import { atomWithStorage } from 'jotai/utils';

export const TokenAtom = atomWithStorage('TOKEN', null as unknown as string);
