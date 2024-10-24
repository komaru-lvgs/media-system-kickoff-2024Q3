import { useCallback, useContext, useEffect, useState } from 'react'
import { TimerContext } from './useTimer'
import {
  goldScore,
  missScore,
  missStartY,
  niceEndY,
  niceStartY,
  normalScore,
  timerSecond,
} from '../libs/rhythm'

export const useRhythm = (input: {
  imageRefs: React.RefObject<HTMLImageElement>[]
}) => {
  const { timeNumber } = useContext(TimerContext)
  const [isFallingImageVisible, setIsFallingImageVisible] = useState([
    true,
    true,
    true,
    true,
  ])
  const [isNice1Visible, setIsNice1Visible] = useState(false)
  const [isMiss1Visible, setIsMiss1Visible] = useState(false)
  const [isNice2Visible, setIsNice2Visible] = useState(false)
  const [isMiss2Visible, setIsMiss2Visible] = useState(false)
  const [isNice3Visible, setIsNice3Visible] = useState(false)
  const [isMiss3Visible, setIsMiss3Visible] = useState(false)
  const [isNice4Visible, setIsNice4Visible] = useState(false)
  const [isMiss4Visible, setIsMiss4Visible] = useState(false)
  const [scoreCount, setScoreCount] = useState(0)
  const [isGold, setIsGold] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const initialize = useCallback(() => {
    setIsFallingImageVisible([true, true, true, true])
    setIsNice1Visible(false)
    setIsMiss1Visible(false)
    setIsNice2Visible(false)
    setIsMiss2Visible(false)
    setIsNice3Visible(false)
    setIsMiss3Visible(false)
    setIsNice4Visible(false)
    setIsMiss4Visible(false)
  }, [])

  useEffect(() => {
    if (timeNumber === timerSecond) {
      setIsFallingImageVisible(Array(4).fill(false))
      setIsModalOpen(true)
    }
  }, [timeNumber])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (timeNumber === timerSecond) {
        setIsFallingImageVisible(Array(4).fill(false))
        return
      }
      switch (event.key) {
        case 'a':
          const imageY1 = input.imageRefs[0].current?.y
          if (imageY1 && imageY1 >= niceStartY && imageY1 < niceEndY) {
            const newList1 = [...isFallingImageVisible]
            newList1[0] = false
            setIsFallingImageVisible(newList1)
            setIsNice1Visible(true)
            setScoreCount((prevCount) => prevCount + normalScore)
            setTimeout(() => {
              initialize()
            }, 400)
          } else if (imageY1 && imageY1 < missStartY) {
            break
          } else {
            const newList1 = [...isFallingImageVisible]
            newList1[0] = false
            setIsFallingImageVisible(newList1)
            setIsMiss1Visible(true)
            setScoreCount((prevCount) => prevCount + missScore)
            setTimeout(() => {
              initialize()
            }, 400)
          }

          break
        case 'd':
          const imageY2 = input.imageRefs[1].current?.y
          if (imageY2 && imageY2 >= niceStartY && imageY2 < niceEndY) {
            const newList1 = [...isFallingImageVisible]
            newList1[1] = false
            setIsFallingImageVisible(newList1)
            setIsNice2Visible(true)
            setScoreCount((prevCount) =>
              isGold ? prevCount + goldScore : prevCount + normalScore,
            )
            if (isGold) {
              setIsGold(false)
            }
            setTimeout(() => {
              initialize()
            }, 400)
          } else if (imageY2 && imageY2 < missStartY) {
            break
          } else {
            const newList1 = [...isFallingImageVisible]
            newList1[1] = false
            setIsFallingImageVisible(newList1)
            setIsMiss2Visible(true)
            setScoreCount((prevCount) => prevCount + missScore)
            if (isGold) {
              setIsGold(false)
            }
            setTimeout(() => {
              initialize()
            }, 400)
          }
          break
        case 'j':
          const imageY3 = input.imageRefs[2].current?.y
          if (imageY3 && imageY3 >= niceStartY && imageY3 < niceEndY) {
            const newList1 = [...isFallingImageVisible]
            newList1[2] = false
            setIsFallingImageVisible(newList1)
            setIsNice3Visible(true)
            setScoreCount((prevCount) => prevCount + normalScore)
            setTimeout(() => {
              initialize()
            }, 400)
          } else if (imageY3 && imageY3 < missStartY) {
            break
          } else {
            const newList1 = [...isFallingImageVisible]
            newList1[2] = false
            setIsFallingImageVisible(newList1)
            setIsMiss3Visible(true)
            setScoreCount((prevCount) => prevCount + missScore)
            setTimeout(() => {
              initialize()
            }, 400)
          }
          break
        case 'l':
          const imageY4 = input.imageRefs[3].current?.y
          if (imageY4 && imageY4 >= niceStartY && imageY4 < niceEndY) {
            const newList1 = [...isFallingImageVisible]
            newList1[3] = false
            setIsFallingImageVisible(newList1)
            setIsNice4Visible(true)
            setScoreCount((prevCount) => prevCount + normalScore)
            setTimeout(() => {
              initialize()
            }, 400)
          } else if (imageY4 && imageY4 < missStartY) {
            break
          } else {
            const newList1 = [...isFallingImageVisible]
            newList1[3] = false
            setIsFallingImageVisible(newList1)
            setIsMiss4Visible(true)
            setScoreCount((prevCount) => prevCount + missScore)
            setTimeout(() => {
              initialize()
            }, 400)
          }
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFallingImageVisible, isGold, timeNumber])

  return {
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
  }
}
