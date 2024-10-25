import React from 'react'
import styles from './index.module.scss'

type InfoModalProperties = {
  iconPath: string
  message: string
}

export const InfoModal: React.FC<InfoModalProperties> = ({
  iconPath,
  message,
}) => {
  // 改行タグは改行させる
  let splitMessage = message.split('<br/>').map((line) => {
    return <p>{line}</p>
  })

  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.icon}>
            <img src={iconPath} className={styles.iconImage} alt="icon" />
          </div>
          {splitMessage}
        </div>
      </div>
    </>
  )
}
