import React, { useRef, useState } from 'react'
import styles from './index.module.scss'
import { LineConnectionProgress } from '../../../libs/lineConnection'
import { useLineConnection } from '../../../hooks/useLineConnection'
import { Button } from '../../atoms/button'
import { Timer } from '../../atoms/timer'
import { Life } from '../../atoms/life'
import { ScoreModal } from '../../atoms/scoreModal'

export const LineConnection: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<LineConnectionProgress>(
    LineConnectionProgress.START,
  )
  const divsRef = useRef<HTMLDivElement[]>([])
  const elmPointRef = useRef<HTMLDivElement>(null)
  const {
    handleSubmission,
    handleButtonClick,
    life,
    isStop,
    isModalOpen,
    scoreCount,
  } = useLineConnection({
    divsRef,
    elmPointRef,
  })

  return (
    <>
      {currentScreen === LineConnectionProgress.START && (
        <>
          <div className={styles.setumei}>
            <img
              src={'images/chokusen_start.png'}
              className={styles.start}
              alt=""
            />
            <div className={styles.startButton}>
              <Button
                innerText="START"
                clickEvent={() => {
                  setCurrentScreen(LineConnectionProgress.GAME)
                }}
              />
            </div>
          </div>
        </>
      )}
      {currentScreen === LineConnectionProgress.GAME && (
        <div className={styles.main} style={{ height: window.innerHeight }}>
          <div className={styles.header}>
            <Timer isStop={isStop} />
            <Life maxLife={3} currentLife={life} />
            <div className={styles.button}>
              <Button innerText="SUBMIT" clickEvent={handleSubmission} />
            </div>
          </div>
          <img
            src={'images/chokusen_background.png'}
            className={styles.background}
            alt="chokusen"
          />
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              ref={(div) => {
                if (div) {
                  divsRef.current[index] = div
                }
              }}
              id={String(index)}
              data-index={index}
              className={`${styles.button} ${styles[`button${index + 1}`]}`}
              onClick={() => handleButtonClick(index)}
            />
          ))}
          <div ref={elmPointRef} className={styles.elmPoint}></div>
        </div>
      )}
      {isModalOpen && <ScoreModal gamePoint={scoreCount} />}
    </>
  )
}
