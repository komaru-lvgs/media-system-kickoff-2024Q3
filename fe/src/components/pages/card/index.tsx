import React, { useState } from 'react'
import { SingleCard } from '../../atoms'
import styles from './index.module.scss'
import '../../atoms/cardColor.scss'

export const Card: React.FC = () => {
  // ------------データ部分

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

  // グループ情報
  const groupInformation = {
    opponentID: 5,
    opponentName: '〜結構保守的〜',
    member: [
      { name: '小丸 友梨', face: './images/face/小丸友梨.png' },
      { name: '黒田 光咲', face: './images/face/黒田光咲.png' },
      { name: '林 幸多郎', face: './images/face/林幸多郎.png' },
      { name: '宇田 知生', face: './images/face/宇田知生.png' },
      { name: '馬場 純一', face: './images/face/小島洋明.png' },
    ],
  }

  // --------------------

  // カードの状態 (0は押されていない、1から5は押した順番)
  const [cardsState, setCardsState] = useState([0, 0, 0, 0, 0])

  // 確認モーダルを表示するかどうか？
  const [confirmationModalShow, setConfirmationModalShow] = useState(false)

  // グループモーダルを表示するかどうか？
  const [groupModalShow, setGroupModalShow] = useState(false)

  // 発火イベント
  const resetState = () => {
    setCardsState([0, 0, 0, 0, 0])
  }

  // 順番を選択
  const handleClick = (cardNumber: number) => {
    if (cardsState[cardNumber] !== 0 || confirmationModalShow || groupModalShow)
      return

    const maxValue = Math.max(...cardsState)

    // 番号をつける
    const updateCardsState = cardsState.map((item, index) =>
      cardNumber === index ? maxValue + 1 : item,
    )
    setCardsState(updateCardsState)
  }

  // 確認ボタンを押したら
  const handleConfirmationButton = () => {
    const maxValue = Math.max(...cardsState)
    if (maxValue < 5) return
    setConfirmationModalShow(true)
  }

  // グループボタンを押したら
  const handleGroupButton = () => {
    setGroupModalShow(true)
  }

  const handleGroupCloseButton = () => {
    console.log('okay')
    setGroupModalShow(false)
  }

  // モーダルのボタンを制御
  const modalButton = (okay: boolean) => {
    if (!okay) setConfirmationModalShow(false)

    // 投票完了画面への遷移の処理を書く
  }

  // 確認画面でカードを描画する
  const modalCardsShow = () => {
    // 押した順に表示する
    const confirmationCardsJSX = []
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        if (i + 1 === cardsState[j]) {
          confirmationCardsJSX.push(
            <div
              id={`confirmation-card-${i + 1}`}
              className={`${styles.confirmationCard} ${cardData[j]['color']}`}
            >
              {cardData[j]['message']}
            </div>,
          )
        }
      }
    }
    return confirmationCardsJSX
  }

  return (
    <>
      <div className={styles.container}>
        {/* メイン部分 */}
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
              src="/images/group.png"
              className={styles.groupMemberButton}
              onClick={handleGroupButton}
              alt="group"
            />
            <img
              src="/images/confirmation.png"
              className={styles.confirmation}
              onClick={handleConfirmationButton}
              alt="confirmation"
            />
            <img
              src="/images/trashButton.png"
              className={styles.resetImage}
              onClick={resetState}
              alt="trushButton"
            />
          </div>
        </div>

        {/* 確認モーダル部分 */}
        {confirmationModalShow ? (
          <div className={styles.modalContainer}>
            <div className={styles.modalBox}>
              <div className={styles.modalIcon}>
                <img
                  src="/images/exclamation.png"
                  className={styles.iconImage}
                  alt="icon"
                />
              </div>
              <div className={styles.modalMessage}>
                以下の内容で投票します
                <br />
                よろしいですか？
              </div>
              <div className={styles.modalBody}>
                <div className={styles.highOrDown}>
                  <div className={styles.hdText}>高</div>
                  <img
                    src="./images/colorBar.png"
                    className={styles.hdColorBar}
                    alt="colorbar"
                  />
                  <div className={styles.hdText}>低</div>
                </div>
                <div className={styles.modalCards}>{modalCardsShow()}</div>
              </div>
              <div className={styles.modalFooter}>
                <img
                  src="./images/NGButton.png"
                  className={styles.modalButton}
                  onClick={() => modalButton(false)}
                  alt="ng"
                />
                <img
                  src="./images/OKButton.png"
                  className={styles.modalButton}
                  onClick={() => modalButton(true)}
                  alt="ok"
                />
              </div>
            </div>
          </div>
        ) : null}

        {/* グループモーダル部分 */}
        {groupModalShow ? (
          <div className={styles.modalContainer}>
            <div className={styles.modalBox}>
              <div className={styles.groupHeader}>
                <div className={styles.groupHeadText}>
                  回答を予想するグループは...
                </div>
                <div className={styles.groupOpponent}>
                  {groupInformation['opponentID']}
                </div>
                <div className={styles.groupOpponentName}>
                  {groupInformation['opponentName']}
                </div>
              </div>
              <div className={styles.groupBody}>
                <div className={styles.groupBodyText}>【グループメンバー】</div>
                <div className={styles.groupMember}>
                  {groupInformation['member'].map((singleMember) => (
                    <div className={styles.singleMember}>
                      <img
                        src={singleMember['face']}
                        alt={singleMember['name']}
                        className={styles.memberImage}
                      />
                      <div className={styles.memberName}>
                        {singleMember['name']}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.groupFooter}>
                <img
                  src="./images/close.png"
                  className={styles.modalButton}
                  onClick={() => handleGroupCloseButton()}
                  alt="close"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  )
}
