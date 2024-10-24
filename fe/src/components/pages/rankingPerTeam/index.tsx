import React from 'react'
import { useQuerySortedTeams } from "../../../hooks/useQuerySortedTeams"
import { useScroll } from '../../../hooks/useScroll'
import { RankButton } from '../../atoms'
import styles from "./index.module.scss"

export const RankingPerTeam: React.FC =() => {
  const { data, isLoading } = useQuerySortedTeams()
  useScroll({isLoading, scrollStep: 1, scrollDelay: 10})

  if(isLoading || !data){
    return <p>Loading...</p>
  }

  return (
    <>
      <head className={styles.mainView}>
        <img src={'images/shinsotu.png'} className={styles.shinsotu} alt="shinsotu" />
        <img src={'images/kawauso.png'} className={styles.kawauso1} alt="kawauso1" />
        <img src={'images/kawauso.png'} className={styles.kawauso2} alt="kawauso2" />
      </head>
      <ul  className={styles.rankingList}>
        {data.map((item,index) => (
          <li key = {index}>
              <RankButton team={{point:item.point,rank:index+1,memberName:item.members?.map((member)=>member.familyName).join(",")!}} sum={data.length}/>
          </li>
        ))}
      </ul>
      <div className={styles.leftSide}/>
      <div className={styles.rightSide}/>
    </>     
  )
}