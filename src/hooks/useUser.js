import { useQuery } from '@tanstack/react-query'
import userService from '../services/userService'

//get request-> useQuery

export function useUser(id) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userService.getOne(id),
    enabled: !!id,
  })
}