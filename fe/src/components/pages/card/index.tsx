import React, { useState } from 'react'
import { SingleCard } from '../../atoms'
import styles from './index.module.scss'

export const Card: React.FC = () => {
  // お題
  const question = 'エンジニアとして喜ぶ瞬間'

  // カード内容
  const cardData = [
    { color: 'red', message: 'プログラムが正常に動いた時' },
    { color: 'blue', message: '課題チェックが上手く進んだ時' },
    { color: 'green', message: 'バグの原因が分かった時' },
    { color: 'yellow', message: '基本情報技術者試験で合格した時' },
    { color: 'purple', message: '仕事を済ませて早く退勤できた時' },
  ]

  // カードの状態 (0は押されていない、1から5は押した順番)
  const [cardsState, setCardsState] = useState([0, 0, 0, 0, 0])

  // 発火イベント
  const resetState = () => {
    setCardsState([0, 0, 0, 0, 0])
  }

  const handleClick = (cardNumber: number) => {
    console.log(cardsState)

    if (cardsState[cardNumber] !== 0) return

    const maxValue = Math.max(...cardsState)

    // 番号をつける
    const updateCardsState = cardsState.map((item, index) =>
      cardNumber === index ? maxValue + 1 : item,
    )
    setCardsState(updateCardsState)
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.question}>
          <div className={styles.questionBox}>
            <div className={styles.questionTitle}>お題</div>
            <div className={styles.questionMessage}>{question}</div>
          </div>
        </div>
        <div className={styles.rowItems}>
          <div className={styles.cards}>
            {cardData.map((singleCard, index) => (
              <SingleCard
                color={singleCard.color}
                message={singleCard.message}
                cardIndex={index}
                cardState={cardsState[index]}
                handleClick={handleClick}
              />
            ))}
          </div>
          <div className={styles.buttonColumn}>
            <img
              src="/images/team.png"
              className={styles.teamMember}
              onClick={undefined}
            />
            <img
              src="/images/confirmation.png"
              className={styles.confirmation}
              onClick={undefined}
            />
            <img
              src="/images/trashButton.png"
              className={styles.resetImage}
              onClick={resetState}
            />
          </div>
        </div>
        <div className={styles.modalContainer}>
          <div className={styles.modalBox}>
            <div className={styles.modalIcon}>
              <img src="" className={styles.iconImage} alt="icon" />
            </div>
            ああああ
          </div>
        </div>
      </div>
    </>
  )
}
