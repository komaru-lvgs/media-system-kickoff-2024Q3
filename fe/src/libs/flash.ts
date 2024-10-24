import { FlashQuestion } from '../types'

export const countdownImagePathList = [
  'images/flash_number3.png',
  'images/flash_number2.png',
  'images/flash_number1.png',
]
export const gameImagePathList = [
  'images/flash_ai.png',
  'images/flash_misaki.png',
  'images/flash_komaru.png',
  'images/flash_kojima.png',
  'images/flash_koutarou.png',
]

export const allAnswer = [
  'images/flash_koutaro_answer.png',
  'images/flash_ai_answer.png',
  'images/flash_kojima_answer.png',
]

export const questionItemList: FlashQuestion[] = [
  {
    questionText: '5番目にいた新卒は誰でしょう？ ',
    choices: [
      {
        id: 'kotaro',
        label: '林幸多郎',
      },
      {
        id: 'mazinn',
        label: '魔神ブー',
      },
      {
        id: 'misaki',
        label: '黒田光咲',
      },
      {
        id: 'koji',
        label: '小島洋明',
      },
    ],
    answer: 'kotaro',
    incorrectImagePath: 'images/flash_wrong_koutaro.png',
  },
  {
    questionText: '1番目にいた新卒は誰でしょう？ ',
    choices: [
      {
        id: 'ai',
        label: '岡本愛',
      },
      {
        id: 'koji',
        label: '小島洋明',
      },
      {
        id: 'satomi',
        label: '石原さとみ',
      },
      {
        id: 'komaru',
        label: '小丸友梨',
      },
    ],
    answer: 'ai',
    incorrectImagePath: 'images/flash_wrong_ai.png',
  },
  {
    questionText: '4番目にいた新卒は誰でしょう？ ',
    choices: [
      {
        id: 'kotaro',
        label: '林幸多郎',
      },
      {
        id: 'misaki',
        label: '黒田光咲',
      },
      {
        id: 'komaru',
        label: '小丸友梨',
      },
      {
        id: 'koji',
        label: '小島洋明',
      },
    ],
    answer: 'koji',
    incorrectImagePath: 'images/flash_wrong_koji.png',
  },
]

export enum FlashProgress {
  START,
  COUNTDOWN,
  FLASH,
  QUESTION,
  CORRECT,
  INCORRECT,
}
