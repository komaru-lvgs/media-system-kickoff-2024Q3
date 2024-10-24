export const allRow = [
  [
    { imageName: 'images/faceswap_komaru1.png' },
    { imageName: 'images/faceswap_kojima1.png' },
    { imageName: 'images/faceswap_misaki1.png' },
    { imageName: 'images/faceswap_ai1.png' },
    { imageName: 'images/faceswap_koutaro1.png' },
  ],
  [
    { imageName: 'images/faceswap_komaru2.png' },
    { imageName: 'images/faceswap_kojima2.png' },
    { imageName: 'images/faceswap_misaki2.png' },
    { imageName: 'images/faceswap_ai2.png' },
    { imageName: 'images/faceswap_koutaro2.png' },
  ],
  [
    { imageName: 'images/faceswap_komaru3.png' },
    { imageName: 'images/faceswap_kojima3.png' },
    { imageName: 'images/faceswap_misaki3.png' },
    { imageName: 'images/faceswap_ai3.png' },
    { imageName: 'images/faceswap_koutaro3.png' },
  ],
  [
    { imageName: 'images/faceswap_komaru4.png' },
    { imageName: 'images/faceswap_kojima4.png' },
    { imageName: 'images/faceswap_misaki4.png' },
    { imageName: 'images/faceswap_ai4.png' },
    { imageName: 'images/faceswap_koutaro4.png' },
  ],
]

export enum ScreenProgress {
  START,
  GAME1,
  ANSWER1wrong,
  ANSWER1correct,
  GAME2,
  ANSWER2wrong,
  ANSWER2correct,
}

export const answerIndex = {
  game1: 0, //小丸
  game2: 2, //美咲
}

export const game2InitialIndexList = [3, 2, 4, 1]
