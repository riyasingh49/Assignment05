import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import userService from '../services/userService'

export function useCreateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: userService.create,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] })
      toast.success('User created successfully!')
    },
    onError: (err) => toast.error(err.message),
  })
}