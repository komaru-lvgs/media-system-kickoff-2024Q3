import React from 'react'
import { allRow } from '../../../libs/faceSwap'
import { getClassNames } from '../../../libs/style'
import styles from './index.module.scss'
import { Button } from '../../atoms/button'
import { Timer } from '../../atoms/timer'

type FaceSwapGameProperties = {
  currentIndexList: number[]
  backgroundSrc: string
  handleRightButtonClick: (index: number) => void
  handleLeftButtonClick: (index: number) => void
  handleSubmitButtonClick: () => void
}

export const FaceSwapGame: React.FC<FaceSwapGameProperties> = ({
  currentIndexList,
  backgroundSrc,
  handleRightButtonClick,
  handleLeftButtonClick,
  handleSubmitButtonClick,
}) => {
  return (
    <>
      <img src={backgroundSrc} width={window.innerWidth} alt="game1" />
      <div>
        {allRow.map((item, index) => {
          return (
            <div key={index}>
              <div className={getClassNames(styles, ['allRow', `row${index}`])}>
                <img
                  src={item[currentIndexList[index]].imageName}
                  width={window.outerWidth}
                  alt=""
                />
              </div>
              <div
                className={getClassNames(styles, [
                  'rightButton',
                  `right_button${index}`,
                ])}
                onClick={() => {
                  handleRightButtonClick(index)
                }}
              >
                <img src={'images/faceswap_right_button.png'} alt="" />
              </div>
              <div
                key={index}
                className={getClassNames(styles, [
                  'leftButton',
                  `left_button${index}`,
                ])}
                onClick={() => {
                  handleLeftButtonClick(index)
                }}
              >
                <img src={'images/faceswap_left_button.png'} alt="" />
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.submit}>
        <Button innerText="SUBMIT" clickEvent={handleSubmitButtonClick} />
      </div>
      <div className={styles.header}>
        <Timer second={20} />
      </div>
    </>
  )
}
