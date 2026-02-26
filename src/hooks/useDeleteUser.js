import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import userService from '../services/userService'
//Delete -> useMutation

export function useDeleteUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: userService.delete,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] })
      toast.success('User deleted.')
    },
    onError: (err) => toast.error(err.message),
  })
}