import React from 'react';

import styles from "./index.module.scss"

type RankButtonProperties = {
  team: {
    point: number
    memberName: string
    rank: number
  }
  sum: number
}

export const RankButton: React.FC<RankButtonProperties> =({team,sum}) => {
  let unit="th"
  if(team.rank === 1){
    unit = "st"
  } else if (team.rank === 2) {
    unit = "nd"
  } else if(team.rank === 3){
    unit = "rd"
  } else {
    unit ="th"
  }

  return (
    <div  className={sum/2>team.rank -1?styles.circle1:styles.circle2 }>
      {team.rank}{unit}：{team.point}点
      <span className={styles.teams}>
        {team.memberName}
      </span>
    </div>
  )
}