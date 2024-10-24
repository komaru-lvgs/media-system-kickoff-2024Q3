import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import { Button, ScoreModal } from '../../atoms'
import {
  FlashProgress,
  allAnswer,
  countdownImagePathList,
  gameImagePathList,
  questionItemList,
} from '../../../libs/flash'
import { FlashQuestion } from '../../organisms'

//TODO: リファクタ
export const Flash: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<FlashProgress>(
    FlashProgress.START,
  )
  const [count, setCount] = useState<number>(0)
  const [gameCount, setGameCount] = useState<number>(0)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [scoreCount, setScoreCount] = useState(0)

  useEffect(() => {
    if (currentScreen !== FlashProgress.COUNTDOWN) return
    const timer = setInterval(() => {
      setCount((count) => count + 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [count, currentScreen])

  useEffect(() => {
    if (currentScreen !== FlashProgress.COUNTDOWN) return
    if (count >= countdownImagePathList.length)
      setCurrentScreen(FlashProgress.FLASH)
  }, [count, currentScreen])

  useEffect(() => {
    if (currentScreen !== FlashProgress.FLASH) return
    const timer = setInterval(() => {
      setCount(0)
      setGameCount((previousCount) => previousCount + 1)
    }, 400)
    return () => clearInterval(timer)
  }, [gameCount, currentScreen])

  useEffect(() => {
    if (currentScreen !== FlashProgress.FLASH) return
    if (gameCount >= gameImagePathList.length)
      setCurrentScreen(FlashProgress.QUESTION)
  }, [gameCount, currentScreen])

  useEffect(() => {
    if (currentQuestionIndex === questionItemList.length) return
    if (
      currentScreen === FlashProgress.CORRECT ||
      currentScreen === FlashProgress.INCORRECT
    ) {
      const timeout = setTimeout(() => {
        setGameCount(0)
        setCurrentScreen(FlashProgress.COUNTDOWN)
      }, 2500)
      return () => clearTimeout(timeout)
    }
  }, [currentScreen, currentQuestionIndex])

  const handleOptionChange = (id: string, answer: string) => {
    setCurrentQuestionIndex((previous) => previous + 1)
    if (id === answer) {
      setCurrentScreen(FlashProgress.CORRECT)
      setScoreCount(scoreCount + 1)
    } else {
      setCurrentScreen(FlashProgress.INCORRECT)
    }
    if (currentQuestionIndex === questionItemList.length - 1) {
      const timeout = setTimeout(() => {
        setIsModalOpen(true)
      }, 2500)
      return () => clearTimeout(timeout)
    }
  }

  return (
    <>
      {currentScreen === FlashProgress.START && (
        <div className={styles.startback}>
          <img
            src="images/flash_main_start.png"
            className={styles.start}
            alt=""
          />
          <div className={styles.button}>
            <Button
              innerText="START"
              clickEvent={() => {
                setCurrentScreen(FlashProgress.COUNTDOWN)
              }}
            />
          </div>
        </div>
      )}
      {currentScreen === FlashProgress.COUNTDOWN && (
        <img
          src={countdownImagePathList[count]}
          className={styles.countdown}
          alt=""
        />
      )}
      {currentScreen === FlashProgress.FLASH && (
        <img
          src={gameImagePathList[gameCount]}
          className={styles.gamephoto}
          alt=""
        />
      )}
      {currentScreen === FlashProgress.QUESTION && (
        <FlashQuestion
          questionItem={questionItemList[currentQuestionIndex]}
          handleOptionChange={handleOptionChange}
        />
      )}
      {currentScreen === FlashProgress.CORRECT && (
        <img
          src={allAnswer[currentQuestionIndex - 1]}
          className={styles.seikai}
          alt=""
        />
      )}
      {currentScreen === FlashProgress.INCORRECT && (
        <img
          src={`${
            questionItemList[currentQuestionIndex - 1].incorrectImagePath
          }`}
          className={styles.fuseikai}
          alt=""
        />
      )}
      {isModalOpen && <ScoreModal gamePoint={50 * scoreCount} />}
    </>
  )
}
