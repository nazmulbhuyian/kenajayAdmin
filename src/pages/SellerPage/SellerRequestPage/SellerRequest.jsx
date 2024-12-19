import { useContext, useEffect, useState } from 'react'
import SellerRequestTable from '../../../components/Seller/SellerRequestTable'
import useGetRole from '../../../hooks/useGetRole'
import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../../../utils/baseURL'
import useDebounced from '../../../hooks/useDebounced'
import { AuthContext } from '../../../context/AuthProvider'

const SellerRequest = () => {
  //get user Data
  const { user } = useContext(AuthContext)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  // Role data fetch
  const { data: roleData, isLoading } = useGetRole()

  //data fetching of Commission by Tans Tack Query
  const { data: getInitialCommissionData } = useQuery({
    queryKey: [`/api/v1/commision`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/commision`, {
          credentials: 'include',
        })

        if (!res.ok) {
          const errorData = await res.text() // Get more info about the error
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          )
        }

        const data = await res.json()
        return data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error // Rethrow to propagate the error to react-query
      }
    },
  })

  //seller Request Data fetch
  const {
    data: reqSellerData,
    isLoading: isLoadingReqSeller,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/seller?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=seller_show`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/seller?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=seller_show`,
        {
          credentials: 'include',
        }
      )
      const data = await res.json()
      return data
    },
  })
  // handle item search function....
  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 })
  useEffect(() => {
    setSearchTerm(searchText)
  }, [searchText])

  // handle item search function....
  const handleSearchValue = (value) => {
    setSearchValue(value)
    setLimit(10)
    setPage(1)
  }

  //console.log(reqSellerData)

  return (
    <div className='bg-white rounded py-6 px-4 shadow'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Request Seller List </h1>
        </div>
        <div></div>
      </div>
      <div className='mt-3'>
        <input
          type='text'
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder='Search Category...'
          className='w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
        />
      </div>
      {/* show All  Seller Request Table List Component*/}
      <SellerRequestTable
        reqSellerData={reqSellerData?.data}
        totalData={reqSellerData?.totalData}
        refetch={refetch}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        roleData={roleData}
        isLoading={isLoading}
        user={user}
        isLoadingReqSeller={isLoadingReqSeller}
        getInitialCommissionData={getInitialCommissionData?.data[0]}
      />
    </div>
  )
}

export default SellerRequest
