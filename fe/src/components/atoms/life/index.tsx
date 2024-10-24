import React from 'react'

import style from './index.module.scss'

type LifeProperties = {
  maxLife: number
  currentLife: number
}

export const Life: React.FC<LifeProperties> = ({
  maxLife = 5,
  currentLife = maxLife,
}) => {
  const lifePathList = []
  for (let i = 0; i < currentLife; i++) {
    lifePathList.push('images/mole_life_on.png')
  }
  for (let i = currentLife; i < maxLife; i++) {
    lifePathList.push('images/mole_life_off.png')
  }

  return (
    <ul className={style.life}>
      {lifePathList.map((path, index) => (
        <li key={index}>
          <img src={path} alt="" className={style.image} />
        </li>
      ))}
    </ul>
  )
}
