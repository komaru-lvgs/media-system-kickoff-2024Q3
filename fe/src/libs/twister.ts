import { TwisterKeyItem } from '../types'

export const keyList: TwisterKeyItem[] = [
  { key: 'E', img: 'images/tuistar__E.png' },
  { key: 'O', img: 'images/tuistar__O.png' },
  { key: '7', img: 'images/tuistar__7.png' },
  { key: 'A', img: 'images/tuistar__A.png' },
  { key: 'K', img: 'images/tuistar__K.png' },
  { key: '6', img: 'images/tuistar__6.png' },
  { key: 'C', img: 'images/tuistar__C.png' },
  { key: 'T', img: 'images/tuistar__T.png' },
  { key: 'M', img: 'images/tuistar__M.png' },
  { key: 'L', img: 'images/tuistar__L.png' },
  { key: 'Z', img: 'images/tuistar__Z.png' },
]

export enum twisterProgress {
  START,
  GAME,
}

export const timerSecond = 60
