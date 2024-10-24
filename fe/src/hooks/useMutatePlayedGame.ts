import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { useError } from './useError'

export const useMutatePlayedGame = () => {
  const { switchErrorHandling } = useError()
  const createPlayedGameMutation = useMutation(
    async(gameId:number) =>
    //TODO: 型定義
      await axios.post(`${process.env.REACT_APP_API_URL}/register/played-game/${gameId}`),
    {
      onError: (err: any) => {
        if (err.response.data.message) {
          switchErrorHandling(err.response.data.message)
        } else {
          switchErrorHandling(err.response.data)
        }
      },
    }
  )
  return {
    createPlayedGameMutation
  }
}