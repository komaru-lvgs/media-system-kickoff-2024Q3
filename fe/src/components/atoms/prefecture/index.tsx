import React from 'react'

type PrefectureProperties = {
  id: string
  name: string
  handleClick: () => void
}

export const Prefecture: React.FC<PrefectureProperties> = ({
  id,
  name,
  handleClick,
}) => {
  return (
    //WHY: aでないとスタイルがあたらないため
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a onClick={handleClick} >
      <div id={id}>
        <p>{name}</p>
      </div>
    </a>
  )
}
