import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { InfoModal } from '../../atoms'

export const Page404: React.FC = () => {
  const navigate = useNavigate()

  // 404エラー画面
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/')
    }, 3000)
    return () => clearTimeout(timeout)
  }, [navigate])

  return (
    <>
      <InfoModal iconPath="/images/exclamation.png" message="404エラー" />
    </>
  )
}
