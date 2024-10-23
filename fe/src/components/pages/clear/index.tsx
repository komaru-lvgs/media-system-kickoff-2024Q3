import styles from './index.module.scss'
import Confetti from 'react-confetti'

export const Clear: React.FC = () => {


  return (
    <>
      <div className={styles.confetti}>
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.1}
          numberOfPieces={500}
          recycle={false}
        />
      </div>
      <img src={'images/team.jpg'} className={styles.team} alt="team" />
      <a className={styles.downloadButton} href={`images/team.jpg`} download>
        DOWNLOAD
      </a>
    </>
  )
}
