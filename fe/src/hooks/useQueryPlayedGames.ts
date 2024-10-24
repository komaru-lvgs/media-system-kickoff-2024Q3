import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useError } from '../hooks/useError'
import { PlayedGame } from '../types'

export const useQueryPlayedGames = () => {
  const { switchErrorHandling } = useError()
  const getPlayedGames = async () => {
    //TODO: 型修正
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/register/played-games`,
      { withCredentials: true },
    )
    return data
  }

  return useQuery<PlayedGame[], Error>({
    queryKey: ['playedGamesId'],
    queryFn: getPlayedGames,
    staleTime: Infinity, //TODO: 修正
    enabled: true,
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}
