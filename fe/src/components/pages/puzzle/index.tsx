import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { GamePageTemplate } from '../../templates'
import { CurrentScreen } from '../../../libs/puzzle'

export const Puzzle: React.FC = () => {
  const navigate = useNavigate()
  const [currentScreen, setCurrentScreen] = useState<CurrentScreen>(
    CurrentScreen.ONE_PIECE,
  )

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentScreen(CurrentScreen.ALL_PIECE)
    }, 4200)

    return () => clearTimeout(timeout)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/password-24-training')
    }, 5000)

    return () => clearTimeout(timeout)
  }, [navigate])

  const addressString = localStorage.getItem('gameId')
  const playedGameAddressListString = localStorage.getItem(
    'playedGameAddressList',
  )
  const address = addressString ? parseInt(addressString) : 0
  const playedGameAddressList: number[] = playedGameAddressListString
    ? JSON.parse(playedGameAddressListString)
    : []

  return (
    <>
      {currentScreen === CurrentScreen.ONE_PIECE && (
        <div className={styles.back}>
          <div className={styles.fadeInFromBottom}>
            <img
              src={`images/puzzle_center${address}.png`}
              className={styles.puzzle}
              alt={`puzzleFade${address}`}
            />
            <div className={styles.cFirework} />
            <div className={styles.cFirework} />
            <div className={styles.cFirework} />
            <div className={styles.cFirework} />
            <div className={styles.cFirework} />
            <div className={styles.cFirework} />
            <div className={styles.cFirework} />
            <div className={styles.cFirework} />
          </div>
        </div>
      )}

      {currentScreen === CurrentScreen.ALL_PIECE && (
        <>
          <GamePageTemplate isFrame />

          {playedGameAddressList.map((playedAddress) => (
            <div key={playedAddress} className={styles.hoji}>
              <img
                src={`images/puzzle${playedAddress}.png`}
                className={styles.puzzle}
                alt={`puzzle${playedAddress}`}
              />
            </div>
          ))}

          {address === 1 && (
            <img
              src={'images/puzzle1.png'}
              className={styles.puzzle1}
              alt="puzzle1"
            />
          )}
          {address === 2 && (
            <img
              src={'images/puzzle2.png'}
              className={styles.puzzle2}
              alt="puzzle2"
            />
          )}
          {address === 3 && (
            <img
              src={'images/puzzle3.png'}
              className={styles.puzzle3}
              alt="puzzle3"
            />
          )}
          {address === 4 && (
            <img
              src={'images/puzzle4.png'}
              className={styles.puzzle4}
              alt="puzzle4"
            />
          )}
          {address === 5 && (
            <img
              src={'images/puzzle5.png'}
              className={styles.puzzle5}
              alt="puzzle5"
            />
          )}
          {address === 6 && (
            <img
              src={'images/puzzle6.png'}
              className={styles.puzzle6}
              alt="puzzle6"
            />
          )}
          {address === 7 && (
            <img
              src={'images/puzzle7.png'}
              className={styles.puzzle7}
              alt="puzzle7"
            />
          )}
          {address === 8 && (
            <img
              src={'images/puzzle8.png'}
              className={styles.puzzle8}
              alt="puzzle8"
            />
          )}
          {address === 9 && (
            <img
              src={'images/puzzle9.png'}
              className={styles.puzzle9}
              alt="puzzle9"
            />
          )}
        </>
      )}
    </>
  )
}
