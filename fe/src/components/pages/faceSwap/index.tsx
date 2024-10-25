import React from 'react'
import styles from './index.module.scss'
import { ScreenProgress } from '../../../libs/faceSwap'

import { useFaceSwap } from '../../../hooks/useFaceSwap'
import { FaceSwapGame } from '../../organisms/faceSwapGame'
import { Button } from '../../atoms/button'
import { ScoreModal } from '../../atoms/scoreModal'

export const FaceSwap: React.FC = () => {
  const {
    data: { isModalOpen, currentScreen, currentIndexList, scoreCount },
    handleStartButtonClick,
    handleRightButtonClick,
    handleLeftButtonClick,
    handleSubmitButtonClick,
  } = useFaceSwap()

  return (
    <>
      {currentScreen === ScreenProgress.START && (
        <div
          className={styles.image}
          style={{ height: window.innerHeight, width: window.innerWidth }}
        >
          <img
            src={'images/faceswap_start_background3.png'}
            width={window.innerWidth}
            height={window.innerHeight}
            alt="start"
          />
          <div className={styles.startButton}>
            <Button innerText="START" clickEvent={handleStartButtonClick} />
          </div>
        </div>
      )}
      {currentScreen === ScreenProgress.GAME1 && (
        <FaceSwapGame
          backgroundSrc={'images/faceswap_komaru.png'}
          currentIndexList={currentIndexList}
          handleRightButtonClick={handleRightButtonClick}
          handleLeftButtonClick={handleLeftButtonClick}
          handleSubmitButtonClick={handleSubmitButtonClick}
        />
      )}
      {currentScreen === ScreenProgress.ANSWER1correct && (
        <div
          className={styles.image}
          style={{ height: window.innerHeight, width: window.innerWidth }}
        >
          <img
            src={'images/faceswap_komaru_correct.png'}
            width={window.innerWidth}
            alt=""
            className={styles.image}
          />
        </div>
      )}
      {currentScreen === ScreenProgress.ANSWER1wrong && (
        <div
          className={styles.image}
          style={{ height: window.innerHeight, width: window.innerWidth }}
        >
          <img
            src={'images/faceswap_komaru_wrong.png'}
            width={window.innerWidth}
            alt=""
          />
        </div>
      )}
      {currentScreen === ScreenProgress.GAME2 && (
        <FaceSwapGame
          backgroundSrc={'images/faceswap_misaki.png'}
          currentIndexList={currentIndexList}
          handleRightButtonClick={handleRightButtonClick}
          handleLeftButtonClick={handleLeftButtonClick}
          handleSubmitButtonClick={handleSubmitButtonClick}
        />
      )}
      {currentScreen === ScreenProgress.ANSWER2correct && (
        <div
          className={styles.image}
          style={{ height: window.innerHeight, width: window.innerWidth }}
        >
          <img
            src={'images/faceswap_misaki_correct.png'}
            width={window.innerWidth}
            alt="answer_misaki_correct"
          />
        </div>
      )}
      {currentScreen === ScreenProgress.ANSWER2wrong && (
        <div
          className={styles.image}
          style={{ height: window.innerHeight, width: window.innerWidth }}
        >
          <img
            src={'images/faceswap_misaki_wrong.png'}
            width={window.innerWidth}
            alt="answer_misaki_wrong"
          />
        </div>
      )}
      {isModalOpen && <ScoreModal gamePoint={scoreCount * 50} />}
    </>
  )
}
