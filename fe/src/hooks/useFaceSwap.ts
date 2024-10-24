import { useCallback, useContext, useEffect, useState } from 'react'
import {
  ScreenProgress,
  answerIndex,
  game2InitialIndexList,
} from '../libs/faceSwap'
import { TimerContext } from './useTimer'

export const useFaceSwap = () => {
  const [currentIndexList, setCurrentIndexList] = useState([1, 0, 4, 2])
  const [currentScreen, setCurrentScreen] = useState<ScreenProgress>(
    ScreenProgress.START,
  )
  const { timeNumber, setTimeNumber } = useContext(TimerContext)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [scoreCount, setScoreCount] = useState(0)

  const handleStartButtonClick = useCallback(() => {
    setCurrentScreen(ScreenProgress.GAME1)
  }, [])

  const handleSubmitButtonClick = useCallback(() => {
    if (currentScreen === ScreenProgress.GAME1) {
      if (currentIndexList.every((item) => item === answerIndex.game1)) {
        setCurrentScreen(ScreenProgress.ANSWER1correct)
        setScoreCount((previous) => previous + 1)
        setCurrentIndexList(game2InitialIndexList)
      } else {
        setCurrentScreen(ScreenProgress.ANSWER1wrong)
        setCurrentIndexList(game2InitialIndexList)
      }
    }

    if (currentScreen === ScreenProgress.GAME2) {
      if (currentIndexList.every((item) => item === answerIndex.game2)) {
        setCurrentScreen(ScreenProgress.ANSWER2correct)
        setScoreCount((previous) => previous + 1)
      } else {
        setCurrentScreen(ScreenProgress.ANSWER2wrong)
      }
    }
  }, [currentIndexList, currentScreen])

  const handleRightButtonClick = useCallback(
    (index: number) => {
      const newIndex = (currentIndexList[index] + 1) % 5
      if (newIndex >= 0) {
        setCurrentIndexList((previous) => {
          previous[index] = newIndex
          return [...previous]
        })
      } else {
        setCurrentIndexList((previous) => {
          previous[index] = newIndex + 5
          return [...previous]
        })
      }
    },
    [currentIndexList],
  )

  const handleLeftButtonClick = useCallback(
    (index: number) => {
      const newIndex = (currentIndexList[index] - 1) % 5

      if (newIndex >= 0) {
        setCurrentIndexList((previous) => {
          previous[index] = newIndex
          return [...previous]
        })
      } else {
        setCurrentIndexList((previous) => {
          previous[index] = newIndex + 5
          return [...previous]
        })
      }
    },
    [currentIndexList],
  )

  useEffect(() => {
    if (
      currentScreen !== ScreenProgress.ANSWER1correct &&
      currentScreen !== ScreenProgress.ANSWER1wrong
    )
      return
    const timeout = setTimeout(() => {
      setCurrentScreen(ScreenProgress.GAME2)
    }, 4500)
    return () => clearInterval(timeout)
  }, [currentScreen])

  useEffect(() => {
    if (timeNumber >= 20 && currentScreen === ScreenProgress.GAME1) {
      setCurrentScreen(ScreenProgress.ANSWER1wrong)
      setTimeNumber(0)
      setCurrentIndexList(game2InitialIndexList)
    }
  }, [currentScreen, setTimeNumber, timeNumber])

  useEffect(() => {
    if (
      timeNumber >= 20 &&
      currentScreen === ScreenProgress.GAME1 &&
      currentIndexList.every((item) => item === answerIndex.game1)
    ) {
      setCurrentScreen(ScreenProgress.ANSWER1correct)
      setScoreCount((previous) => previous + 1)
    }
  }, [currentScreen, currentIndexList, timeNumber])

  useEffect(() => {
    if (currentScreen === ScreenProgress.GAME2 && timeNumber >= 20) {
      if (currentIndexList.every((item) => item === answerIndex.game2)) {
        setCurrentScreen(ScreenProgress.ANSWER2correct)
        setScoreCount((previous) => previous + 1)
      } else {
        setCurrentScreen(ScreenProgress.ANSWER2wrong)
      }
    }
  }, [currentScreen, currentIndexList, timeNumber])

  useEffect(() => {
    if (
      currentScreen === ScreenProgress.ANSWER2correct ||
      currentScreen === ScreenProgress.ANSWER2wrong
    ) {
      const timeout = setTimeout(() => {
        setIsModalOpen(true)
      }, 1500)
      return () => clearTimeout(timeout)
    }
  })

  return {
    data: {
      currentScreen,
      isModalOpen,
      currentIndexList,
      scoreCount,
    },
    handleRightButtonClick,
    handleLeftButtonClick,
    handleStartButtonClick,
    handleSubmitButtonClick,
  }
}
