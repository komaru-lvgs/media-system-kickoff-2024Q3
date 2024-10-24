import axios from 'axios'
import { useMutation } from '@tanstack/react-query'
import { Team } from '../types'
import { useError } from '../hooks/useError'

export const useMutateTeamPoint = () => {
  const { switchErrorHandling } = useError()

  const updateTeamPointMutation = useMutation(
    (point:number) =>
      axios.put<Team>(`${process.env.REACT_APP_API_URL}/register/point`, {
        point,
      }),
    {
      onSuccess: () => {
        //[FIXME]: 後で修正
      },
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
    updateTeamPointMutation
  }
}