import React from 'react'
import style from './index.module.scss'
import { useWhackMole } from '../../../hooks/useWhackMole'
import { Timer, Mogura, Life, ScoreModal } from '../../atoms'
import { Button } from '../../atoms'
import { ScreenProgress, timerSecond } from '../../../libs/mole'

export const WhackMole: React.FC = () => {
  const {
    currentScreen,
    handleButtonClick,
    appearanceMole,
    currentLife,
    hitMole,
    hit,
    isStop,
    isModalOpen,
    score,
  } = useWhackMole()

  return (
    <>
      {currentScreen === ScreenProgress.START && (
        <>
          <img
            src="images/mole_start_background1.png"
            alt=""
            className={style.backgroundImage}
            style={{ height: window.innerHeight, width: window.innerWidth }}
          />
          <div className={style.startButton}>
            <Button innerText={'START'} clickEvent={handleButtonClick} />
          </div>
        </>
      )}
      {currentScreen !== ScreenProgress.START && (
        <div className={style.game}>
          <img
            src="images/mole_background.png"
            alt=""
            draggable="false"
            className={style.backgroundImage}
          />
          <div className={style.header}>
            <Life maxLife={5} currentLife={currentLife} />
            <Timer second={timerSecond} isStop={isStop} />
          </div>
          <div className={style.mole}>
            {appearanceMole.map((mole) => (
              <Mogura mole={mole} hit={hit} handleClick={() => hitMole(mole)} />
            ))}
          </div>
        </div>
      )}
      {isModalOpen && (
        <ScoreModal gamePoint={score.current < 0 ? 0 : score.current} />
      )}
    </>
  )
}
