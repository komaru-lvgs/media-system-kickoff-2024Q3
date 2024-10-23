import React from 'react'
import { SingleCard } from '../../atoms'
import styles from './index.module.scss'

export const Card: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.question}>
          <div className={styles.questionBox}>
            <div className={styles.questionTitle}>お題</div>
            <div className={styles.questionMessage}>
              エンジニアとして喜ぶ瞬間
            </div>
          </div>
        </div>
        <div className={styles.cards}>
          <SingleCard color="red" message="プログラムが正常に動いた時" />
          <SingleCard color="blue" message="課題チェックが上手く進んだ時" />
          <SingleCard color="green" message="バグの原因が分かった時" />
          <SingleCard color="yellow" message="基本情報技術者試験で合格した時" />
          <SingleCard color="purple" message="仕事を済ませて早く退勤できた時" />
        </div>
      </div>
    </>
  )
}
