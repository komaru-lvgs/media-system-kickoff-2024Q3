import { useRef, useState } from 'react'
import styles from './index.module.scss'
import { Button, FallingImage, ScoreModal, Timer } from '../../atoms'
import { ScreenProgress } from '../../../libs/mistakes'
import { useRhythm } from '../../../hooks/useRhythm'
import { timerSecond } from '../../../libs/rhythm'

export const Rhythm = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenProgress>(
    ScreenProgress.START,
  )
  const imageRefs = [
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
    useRef<HTMLImageElement>(null),
  ]
  const {
    isFallingImageVisible,
    isNice1Visible,
    isMiss1Visible,
    isNice2Visible,
    isMiss2Visible,
    isNice3Visible,
    isMiss3Visible,
    isNice4Visible,
    isMiss4Visible,
    initialize,
    setIsFallingImageVisible,
    isGold,
    setIsGold,
    scoreCount,
    isModalOpen,
  } = useRhythm({ imageRefs })

  return (
    <>
      {currentScreen === ScreenProgress.START && (
        <>
          <img
            src={'images/rhythm-start.png'}
            className={styles.back}
            alt="rhythm"
          />
          <div className={styles.container}>
            <Button
              innerText={'START'}
              clickEvent={() => {
                setCurrentScreen(ScreenProgress.GAME)
              }}
            />
          </div>
        </>
      )}
      {currentScreen === ScreenProgress.GAME && (
        <div className={styles.gameContainer}>
          <img
            src={'images/rhythm-haikei.png'}
            className={styles.back}
            alt="rhythm"
            height={'770px'}
          />
          <div className={styles.container1}></div>
          <div className={styles.container2}></div>
          <div className={styles.container3}></div>
          <div className={styles.container4}></div>
          {isFallingImageVisible.map(
            (isVisible, index) =>
              isVisible && (
                <FallingImage
                  key={index}
                  src={`images/rhythm_${
                    index === 0
                      ? 'kujira'
                      : index === 1
                      ? 'kurage'
                      : index === 2
                      ? 'kani'
                      : 'kakurekumanomi'
                  }.png`}
                  imageRef={imageRefs[index]}
                  index={index}
                  interval={(index + 1) * 1000}
                  initialize={initialize}
                  setIsFallingImageVisible={setIsFallingImageVisible}
                  setIsGold={setIsGold}
                  isGold={isGold}
                />
              ),
          )}
          {isNice1Visible && (
            <img
              src={'images/rhythm_nice.png'}
              alt="nice"
              className={styles.nice1}
            />
          )}
          {isMiss1Visible && (
            <img
              src={'images/rhythm_miss.png'}
              alt="miss"
              className={styles.miss1}
            />
          )}
          {isNice2Visible && (
            <img
              src={'images/rhythm_nice.png'}
              alt="nice"
              className={styles.nice2}
            />
          )}
          {isMiss2Visible && (
            <img
              src={'images/rhythm_miss.png'}
              alt="miss"
              className={styles.miss2}
            />
          )}
          {isNice3Visible && (
            <img
              src={'images/rhythm_nice.png'}
              alt="nice"
              className={styles.nice3}
            />
          )}
          {isMiss3Visible && (
            <img
              src={'images/rhythm_miss.png'}
              alt="miss"
              className={styles.miss3}
            />
          )}
          {isNice4Visible && (
            <img
              src={'images/rhythm_nice.png'}
              alt="nice"
              className={styles.nice4}
            />
          )}
          {isMiss4Visible && (
            <img
              src={'images/rhythm_miss.png'}
              alt="miss"
              className={styles.miss4}
            />
          )}
          <div className={styles.timer}>
            <Timer second={timerSecond} />
          </div>
          {isModalOpen && (
            <ScoreModal gamePoint={scoreCount < 0 ? 0 : scoreCount} />
          )}
        </div>
      )}
    </>
  )
}
