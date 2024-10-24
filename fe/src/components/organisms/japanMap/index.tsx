import React from 'react'
import './index.css'
import { Area } from '../../molecules'
import { areas } from '../../../libs/prefecture'

type JapanMapProperties = {
  handleClick:(prefectureName: string)=>void 
} 

//TODO: 余裕があればスタイルをscssに揃えて分離する
export const JapanMap: React.FC<JapanMapProperties> = ({ handleClick }) => {
  return (
    <div id="japan-map" className="clearfix">
      {areas.map((area) => (
        <Area
          id={area.id}
          name={area.name}
          key={area.id}
          areaPrefectures={area.prefectures}
          handleClick={handleClick}
        />
      ))}
    </div>
  )
}
