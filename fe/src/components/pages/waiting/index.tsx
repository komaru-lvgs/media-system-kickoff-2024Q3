import { useEffect } from 'react'
import { InfoModal } from '../../atoms'
import { useLocation, useNavigate } from 'react-router-dom'

export const Waiting: React.FC = () => {

  // クエリパラメータを取得する
  const search = useLocation().search
  const query = new URLSearchParams(search)
  const isOA = Number(query.get('oa'))
  const groupID = query.get('group')
  const questionID = query.get('question')
  const navigate = useNavigate()

  useEffect(() => {
    // クエリパラメータが適切か確認
    if (
      isOA < 0 ||
      1 < isOA ||
      Number.isNaN(isOA) ||
      groupID === null ||
      questionID === null
    ) {
      navigate('/500', { state: { redirectCode: 500 } })
    }

    // TODO: データベースから回答取得
    // 複数ある場合は、一番最初の時刻で送信した回答を取得する
  }, [])

  return (
    <>
      <InfoModal
        iconPath="/images/information.png"
        message="回答が完了しました<br/>このまましばしお待ちください"
      />
    </>
  )
}
