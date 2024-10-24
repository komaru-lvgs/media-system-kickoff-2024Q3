import { useState, useRef, useEffect, useContext } from 'react'
import { Mole } from '../types'
import {
  MolePopList,
  ScreenProgress,
  missScore,
  timerSecond,
} from '../libs/mole'
import { TimerContext } from './useTimer'

export const useWhackMole = () => {
  const { timeNumber } = useContext(TimerContext)
  const [currentScreen, setCurrentScreen] = useState<ScreenProgress>(
    ScreenProgress.START,
  )
  const [appearanceMole, setAppearanceMole] = useState<Mole[]>([])
  const [currentLife, setCurrentLife] = useState<number>(5)
  const [isStop, setIsStop] = useState<boolean>(false)
  const [hit, setHit] = useState<Mole[]>([])
  const nextMole = useRef<Mole[] | null>([])
  const score = useRef<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleButtonClick = () => {
    if (currentScreen === ScreenProgress.START) {
      setCurrentScreen(ScreenProgress.GAME)
    }
  }

  const hitMole = (mole: Mole) => {
    if (hit.includes(mole)) return
    setHit([...hit, mole])

    score.current = mole.score + score.current
    if (mole.score === missScore) {
      if (currentLife === 1) {
        setIsStop(true)
        const timeout = setTimeout(() => {
          setIsModalOpen(true)
        }, 2000)
        return () => clearInterval(timeout)
      }
      setCurrentLife((previous) => previous - 1)
    }
  }

  useEffect(() => {
    if (timeNumber === timerSecond) {
      setIsStop(true)
      const timeout = setTimeout(() => {
        setIsModalOpen(true)
      }, 2000)
      return () => clearInterval(timeout)
    }
    nextMole.current = MolePopList.filter(
      (mole) => mole.time === timeNumber + 1,
    )
    setAppearanceMole(nextMole.current)
  }, [timeNumber])

  return {
    currentScreen,
    handleButtonClick,
    appearanceMole,
    currentLife,
    hit,
    hitMole,
    isStop,
    isModalOpen,
    score,
  }
}
