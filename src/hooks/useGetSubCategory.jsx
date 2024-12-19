import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './../utils/baseURL'

const useGetSubCategory = () => {
  return useQuery({
    queryKey: [`/api/v1/sub_category`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/sub_category`)
      const data = await res.json()
      return data
    },
  })
}

export default useGetSubCategory
