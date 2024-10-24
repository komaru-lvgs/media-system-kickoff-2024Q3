import React from 'react'
import { createContext } from 'react'

export const TimerContext = createContext<{
  timeNumber: number
  setTimeNumber: React.Dispatch<React.SetStateAction<number>>
}>({
  timeNumber: 0,
  setTimeNumber: () => {},
})
