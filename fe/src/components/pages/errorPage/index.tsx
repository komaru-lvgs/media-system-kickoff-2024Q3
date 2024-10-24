import React from 'react'
import { InfoModal } from '../../atoms'
import { useLocation } from 'react-router-dom'

type ErrorPageProperties = {
  statusCode: number
}

export const ErrorPage: React.FC<ErrorPageProperties> = ({ statusCode }) => {
  // エラー番号のクエリ
  const search = useLocation().search
  const query = new URLSearchParams(search)
  const redirectCode = query.get('status')
  if (redirectCode !== null) statusCode = Number(redirectCode)

  let message = ''
  switch (statusCode) {
    case 401:
      message = '401 認証エラー: このページにアクセスする権限がありません'
      break
    case 403:
      message = '402 禁止エラー: このページへのアクセスは許可されていません'
      break
    case 404:
      message = '404 ページが見つかりません'
      break
    case 500:
      message = '500 サーバーエラーが発生しました'
      break
    case 503:
      message = '503 サービスが利用できません'
      break
    default:
      message = 'エラーが発生しました'
      break
  }

  return (
    <>
      <InfoModal iconPath="/images/exclamation.png" message={message} />
    </>
  )
}
