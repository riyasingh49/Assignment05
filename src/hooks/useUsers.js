import { useQuery } from '@tanstack/react-query'
import userService from '../services/userService'

export function useUsers({ page = 1, limit = 10 } = {}) {
  return useQuery({
    queryKey: ['users', { page, limit }],
    queryFn: () => userService.getAll({ page, limit }),
    placeholderData: (prev) => prev,
  })
}