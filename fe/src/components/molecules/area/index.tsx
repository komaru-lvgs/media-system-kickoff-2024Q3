import React from 'react'
import { prefectures } from '../../../libs/prefecture'
import { Prefecture } from '../../atoms'

type AreaProperties = {
  id: string
  name: string
  areaPrefectures: string[]
  handleClick: (prefectureName: string) => void
}

export const Area: React.FC<AreaProperties> = ({
  id,
  name,
  areaPrefectures,
  handleClick,
}) => {
  return (
    <div id={id} className="clearfix">
      <p className="area-title">{name}</p>
      <div className="area">
        {areaPrefectures.map((id) => (
          <Prefecture
            id={id}
            key={id}
            name={prefectures[id]}
            handleClick={() => handleClick(prefectures[id])}
          />
        ))}
      </div>
    </div>
  )
}
