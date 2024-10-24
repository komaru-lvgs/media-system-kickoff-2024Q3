import React from 'react'

import styles from './index.module.scss'

type ButtonProperties = {
  innerText: string
  clickEvent: () => void
}

export const Button: React.FC<ButtonProperties> = ({
  innerText,
  clickEvent,
}) => {
  return (
    <button className={styles.button} onClick={clickEvent} >
      {innerText}
    </button>
  )
}
