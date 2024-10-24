import { MemberFromItem } from '../types'

export const members: MemberFromItem[] = [
  {
    id: 1,
    name: '小丸 友梨',
    from: '兵庫',
    img1: 'images/syoukaiphoto_komaru.png',
    img2: 'images/komaru_makimono.png',
    hint1: 'images/shushinchi_koubegyu.png',
    hint2: 'images/shushinchi_tamanegi.png',
  },
  {
    id: 2,
    name: '小島 洋明',
    from: '東京',
    img1: 'images/syoukaiphoto_kojikoji.png',
    img2: 'images/koji_makimono.png',
    hint1: 'images/shushinchi_skytree.png',
    hint2: 'images/shushinchi_kaminarimon.png',
  },
  {
    id: 3,
    name: '黒田 光咲',
    from: '岡山',
    img1: 'images/syoukaiphoto_misaki.png',
    img2: 'images/misaki_makimono.png',
    hint1: 'images/shushinchi_kozima.png',
    hint2: 'images/shushinchi_momo.png',
  },
  {
    id: 4,
    name: '林 幸多郎',
    from: '岐阜',
    img1: 'images/syoukaiphoto_kotaro.png',
    img2: 'images/kotaro_makimono.png',
    hint1: 'images/shushinchi_goheimoti.png',
    hint2: 'images/shushinchi_sarubobo.png',
  },
  {
    id: 5,
    name: '岡本 愛',
    from: '愛知',
    img1: 'images/syoukaiphoto_ai.png',
    img2: 'images/ai_makimono.png',
    hint1: 'images/shushinchi_hitumabusi.png',
    hint2: 'images/shushinchi_ogurato-suto.png',
  },
]

export enum QuestionProgress {
  START,
  GAME,
  HINT1,
  HINT2,
  FAILURE,
  CLEAR,
}

export const timerSecond =60 