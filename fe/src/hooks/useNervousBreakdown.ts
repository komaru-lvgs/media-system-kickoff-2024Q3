import { useCallback, useContext, useEffect, useState } from 'react'
import { answerAddressLists, timerSecond } from '../libs/nervousBreakdown'
import { Card } from '../types'
import { TimerContext } from './useTimer'

export const useNervousBreakdown = () => {
  const [selectedCard, setSelectedCard] = useState<Card | undefined>()
  const [tableCardList, setTableCardList] = useState<Card[]>([])
  const [isStop, setIsStop] = useState(false)
  const { timeNumber } = useContext(TimerContext)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [isFlipping, setIsFlipping] = useState<boolean>(false)
  const [isCorrectModalOpen, setIsCorrectModalOpen] = useState<boolean>(false)

  const handleClick = useCallback(
    (card: Card) => {
      if (isFlipping) return
      if (selectedCard) {
        if (selectedCard === card) return
        setSelectedCard(undefined)
        const pairAddress = answerAddressLists
          .find((answerAddressList) =>
            answerAddressList.find(
              (address) => address === selectedCard.address,
            ),
          )!
          .find((item) => item !== selectedCard.address)
        const cardListCopy = [...tableCardList]
        cardListCopy.push(selectedCard)
        cardListCopy.push(card)
        setTableCardList(cardListCopy)

        if (pairAddress === card.address) {
          if (tableCardList.length === 8) {
            setIsStop(true)
            return
          }
          const timeout = setTimeout(() => {
            setIsCorrectModalOpen(false)
          }, 800)
          setIsCorrectModalOpen(true)
          return () => clearInterval(timeout)
        }
        setIsFlipping(true)
        const timeout = setTimeout(() => {
          setSelectedCard(undefined)
          setTableCardList((previous) => {
            previous.splice(previous.indexOf(selectedCard), 1)
            previous.splice(previous.indexOf(card), 1)
            return [...previous]
          })
          setIsFlipping(false)
        }, 800)
        return () => clearInterval(timeout)
      } else {
        setSelectedCard(card)
      }
    },
    [selectedCard, tableCardList, isFlipping],
  )

  useEffect(() => {
    if (timeNumber === timerSecond) {
      const timeout = setTimeout(() => {
        setIsModalOpen(true)
      }, 1000)
      return () => clearInterval(timeout)
    }
  }, [timeNumber])

  return {
    data: {
      isStop,
      isModalOpen,
      isCorrectModalOpen,
      tableCardList,
      timeNumber,
      selectedCard,
    },
    handleClick,
  }
}
