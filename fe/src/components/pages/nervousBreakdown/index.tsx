import React, { useState } from 'react'
import styles from './index.module.scss'
import {
  NervousBreakdownProgress,
  cardList,
  timerSecond,
} from '../../../libs/nervousBreakdown'

import { useNervousBreakdown } from '../../../hooks/useNervousBreakdown'
import { Button } from '../../atoms/button'
import { Timer } from '../../atoms/timer'
import { ScoreModal } from '../../atoms/scoreModal'

export const NervousBreakdown: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<NervousBreakdownProgress>(
    NervousBreakdownProgress.START,
  )
  const {
    handleClick,
    data: {
      isStop,
      isModalOpen,
      isCorrectModalOpen,
      tableCardList,
      timeNumber,
      selectedCard,
    },
  } = useNervousBreakdown()

  return (
    <>
      {currentScreen === NervousBreakdownProgress.START && (
        <>
          <img
            className={styles.startBack}
            src="images/sinkeisizyaku_rule_start1.png"
            alt=""
            width={window.innerWidth}
            height={window.innerHeight}
          />
          <div className={styles.button}>
            <Button
              innerText="START"
              clickEvent={() => {
                setCurrentScreen(NervousBreakdownProgress.GAME)
              }}
            />
          </div>
        </>
      )}
      {currentScreen === NervousBreakdownProgress.GAME && (
        <div
          className={styles.game}
          style={{ height: window.innerHeight, width: window.innerWidth }}
        >
          <div className={styles.loopWrap}>
            <img
              src={'images/nonakasan_surfing.png'}
              className={styles.nonakasan}
              alt=""
              draggable={false}
            />
          </div>

          <div className={styles.header}>
            <Timer isStop={isStop} />
          </div>

          <div className={styles.cardbox}>
            {cardList.map((card) => (
              <img
                src={`${
                  tableCardList.includes(card)
                    ? card.imagePath
                    : card === selectedCard
                    ? card.imagePath
                    : 'images/hyosi_shinkeisuizyaku.png'
                }`}
                alt=""
                className={styles.photo}
                onClick={() => handleClick(card)}
                draggable={false}
              />
            ))}
          </div>
        </div>
      )}
      {isCorrectModalOpen && (
        <img
          src="images/seikai_shinkeisuizyaku.png"
          className={styles.correct}
          alt=""
        />
      )}
      {(isStop === true || isModalOpen === true) && (
        <ScoreModal gamePoint={(timerSecond - timeNumber) * 5} />
      )}
    </>
  )
}
