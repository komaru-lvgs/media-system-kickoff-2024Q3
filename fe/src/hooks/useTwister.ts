import { useState, useEffect, useCallback, useContext, useMemo } from 'react'
import { keyList, timerSecond, twisterProgress } from '../libs/twister'
import { TwisterKeyItem } from '../types'
import { TimerContext } from './useTimer'

export const useTwister = () => {
  //TODO 不要なステートを削除するリファクタ
  const [currentKeys, setCurrentKeys] = useState<string[]>([])
  const [nextKeyIndex, setNextKeyIndex] = useState<number>(0)
  const [isPushTurn, setIsPushTurn] = useState(true)
  const [currentScreen, setCurrentScreen] = useState<twisterProgress>(
    twisterProgress.START,
  )
  const { timeNumber } = useContext(TimerContext)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isStop, setIsStop] = useState(false)
  const [scoreCount, setScoreCount] = useState(0)
  const [nextKey, setNextKey] = useState<TwisterKeyItem | undefined>(keyList[0])
  const [needReleaseKey, setNeedReleaseKey] = useState<
    TwisterKeyItem | undefined
  >(undefined)
  const [needPressKeys, setNeedPressKeys] = useState<TwisterKeyItem[]>([])
  const handleButtonClick = () => {
    setCurrentScreen(twisterProgress.GAME)
  }

  const judge = useMemo(() => {
    if (currentKeys.length === 0) return false
    for (const key of needPressKeys) {
      if (!currentKeys.includes(key.key)) return false
    }
    if (nextKey !== undefined && !currentKeys.includes(nextKey.key))
      return false
    if (
      needReleaseKey !== undefined &&
      currentKeys.includes(needReleaseKey.key)
    )
      return false
    return true
  }, [currentKeys, needPressKeys, needReleaseKey, nextKey])

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault()
      const pressedKey = event.key.toUpperCase()
      if (!currentKeys.includes(pressedKey)) {
        setCurrentKeys([...currentKeys, pressedKey])
      }
    },
    [currentKeys],
  )

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    event.preventDefault()
    const releasedKey = event.key.toUpperCase()
    setCurrentKeys((prev) => {
      return prev.filter((key) => key !== releasedKey)
    })
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [handleKeyDown, handleKeyUp])

  useEffect(() => {
    if (judge) {
      if (nextKeyIndex >= 5) {
        if (isPushTurn) {
          setNextKey(undefined)
          setNeedReleaseKey(keyList[nextKeyIndex - 5])
          setNeedPressKeys(keyList.slice(nextKeyIndex - 4, nextKeyIndex + 1))
        } else {
          setNextKeyIndex((prevIndex) => {
            setNextKey(keyList[prevIndex + 1])
            return prevIndex + 1
          })
          setNeedReleaseKey(undefined)
        }
        setIsPushTurn(!isPushTurn)
      } else {
        setNextKeyIndex((prevIndex) => {
          const nki = prevIndex + 1
          setNeedPressKeys(keyList.slice(0, nki))
          setNextKey(keyList[nki])
          return nki
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentKeys, nextKeyIndex])

  useEffect(() => {
    if (needReleaseKey?.key === 'Z') {
      setIsStop(true)
      setScoreCount((60 - timeNumber) * 10)
      const timeout = setTimeout(() => {
        setIsModalOpen(true)
      }, 1000)
      return () => clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needReleaseKey])

  useEffect(() => {
    if (timeNumber === timerSecond) {
      setScoreCount(0)
      const timeout = setTimeout(() => {
        setIsModalOpen(true)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [timeNumber])

  return {
    nextKey,
    needPressKeys,
    needReleaseKey,
    isPushTurn,
    currentScreen,
    handleButtonClick,
    isStop,
    isModalOpen,
    scoreCount,
  }
}
