import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ErrorPage } from '../errorPage'
import styles from './index.module.scss'

type CardDataObject = {
  color: string
  message: string
}[]

export const Result: React.FC = () => {
  // クエリパラメータを確認
  const search = useLocation().search
  const query = new URLSearchParams(search)
  const isOA = Number(query.get('oa'))
  const groupID = query.get('group')
  const questionID = query.get('question')
  if (
    isOA < 0 ||
    1 < isOA ||
    Number.isNaN(isOA) ||
    groupID === null ||
    questionID === null
  ) {
    window.location.href = '/error?status=500'
  }

  // お題
  const [question, setQuestion] = useState<string>()
  const [cardData, setCardData] = useState<CardDataObject>()

  // 回答と正解
  const [cardsState, setCardsState] = useState<number[]>()
  const [answer, setAnswer] = useState<number[]>()

  // 獲得ポイントと順位、全チーム
  const [points, setPoints] = useState<number>()
  const [ranking, setRanking] = useState<number>()
  const [totalGroup, setTotalGroup] = useState<number>()

  useEffect(() => {
    // お題
    setQuestion('エンジニアとして喜ぶ瞬間')
    setCardData([
      { color: 'red', message: 'プログラムが正常に動いた時' },
      { color: 'blue', message: '課題チェックが上手く進んだ時' },
      { color: 'green', message: 'バグの原因が分かった時' },
      { color: 'yellow', message: '基本情報技術者試験で合格した時' },
      { color: 'purple', message: '仕事を済ませて早く退勤できた時' },
    ])

    // TODO: データベースから予想と回答取得
    // 複数ある場合は、一番最初の時刻で送信した回答を取得する
    setCardsState([1, 4, 5, 2, 3])
    setAnswer([2, 4, 5, 3, 1])

    // TODO: データベースから獲得点数と順位を取得
    setPoints(30)
    setRanking(3)
    setTotalGroup(10)
  }, [])

  // 取得できなかったらエラー
  if (
    question === undefined ||
    cardData === undefined ||
    cardsState === undefined ||
    answer === undefined ||
    points === undefined ||
    ranking === undefined ||
    totalGroup === undefined ||
    questionID === null
  ) {
    return (
      <>
        <ErrorPage statusCode={500} />
      </>
    )
  }

  // カードと正誤を描画する
  const modalCardsShow = () => {
    // 押した順に表示する
    const confirmationCardsJSX = []
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 5; j++) {
        if (i + 1 === cardsState[j]) {
          if (cardsState[j] === answer[j]) {
            // 正解
            confirmationCardsJSX.push(
              <div className={styles.singleQuestionContainer}>
                <div
                  id={`confirmation-card-${i + 1}`}
                  className={`${styles.confirmationCard} ${cardData[j]['color']}`}
                >
                  {cardData[j]['message']}
                </div>
                <div className={styles.singleCheck}>
                  <img
                    src="./images/correct.png"
                    className={styles.correctImage}
                    alt="correct"
                  />
                </div>
              </div>,
            )
          } else {
            // ハズレ
            confirmationCardsJSX.push(
              <div className={styles.singleQuestionContainer}>
                <div
                  id={`confirmation-card-${i + 1}`}
                  className={`${styles.confirmationCard} ${cardData[j]['color']}`}
                >
                  {cardData[j]['message']}
                </div>
                <div className={styles.singleCheck}>
                  <img
                    src="./images/miss.png"
                    className={styles.missImage}
                    alt="miss"
                  />
                </div>
              </div>,
            )
          }
        }
      }
    }
    return confirmationCardsJSX
  }

  // モーダルのボタンを制御
  const nextButton = () => {
    // TODO: 最終問題ならば最終結果に遷移させる

    // 次の問題画面に遷移
    // TODO: 次の問題IDはどうするか？
    window.location.href = `/card?oa=${+!isOA}&group=${groupID}&question=${
      Number(questionID) + 1
    }`
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
        <div className={styles.modalContainer}>
          <div className={styles.answerMessage}>正解は....</div>
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
          <div className={styles.answerMessage}>獲得ポイントは....</div>
          <div className={styles.points}>
            <div className={styles.currentPoints}>{points}</div>p
          </div>
          <div className={styles.answerMessage}>現在の順位は....</div>
          <div className={styles.ranking}>
            <div className={styles.currentRanking}>{ranking}</div>
            位/{totalGroup}
          </div>
          <div className={styles.modalFooter}>
            <img
              src="./images/OKButton.png"
              className={styles.modalButton}
              onClick={() => nextButton()}
              alt="next"
            />
          </div>
        </div>
      </div>
    </>
  )
}
