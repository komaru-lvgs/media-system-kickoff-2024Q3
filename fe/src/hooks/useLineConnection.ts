import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { answer, timerSecond } from '../libs/lineConnection'
import LeaderLine from 'leader-line-new'
import { TimerContext } from './useTimer'

export const useLineConnection = (input: {
  divsRef: React.MutableRefObject<HTMLDivElement[]>
  elmPointRef: React.RefObject<HTMLDivElement>
}) => {
  const linesRef = useRef<Map<number, LeaderLine>>(new Map())
  const lineContainerRef = useRef<HTMLDivElement>(null)
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<number>()
  const [dotLine, setDotLine] = useState<LeaderLine | null>(null)
  const [life, setLife] = useState<number>(3)
  const [isStop, setIsStop] = useState(false)
  const { timeNumber } = useContext(TimerContext)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [scoreCount, setScoreCount] = useState(0)

  const removeDotLine = useCallback(() => {
    if (dotLine) {
      dotLine.remove()
      setDotLine(null)
    }
  }, [dotLine])

  const createLine = useCallback(
    (startButton: HTMLDivElement, endButton: HTMLDivElement) => {
      const existingLine = linesRef.current.get(
        parseInt(startButton.dataset.index || '0'),
      )
      let isSelectedEnd = false
      //WHY: すでに使用済みのendの場合、setしない
      linesRef.current.forEach((item) => {
        if (
          (item.end as HTMLElement).dataset.index === endButton.dataset.index
        ) {
          isSelectedEnd = true
          return
        }
      })
      if (isSelectedEnd) return
      if (existingLine) {
        existingLine.setOptions({ end: endButton })
        removeDotLine()
      } else {
        const line = new LeaderLine(startButton, endButton)
        linesRef.current.set(
          startButton.dataset.index ? parseInt(startButton.dataset.index) : 0,
          line,
        )
        removeDotLine()
        if (lineContainerRef.current) {
          const div = document.createElement('div')
          div.innerHTML = line.path
          lineContainerRef.current.appendChild(div.firstChild as Node)
        }
      }
    },
    [removeDotLine],
  )

  const handleButtonClick = (index: number) => {
    if (index < 5) {
      setSelectedButtonIndex(index)
      const elmPoint = input.elmPointRef.current
      if (!elmPoint) return

      if (dotLine) {
        removeDotLine()
      } else {
        const newLine = new LeaderLine(input.divsRef.current[index], elmPoint, {
          endPlug: 'disc',
          dash: { animation: true },
        })
        setDotLine(newLine)
        updateLine()
      }
    } else {
      if (selectedButtonIndex !== undefined) {
        const startButtonIndex = selectedButtonIndex
        const startButton = input.divsRef.current[startButtonIndex]
        const endButton = input.divsRef.current[index]
        createLine(startButton, endButton)
      }
    }
  }

  const removeLine = useCallback((buttonIndex: number) => {
    const line = linesRef.current.get(buttonIndex)
    if (line) {
      line.remove()
      linesRef.current.delete(buttonIndex)
    }
  }, [])

  const removeAllLine = useCallback(() => {
    linesRef.current.forEach((line) => {
      if (line) {
        line.remove()
      }
    })
    linesRef.current.clear()
  }, [])

  //正誤判定
  const handleSubmission = useCallback(() => {
    linesRef.current.forEach((item, key2) => {
      if (
        Object.entries(answer).find(
          ([key]) => key === (item.start as HTMLElement).dataset.index,
        )?.[1] !== Number((item.end as HTMLElement).dataset.index)
      ) {
        removeLine(key2)
      }
    })
    if (linesRef.current.size === 5) {
      setIsStop(true)
      setScoreCount((timerSecond - timeNumber) * life)
      const timeout = setTimeout(() => {
        setIsModalOpen(true)
        removeAllLine()
      }, 1000)
      return () => clearTimeout(timeout)
    } else {
      setLife((previous) => previous - 1)
      if (life <= 1) {
        setIsStop(true)
        setScoreCount(0)
        const timeout = setTimeout(() => {
          setIsModalOpen(true)
          removeAllLine()
        }, 1000)
        return () => clearTimeout(timeout)
      }
    }
  }, [timeNumber, life, removeLine, removeAllLine])

  const updateLine = useCallback(
    (event?: MouseEvent) => {
      const elmPoint = input.elmPointRef.current
      if (!elmPoint || !event) return

      elmPoint.style.left = `${event.clientX}px`
      elmPoint.style.top = `${event.clientY}px`
      if (dotLine) dotLine.position()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dotLine],
  )

  const removeClickDiscLine = useCallback(
    (event: MouseEvent) => {
      if (event.target === null) return
      const divsArr = Array.prototype.slice.call(input.divsRef.current)
      if (!divsArr.includes(event.target)) {
        removeDotLine()
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dotLine],
  )

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      updateLine(event)
    }

    document.addEventListener('mousemove', handleMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [updateLine, dotLine])

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      removeClickDiscLine(event)
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [removeClickDiscLine])

  useEffect(() => {
    if (timeNumber >= timerSecond) {
      setScoreCount(0)
      const timeout = setTimeout(() => {
        setIsModalOpen(true)
      }, 1000)
      return () => clearTimeout(timeout)
    }
  }, [timeNumber])

  return {
    handleSubmission,
    handleButtonClick,
    life,
    isStop,
    isModalOpen,
    scoreCount,
  }
}
