import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Page404: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/')
    }, 3000)
    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <>
      <img
        src={'images/404_screen.png'}
        alt=""
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  )
}
