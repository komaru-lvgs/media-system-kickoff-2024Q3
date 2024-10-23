import React from 'react'
import styles from './index.module.scss'

type SingleCardProperties = {
  color: 'red' | 'blue' | 'green' | 'yellow' | 'purple'
  message: string
}

export const SingleCard: React.FC<SingleCardProperties> = ({
  color,
  message,
}) => {
  let bgRGB = '#eeeeee'
  if (color === 'red') bgRGB = '#e2767c'
  if (color === 'blue') bgRGB = '#5bb3e7'
  if (color === 'green') bgRGB = '#a4cb4c'
  if (color === 'yellow') bgRGB = '#fdd15b'
  if (color === 'purple') bgRGB = '#b885cd'
  return (
    <>
      <div className={styles.container} style={{ backgroundColor: bgRGB }}>
        <div className={styles.cardMessage}>
          {message}
        </div>
      </div>
    </>
  )
}
