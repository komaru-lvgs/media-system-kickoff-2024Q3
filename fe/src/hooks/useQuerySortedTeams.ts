import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import {  Team } from '../types'
import { useError } from './useError'

export const useQuerySortedTeams = () => {
  const { switchErrorHandling } = useError()
  const getSortedTeams = async () => {
    const { data } = await axios.get<Team[]>(
      `${process.env.REACT_APP_API_URL}/teams`,
      { withCredentials: true }
    )
    return data
  }
  return useQuery<Team[], Error>({
    queryKey: ['teams'],
    queryFn: getSortedTeams,
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