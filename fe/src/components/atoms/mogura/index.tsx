import React from 'react'
import styles from './index.module.scss'
import { Mole } from '../../../types'

type MoleProperties = {
  mole: Mole
  hit: Mole[]
  handleClick: () => void
}

export const Mogura: React.FC<MoleProperties> = ({
  mole,
  hit,
  handleClick,
}) => {
  const positions = (holePos: number) => {
    switch (holePos) {
      case 1:
        return { top: '217px', left: '325px', width: '140px' }
      case 2:
        return { top: '218px', left: '665px', width: '140px' }
      case 3:
        return { top: '217px', left: '1025px', width: '140px' }
      case 4:
        return { top: '283px', left: '430px', width: '190px' }
      case 5:
        return { top: '283px', left: '850px', width: '190px' }
      case 6:
        return { top: '390px', left: '90px', width: '250px' }
      case 7:
        return { top: '394px', left: '610px', width: '250px' }
      default:
        return { top: '390px', left: '1155px', width: '250px' }
    }
  }

  return (
    <div className={styles.mole} style={positions(mole.holePos)}>
      <img
        src={mole.img}
        alt=""
        onClick={handleClick}
        draggable="false"
        className={styles.moleImg}
      />
      {hit.includes(mole) &&
        (mole.img === 'images/mogura_nonakasan.png' ? (
          <img src="images/mole_ouch.png" alt="" className={styles.hitImg} />
        ) : (
          <img src="images/mole_nice.png" alt="" className={styles.hitImg} />
        ))}
    </div>
  )
}
