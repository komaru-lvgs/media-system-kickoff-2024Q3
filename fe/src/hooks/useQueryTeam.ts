import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Team } from '../types'
import { useError } from '../hooks/useError'

export const useQueryTeam = () => {
  const { switchErrorHandling } = useError()
  const getTeam = async () => {
    const { data } = await axios.get<Team>(
      `${process.env.REACT_APP_API_URL}/register/team`,
      { withCredentials: true }
    )
    return data
  }
  return useQuery<Team, Error>({
    queryKey: ['team'],
    queryFn: getTeam,
    staleTime: Infinity,
    onError: (err: any) => {
      if (err.response.data.message) {
        switchErrorHandling(err.response.data.message)
      } else {
        switchErrorHandling(err.response.data)
      }
    },
  })
}