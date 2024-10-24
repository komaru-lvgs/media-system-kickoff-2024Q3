import { Card } from '../types'

export const cardList: Card[] = [
  { imagePath: 'images/ai_name_shinkeisuizyaku.png', address: 1 },
  { imagePath: 'images/kojikoji_name_shinkeisuizyaku.png', address: 2 },
  { imagePath: 'images/kotaro_shinkeisuizyaku.png', address: 3 },
  { imagePath: 'images/komaru_name_shinkeisuizyaku.png', address: 4 },
  { imagePath: 'images/misaki_shinkeisuizyaku.png', address: 5 },
  { imagePath: 'images/kojikoji_shinkeisuizyaku.png', address: 6 },
  { imagePath: 'images/misaki_name_shinkeisuizyaku.png', address: 7 },
  { imagePath: 'images/kotaro_name_shinkeisuizyaku.png', address: 8 },
  { imagePath: 'images/ai_shinkeisuizyaku.png', address: 9 },
  { imagePath: 'images/komaru_shinkeisuizyaku.png', address: 10 },
]
export const answerAddressLists = [
  [1, 9],
  [2, 6],
  [3, 8],
  [4, 10],
  [5, 7],
]

export enum NervousBreakdownProgress {
  START,
  GAME,
}

export const timerSecond = 60
