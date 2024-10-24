import { useState, useEffect, useContext } from 'react'

import { MemberFromItem } from '../types'
import { QuestionProgress, members, timerSecond } from '../libs/wherefrom'
import { TimerContext } from './useTimer'

export const useWhereFrom = () => {
  const [life, setLife] = useState<number>(3)
  const [currentScreen, setCurrentScreen] = useState<QuestionProgress>(
    QuestionProgress.START,
  )
  const [selectedMember, setSelectedMember] = useState<MemberFromItem>(
    members[0],
  )
  const [isStop, setIsStop] = useState(false)
  const { timeNumber } = useContext(TimerContext)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isFailureOpen, setIsFailureOpen] = useState<boolean>(false)
  const [scoreCount, setScoreCount] = useState(0)
  useEffect(() => {
    if (timeNumber >= timerSecond) {
      setCurrentScreen(QuestionProgress.FAILURE)
      setScoreCount(0)
      const timeout = setTimeout(() => {
        setIsModalOpen(true)
      }, 3000)
      return () => clearTimeout(timeout)
    }
    if (timeNumber >= 40) {
      setCurrentScreen(QuestionProgress.HINT2)
      return
    }
    if (timeNumber >= 20) {
      setCurrentScreen(QuestionProgress.HINT1)
      return
    }
  }, [timeNumber])

  const handleButtonClick = () => {
    const rand = Math.floor(Math.random() * 5) + 1
    const a = members.find((member) => member.id === rand) ?? members[1]
    setSelectedMember(a)
    setCurrentScreen(QuestionProgress.GAME)
  }

  const handlePrefectureClick = (prefectureName: string) => {
    if (prefectureName === selectedMember.from) {
      setIsStop(true)
      setCurrentScreen(QuestionProgress.CLEAR)
      setScoreCount(life)
      const timeout = setTimeout(() => {
        setIsModalOpen(true)
      }, 3000)
      return () => clearTimeout(timeout)
    } else {
      setLife((previous) => previous - 1)
      setIsFailureOpen(true)
      const timeout = setTimeout(() => {
        setIsFailureOpen(false)
      }, 1000)

      if (life <= 1) {
        setIsStop(true)
        const failureTimeout = setTimeout(() => {
          setCurrentScreen(QuestionProgress.FAILURE)
        }, 1500)
        setScoreCount(0)

        const timeout = setTimeout(() => {
          setIsModalOpen(true)
        }, 4000)
        return () => {
          clearTimeout(failureTimeout)
          clearTimeout(timeout)
        }
      }
      return () => clearTimeout(timeout)
    }
  }

  return {
    currentScreen,
    selectedMember,
    life,
    handleButtonClick,
    isStop,
    handlePrefectureClick,
    isModalOpen,
    scoreCount,
    isFailureOpen,
    timeNumber,
  }
}
