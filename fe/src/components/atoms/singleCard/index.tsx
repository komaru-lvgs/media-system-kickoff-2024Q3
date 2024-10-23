import React, { useState } from 'react'
import styles from './index.module.css'

type SingleCardProperties = {
  color: string //'red' | 'blue' | 'green' | 'yellow' | 'purple'
  message: string
  cardIndex: number
  cardState: number
  handleClick: (cardNumber: number) => void
}

export const SingleCard: React.FC<SingleCardProperties> = ({
  color,
  message,
  cardIndex,
  cardState,
  handleClick,
}) => {
  // 色を変換
  let bgRGB = '#eeeeee'
  if (color === 'red') bgRGB = '#e2767c'
  if (color === 'blue') bgRGB = '#5bb3e7'
  if (color === 'green') bgRGB = '#a4cb4c'
  if (color === 'yellow') bgRGB = '#fdd15b'
  if (color === 'purple') bgRGB = '#b885cd'

  return (
    <>
      <div className={styles.container}>
        {cardState > 0 ? (
          <div
            style={{
              position: 'absolute',
              zIndex: 10000,
              top: '8%',
              right: '5%',
            }}
          >
            <img
              src={`images/icon/${cardState}.png`}
              style={{ width: '50px' }}
            />
          </div>
        ) : null}
        <div
          className={styles.box}
          style={{ backgroundColor: bgRGB, opacity: cardState > 0 ? 0.5 : 1 }}
          onClick={() => handleClick(cardIndex)}
        >
          <div className={styles.cardMessage}>{message}</div>
        </div>
      </div>
    </>
  )
}
