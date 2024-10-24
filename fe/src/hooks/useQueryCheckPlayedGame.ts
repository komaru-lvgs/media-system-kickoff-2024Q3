import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { useError } from '../hooks/useError'

export const useQueryCheckPlayedGame = (gameId?: number) => {
  const { switchErrorHandling } = useError()
  const checkIsPlayedGame = async () => {
    //TODO: 型修正
    const { data } = await axios.get(
      `${process.env.REACT_APP_API_URL}/register/check`,
      { withCredentials: true, params: { gameId: gameId } },
    )
    return data
  }
  return useQuery<boolean, Error>({
    queryKey: ['isPlayedGame'],
    queryFn: checkIsPlayedGame,
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
