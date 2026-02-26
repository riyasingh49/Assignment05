import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import userService from '../services/userService'

// Put-> useMutation

export function useUpdateUser() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: userService.update,
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: ['users'] })
      qc.setQueryData(['users', updated.id], updated)
      toast.success('User updated successfully!')
    },
    onError: (err) => toast.error(err.message),
  })
}