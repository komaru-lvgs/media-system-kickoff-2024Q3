import React from 'react'
import styles from './index.module.scss'
import { useTwister } from '../../../hooks/useTwister'
import { twisterProgress } from '../../../libs/twister'
import { Button } from '../../atoms/button'
import { Timer } from '../../atoms/timer'
import { ScoreModal } from '../../atoms/scoreModal'

export const Twister: React.FC = () => {
  const {
    nextKey,
    needPressKeys,
    needReleaseKey,
    currentScreen,
    handleButtonClick,
    isStop,
    isModalOpen,
    scoreCount,
  } = useTwister()

  return (
    <>
      {currentScreen === twisterProgress.START && (
        <div
          className={styles.start}
          style={{ height: window.innerHeight, width: window.innerWidth }}
        >
          <img
            src="images/twister_startback.png"
            className={styles.startBack}
            width={window.innerWidth}
            alt=""
          />
          <div className={styles.button}>
            <Button innerText={'START'} clickEvent={handleButtonClick} />
          </div>
        </div>
      )}
      {currentScreen === twisterProgress.GAME && nextKey !== undefined && (
        <img src={nextKey.img} alt="" className={styles.nextKey} />
      )}
      {currentScreen === twisterProgress.GAME && (
        <div className={styles.needPressKeyBox}>
          {needPressKeys.map((key) => (
            <img src={key.img} alt="" className={styles.keyImg} />
          ))}
        </div>
      )}
      {currentScreen === twisterProgress.GAME &&
        needReleaseKey !== undefined && (
          <img src={needReleaseKey.img} alt="" className={styles.releaseKey} />
        )}
      {currentScreen === twisterProgress.GAME && (
        <>
          <div className={styles.header}>
            <Timer isStop={isStop} />
          </div>
          <img
            src={'images/twister_kumonasi.png'}
            className={styles.twister}
            alt="twister"
          />
          <div className={styles.loopwrap}>
            <ul>
              <li>
                <img
                  src={'images/kumo_1.png'}
                  className={styles.loopwrapimg}
                  alt=""
                />
              </li>
              <li>
                <img
                  src={'images/kumo_2.png'}
                  className={styles.loopwrapimg}
                  alt=""
                />
              </li>
              <li>
                <img
                  src={'images/kumo_3.png'}
                  className={styles.loopwrapimg}
                  alt=""
                />
              </li>
            </ul>
          </div>
          {isModalOpen && <ScoreModal gamePoint={scoreCount} />}
        </>
      )}
    </>
  )
}
