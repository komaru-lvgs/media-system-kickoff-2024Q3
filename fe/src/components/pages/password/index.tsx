import React, { useCallback, useEffect, useState } from 'react'
import styles from './index.module.scss'
import { GamePageTemplate } from '../../templates'
import { useQueryGame } from '../../../hooks/useQueryGame'
import { useQueryCheckPlayedGame } from '../../../hooks/useQueryCheckPlayedGame'
import { useNavigate } from 'react-router-dom'
import { useQueryPlayedGames } from '../../../hooks/useQueryPlayedGames'
import { useQueryClient } from '@tanstack/react-query'
import { Game } from '../../../types'

export const Password: React.FC = () => {
  const [password, setPassword] = useState<string>()
  const [game, setGame] = useState<Game>()
  const { refetch: getGame } = useQueryGame(password)
  const { refetch: checkRefetch } = useQueryCheckPlayedGame(game?.id)

  const queryClient = useQueryClient()
  const invalidateAllQueries = useCallback(() => {
    queryClient.invalidateQueries()
  }, [queryClient])

  const { data } = useQueryPlayedGames()
  localStorage.setItem(
    'playedGameAddressList',
    JSON.stringify(data?.map((playedGame) => playedGame['game_id'])),
  )
  const navigate = useNavigate()

  const handleClick = useCallback(() => {
    invalidateAllQueries()
    getGame().then((res) => {
      if (!res.data) return
      setGame(res.data)
    })
  }, [getGame, invalidateAllQueries])

  useEffect(() => {
    if (!game) return
    checkRefetch().then((isPlayedGame) => {
      if (isPlayedGame.data === false) {
        localStorage.setItem('gameId', JSON.stringify(game.id))
        navigate(game.url)
      } else {
        //仮で作成
        alert('既にこのパスワードは使用されています')
      }
    })
  }, [checkRefetch, game, navigate])

  return (
    <>
      <div className={styles.textBoxContainer}>
        <input
          type="text"
          placeholder="ここにパスワードを入力してください"
          className={styles.textBox}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <button className={styles.button} onClick={handleClick}>
          決定
        </button>
      </div>
      <GamePageTemplate />
      <img
        src={'images/password_background.png'}
        className={styles.pass}
        alt="pass"
      />
    </>
  )
}
