import React, { useState, useRef, useEffect, useContext } from 'react'
import { colors } from '../../../libs/timer'
import styles from './index.module.scss'
import { TimerContext } from '../../../hooks/useTimer'

type TimerProperties = {
  //注意: 背景色の関係で3の倍数であること
  second?: number
  isStop?: boolean
}

export const Timer: React.FC<TimerProperties> = ({
  second = 60,
  isStop = false,
}) => {
  const { timeNumber, setTimeNumber } = useContext(TimerContext)
  const [time, setTime] = useState(0)
  const intervalRef = useRef(0)
  const [conicTurn, setConicTurn] = useState(0)
  const [conicColor, setConicColor] = useState(0)

  useEffect(() => {
    if (isStop) return 
      intervalRef.current = window.setInterval(() => {
        setTime((time) => time + 1)
        setConicTurn((c) => c + 1 / ((100 * second) / (colors.length - 1)))
      }, 10)
      if (conicTurn >= 1) {
        setConicColor((x) => x + 1)
        setConicTurn(0)
      }
      return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  useEffect(() => {
    if (time >= second * 100) {
      setTimeNumber(second)
    } else {
      setTimeNumber(Math.floor(time / 100))
    }
  }, [second, setTimeNumber, time])

  const backgroundStyle =
    'conic-gradient(' +
    colors[conicColor + 1] +
    conicTurn +
    'turn, ' +
    colors[conicColor] +
    conicTurn +
    'turn)'

  return (
    <div className={styles.outerCircle}>
      <div className={styles.midCircle}>
        <div
          className={styles.timerCircle}
          style={{ background: backgroundStyle }}
        >
          <div className={styles.timerText}>{second - timeNumber}</div>
        </div>
      </div>
    </div>
  )
}
