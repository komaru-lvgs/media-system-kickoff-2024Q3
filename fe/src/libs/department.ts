export const departments: {
  [key: string]: { abbreviation: string; name: string }
} = {
  MEDIA_SYSTEM: { abbreviation: 'メディシス', name: 'メディアシステム部' },
  SOLUTION: {
    abbreviation: 'ソリューション',
    name: 'ソリューション開発部',
  },
  LT: { abbreviation: 'LT', name: 'レバテック開発部' },
  TECHNOLOGY: { abbreviation: 'テク戦', name: 'テクノロジー戦略室' },
  INFORMATION: { abbreviation: '情シス', name: '情報システム室' },
  LMC: { abbreviation: 'LMC', name: 'レバウェル開発部' },
  VPOE: { abbreviation: 'VPoE', name: 'VPoE室' },
  CHEER: { abbreviation: '応援部', name: '新卒応援部' },
}

export const msRankingRefetchInterval = 60000
