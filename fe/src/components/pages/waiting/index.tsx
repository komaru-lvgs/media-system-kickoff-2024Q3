import styles from './index.module.scss'
import { InfoModal } from '../../atoms'

export const Waiting: React.FC = () => {
  return (
    <>
      <InfoModal
        iconPath="/images/exclamation.png"
        message="投票が完了しました<br/>このまましばしお待ちください"
      />
    </>
  )
}
