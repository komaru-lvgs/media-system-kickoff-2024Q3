import React from 'react'
import styles from './index.module.scss'

type ScoreModalProperties = {
  gamePoint: number
}

export const ScoreModal: React.FC<ScoreModalProperties> = ({ gamePoint }) => {

  return (
    <>
      <div className={styles.modal}></div>
      <div className={styles.container}>
        <img src={'images/score.png'} className={styles.score} alt="score" />
        <div className={styles.point}>{gamePoint}</div>
      </div>
    </>
  )
}
