import { JapanMap } from '../../organisms'
import { useWhereFrom } from '../../../hooks/useWhereFrom'
import style from './index.module.scss'
import { QuestionProgress, timerSecond } from '../../../libs/wherefrom'
import { Button } from '../../atoms/button'
import { Life } from '../../atoms/life'
import { Timer } from '../../atoms/timer'
import { ScoreModal } from '../../atoms/scoreModal'

export const WhereFrom: React.FC = () => {
  const {
    currentScreen,
    selectedMember,
    life,
    isStop,
    handleButtonClick,
    handlePrefectureClick,
    isModalOpen,
    scoreCount,
    isFailureOpen,
    timeNumber,
  } = useWhereFrom()

  return (
    <>
      {currentScreen === QuestionProgress.START && (
        <div className={style.start}>
          <img
            src="images/shushinchi_start_home.png"
            className={style.startback}
            alt=""
          />
          <div className={style.button}>
            <Button innerText={'START'} clickEvent={handleButtonClick} />
          </div>
        </div>
      )}
      {currentScreen !== QuestionProgress.START && (
        <>
          <div className={style.game}>
            <div className={style.head}>
              <div className={style.textbox}>
                <span className={style.first}>
                  {selectedMember.name}の出身地はどこでしょう
                </span>
                <br />
                <span className={style.second}>正解だと思う場所を選んでね</span>
              </div>
              <Life maxLife={3} currentLife={life} />
              <Timer isStop={isStop} second={timerSecond} />
            </div>
            <div className={style.hintBox}>
              <img src={selectedMember.img1} alt="" className={style.face} />
              {(currentScreen === QuestionProgress.HINT1 ||
                currentScreen === QuestionProgress.HINT2) && (
                <div className={style.hint}>
                  <p>ヒント</p>
                  <img
                    src={selectedMember.hint1}
                    alt=""
                    className={style.image}
                  />
                  <img
                    src={'images/shushinchi_hint_makimono.png'}
                    alt=""
                    className={style.makimono}
                  />
                  <img
                    src={'images/shushinchi_hint_bin.png'}
                    alt=""
                    className={style.hintbin}
                  />
                </div>
              )}
              {currentScreen === QuestionProgress.HINT2 && (
                <div className={style.hint}>
                  <p>ヒント</p>
                  <img
                    src={selectedMember.hint2}
                    alt=""
                    className={style.image}
                  />
                  <img
                    src={'images/shushinchi_hint_makimono.png'}
                    alt=""
                    className={style.makimono}
                  />
                </div>
              )}
            </div>
            <div className={style.japanMap}>
              <JapanMap handleClick={handlePrefectureClick} />
            </div>
            {currentScreen === QuestionProgress.FAILURE && (
              <div className={style.end}>
                <img
                  src={selectedMember.img2}
                  alt=""
                  className={style.makimono}
                />
              </div>
            )}
            {currentScreen === QuestionProgress.CLEAR && (
              <div className={style.end}>
                <img
                  src={selectedMember.img2}
                  alt=""
                  className={style.makimono}
                />
                <img src="images/clear.png" alt="" className={style.clear} />
              </div>
            )}
          </div>
          {isModalOpen && (
            <ScoreModal gamePoint={(60 - timeNumber) * scoreCount} />
          )}
          {isFailureOpen && (
            <img src="images/batu.png" alt="" className={style.failure} />
          )}
        </>
      )}
    </>
  )
}
