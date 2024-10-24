import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { useMutateTeamPoint } from '../../../hooks/useMutationTeamPoint'
import { useMutatePlayedGame } from '../../../hooks/useMutatePlayedGame'

type ScoreModalProperties = {
  gamePoint: number
}

export const ScoreModal: React.FC<ScoreModalProperties> = ({ gamePoint }) => {
  const navigate = useNavigate()
  const { updateTeamPointMutation } = useMutateTeamPoint()
  const { createPlayedGameMutation } = useMutatePlayedGame()

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateTeamPointMutation.mutateAsync(gamePoint).then(() => {
        const gameId = localStorage.getItem('gameId')
        createPlayedGameMutation.mutate(Number(gameId))
      })
      navigate('/puzzle-24-training')
    }, 5000)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate])

  return (
    <>
      <div className={styles.modal}></div>
      <div className={styles.container}>
        <img src={'images/score.png'} className={styles.score} alt="score" />
        <div className={styles.point}>{gamePoint}</div>
      </div>
    </>
  )
}
