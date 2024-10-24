import React from 'react'
import styles from './index.module.scss'
import '../cardColor.scss'

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
  return (
    <>
      <div className={styles.container}>
        {cardState > 0 ? (
          <div
            style={{
              position: 'absolute',
              zIndex: 10,
              top: '8%',
              right: '5%',
            }}
          >
            <img
              src={`images/icon/${cardState}.png`}
              style={{ width: '50px' }}
              alt={`card${cardIndex}`}
            />
          </div>
        ) : null}
        <div
          className={`${styles.box} ${color}`}
          style={{ opacity: cardState > 0 ? 0.5 : 1 }}
          onClick={() => handleClick(cardIndex)}
        >
          <div className={styles.cardMessage}>{message}</div>
        </div>
      </div>
    </>
  )
}
