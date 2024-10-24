import React from 'react'
import { useQuerySortedTeams } from "../../../hooks/useQuerySortedTeams"
import { Department } from '../../../types'
import { RankButton } from '../../atoms'
import styles from "./index.module.scss"
import { departments } from '../../../libs/department'

export const RankingPerDepartment: React.FC =() => {
  const { data, isLoading } = useQuerySortedTeams()
  if(isLoading || !data){
    return <p>Loading...</p>
  }

  const departmentPoints: { [key: string]: number } = {};
  data.forEach(team => {
    if (team.department in departmentPoints) {
      departmentPoints[team.department] += team.point
    } else {
      departmentPoints[team.department] = team.point
    }
  })

  const averagePoints: Department[] = []
  Object.keys(departmentPoints).forEach(department => {
    averagePoints.push({ name: department, point: departmentPoints[department] / data.filter(team => team.department === department).length })
  })

  return (
    <>
      <ul  className={styles.rankingList}>
        {averagePoints.map((item,index) => (
          <li key = {index}>
              <RankButton team={{point:Number(item.point.toFixed()),rank:index+1,memberName:departments[item.name]}} sum={averagePoints.length}/>
          </li>
        ))}
      </ul>
      <div className={styles.leftSide}/>
      <div className={styles.rightSide}/>
    </>    
  )
}