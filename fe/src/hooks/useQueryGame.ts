import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Game } from '../types'
import { useError } from '../hooks/useError'

export const useQueryGame = (password?: string) => {
  const { switchErrorHandling } = useError()
  const getGame = async () => {
    //TODO: 型修正
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/game`,
      { withCredentials: false , params: { password: password }}
    )
    return data
  }

  return useQuery<Game, Error>({
    queryKey: ['game'],
    queryFn: getGame,
    staleTime: Infinity,
    enabled: false,
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}