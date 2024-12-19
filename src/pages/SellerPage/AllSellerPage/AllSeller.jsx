import { useContext, useEffect, useState } from 'react'
import AddSeller from '../../../components/Seller/AddSeller'
import { AuthContext } from '../../../context/AuthProvider'
import useGetRole from '../../../hooks/useGetRole'
import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../../../utils/baseURL'

import AllSellerTableList from '../../../components/Seller/AllSellerTableList'
import useDebounced from '../../../hooks/useDebounced'

const AllSeller = () => {
  //get user Data
  const { user } = useContext(AuthContext)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  //add seller modal State
  const [openAddSellerModal, SetOpenAddSellerModal] = useState(false)
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

  //get Seller Data..
  const {
    data: sellerData,
    isLoading: isLoadingSeller,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/seller/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=seller_show`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/seller/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=seller_show`,
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

  //console.log(sellerData)

  return (
    <div className='bg-white rounded py-6 px-4 shadow'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>All Seller List </h1>
        </div>
        <div>
          <div>
            <button
              className='h-[40px] rounded-[8px] py-[10px] px-[14px] bg-primaryColor hover:bg-blue-500 duration-200  text-white text-sm'
              onClick={() => SetOpenAddSellerModal(true)}
            >
              Add All Seller
            </button>
          </div>
        </div>
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
      {/* show All  Seller Table List Component*/}
      <AllSellerTableList
        SellerData={sellerData?.data}
        totalData={sellerData?.totalData}
        refetch={refetch}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        roleData={roleData}
        isLoading={isLoading}
        user={user}
        isLoadingSeller={isLoadingSeller}
      />

      {/* add all  Seller modal component */}
      {openAddSellerModal && (
        <AddSeller
          SetOpenAddSellerModal={SetOpenAddSellerModal}
          roleData={roleData}
          refetch={refetch}
          isLoading={isLoading}
          user={user}
          getInitialCommissionData={getInitialCommissionData?.data[0]}
        />
      )}
    </div>
  )
}

export default AllSeller
