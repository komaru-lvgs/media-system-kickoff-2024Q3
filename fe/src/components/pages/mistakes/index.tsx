import styles from './index.module.scss'
import { useScroll } from '../../../hooks/useScroll'
import { useState } from 'react'
import { getClassNames } from '../../../libs/style'
import { ScreenProgress, range } from '../../../libs/mistakes'
import { Button, ScoreModal } from '../../atoms'

export const Mistakes: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenProgress>(
    ScreenProgress.START,
  )
  const [isAnswerList, setIsAnswerList] = useState(Array(20).fill(false))
  const { isBottom } = useScroll({
    isLoading: currentScreen !== ScreenProgress.GAME,
    scrollStep: 1,
    scrollDelay: 10,
  })
  const [scoreCount, setScoreCount] = useState(0)

  const handleClick = (event: any) => {
    for (let i = 0; i < range.length; i++) {
      if (
        event.pageX >= range[i].rangeStartX &&
        event.pageX <= range[i].rangeEndX &&
        event.pageY >= range[i].rangeStartY &&
        event.pageY <= range[i].rangeEndY
      ) {
        if (i % 2 === 1) {
          setIsAnswerList((previous) => {
            previous[i - 1] = true
            previous[i] = true
            return [...previous]
          })
          setScoreCount(scoreCount + 1)
          return
        }
        setIsAnswerList((previous) => {
          previous[i + 1] = true
          previous[i] = true
          return [...previous]
        })
        setScoreCount(scoreCount + 1)
        return
      }
    }
  }

  return (
    <>
      {currentScreen === ScreenProgress.START && (
        <>
          <img
            src={'images/mistakes_start.png'}
            width={window.innerWidth}
            height={window.innerHeight}
            alt="start"
            className={styles.test}
          />
          <div className={styles.button}>
            <Button
              innerText="START"
              clickEvent={() => {
                setCurrentScreen(ScreenProgress.GAME)
              }}
            />
          </div>
        </>
      )}
      {currentScreen === ScreenProgress.GAME && (
        <div className={styles.main}>
          <div className={styles.image}>
            <img src={'images/mistakes.png'} width={'1512px'} alt="mistakes" />
          </div>
          {isAnswerList.map((__, index) => {
            return (
              <>
                {isAnswerList[index] && (
                  <div
                    className={getClassNames(styles, [
                      'answer',
                      `index${index}`,
                    ])}
                  >
                    <img src={'images/maru1.png'} width={'500px'} alt="maru1" />
                  </div>
                )}
                <div
                  className={getClassNames(styles, [
                    'clickRange',
                    `index${index}`,
                  ])}
                  onClick={handleClick}
                />
              </>
            )
          })}
        </div>
      )}
      {isBottom && <ScoreModal gamePoint={20 * scoreCount} />}
    </>
  )
}
