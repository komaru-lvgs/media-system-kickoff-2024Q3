import React from 'react'

import styles from './index.module.scss'
import { useQueryTeam } from '../../../hooks/useQueryTeam'

type GamePageTemplateProperties = {
  isFrame?: boolean
}

export const GamePageTemplate: React.FC<GamePageTemplateProperties> = ({
  isFrame,
}) => {
  const { data, isLoading } = useQueryTeam()
  if (isLoading) {
    return <p>loading</p>
  }
  return (
    <div className={styles.mainView}>
      <div className={styles.container2}>
        {data && (
          <div className={styles.curve2}>
            チーム：
            {data.members?.map((member) => member.familyName).join(',')}
            <br />
            　得点：{data.point}点
          </div>
        )}
      </div>
      <div className={styles.container1}>
        <div
          className={styles.curve1}
          style={{ backgroundColor: isFrame ? '#a6ddbc' : 'white' }}
        />
        <img src={'images/awa.png'} className={styles.awa1} alt="awa1" />
        <img src={'images/awa.png'} className={styles.awa2} alt="awa2" />
        <img
          src={'images/shinsotu.png'}
          className={styles.shinsotu}
          alt="shinsotu"
        />
        <img
          src={'images/chinanago.png'}
          className={styles.chinanago1}
          alt="chinanago1"
        />
        <img src={'images/rakko.png'} className={styles.rakko1} alt="rakko1" />
        <img src={'images/iruka.png'} className={styles.iruka1} alt="iruka1" />
        <img src={'images/ika.png'} className={styles.ika1} alt="ika1" />
        <img
          src={'images/kurage.png'}
          className={styles.kurage1}
          alt="kurage1"
        />
        <img
          src={'images/kaigara.png'}
          className={styles.kaigara1}
          alt="kaigara1"
        />
        <img
          src={'images/kawauso.png'}
          className={styles.kawauso1}
          alt="kawauso1"
        />
        <img src={'images/kani.png'} className={styles.kani1} alt="kani1" />
        <img
          src={'images/hitode.png'}
          className={styles.hitode1}
          alt="hitode1"
        />
        <img
          src={'images/chinanago.png'}
          className={styles.chinanago2}
          alt="chinanago2"
        />
        <img src={'images/rakko.png'} className={styles.rakko2} alt="rakko2" />
        <img src={'images/iruka.png'} className={styles.iruka2} alt="iruka2" />
        <img src={'images/ika.png'} className={styles.ika2} alt="ika2" />
        <img
          src={'images/kurage.png'}
          className={styles.kurage2}
          alt="kurage2"
        />
        <img
          src={'images/kaigara.png'}
          className={styles.kaigara2}
          alt="kaigara2"
        />
        <img
          src={'images/kawauso.png'}
          className={styles.kawauso2}
          alt="kawauso2"
        />
        <img src={'images/kani.png'} className={styles.kani2} alt="kani2" />
        <img
          src={'images/hitode.png'}
          className={styles.hitode2}
          alt="hitode2"
        />
      </div>
    </div>
  )
}
