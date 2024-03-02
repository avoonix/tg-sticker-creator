import { atom, useSetAtom } from "jotai";

export interface Auth {}

export const authAtom = atom<Auth>({});
