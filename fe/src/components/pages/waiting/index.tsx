import { InfoModal } from '../../atoms'

export const Waiting: React.FC = () => {
  return (
    <>
      <InfoModal
        iconPath="/images/information.png"
        message="投票が完了しました<br/>このまましばしお待ちください"
      />
    </>
  )
}
