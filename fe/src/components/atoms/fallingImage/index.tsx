import React, { useContext, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { getClassNames } from '../../../libs/style'
import { TimerContext } from '../../../hooks/useTimer'
import { timerSecond } from '../../../libs/rhythm'

type FallingImageProps = {
  src: string
  imageRef: React.RefObject<HTMLImageElement>
  index: number
  interval: number
  initialize: () => void
  setIsFallingImageVisible: React.Dispatch<React.SetStateAction<boolean[]>>
  setIsGold: React.Dispatch<React.SetStateAction<boolean>>
  isGold: boolean
}

export const FallingImage: React.FC<FallingImageProps> = ({
  src,
  imageRef,
  index,
  interval,
  initialize,
  setIsFallingImageVisible,
  setIsGold,
  isGold,
}) => {
  const { timeNumber } = useContext(TimerContext)
  const [animationState, setAnimationState] = useState<Animation>()

  useEffect(() => {
    const initializeAnimation = setTimeout(() => {
      let image = imageRef.current
      if (!image) return
      const animation = image.animate(
        [{ top: 'calc(-10vh)' }, { top: 'calc(100vh)' }],
        {
          duration: 2000,
          easing: 'linear',
          iterations: 1,
          fill: 'forwards',
        },
      )
      setAnimationState(animation)
      return () => {
        animation.cancel()
      }
    }, interval)
    return () => clearTimeout(initializeAnimation)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!animationState || !imageRef.current) return
    animationState.onfinish = () => {
      if (!imageRef.current) return
      imageRef.current.style.display = 'none'
      if (timeNumber < timerSecond) {
        setIsFallingImageVisible((previous) => {
          previous[index] = false
          return [...previous]
        })
        if (timeNumber % 5 === 0 && index === 1) {
          setIsGold(true)
        }
        setTimeout(() => {
          initialize()
        }, 1)
      } else {
        setIsFallingImageVisible(Array(4).fill(false))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeNumber])

  return (
    <img
      ref={imageRef}
      src={index === 1 && isGold ? 'images/rhythm_minna.png' : src}
      className={getClassNames(styles, ['fallingImage', `index${index}`])}
      alt="falling"
    />
  )
}
