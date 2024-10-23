import React from 'react'

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
        aaa
      </div>
    </div>
  )
}
