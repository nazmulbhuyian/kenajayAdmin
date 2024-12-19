import { useContext, useEffect, useState } from 'react'



import { useQuery } from '@tanstack/react-query'
import useDebounced from '../../../hooks/useDebounced'
import { BASE_URL } from '../../../utils/baseURL'
import AddCoupon from '../../../components/Coupon/AddCoupon'
import YourCouponTable from '../../../components/Coupon/YourCouponOfferTable/YourCouponTable'
import { AuthContext } from '../../../context/AuthProvider'


const YourCoupon = () => {
  const { user } = useContext(AuthContext)
  const [page, setPage] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  //Add Coupon Modal Open State
  const [openAddCouponModal, setOpenAddCouponModal] = useState(false)

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
 const panel_owner_id = user?.panel_owner_id ? user?.panel_owner_id : user?._id

 
  //data fetching of Child Category by Tans Tack Query
  const {
    data: getCoupons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/coupon/self_coupon?page=${page}&limit=${limit}&searchTerm=${searchTerm}&panel_owner_id=${panel_owner_id}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/coupon/self_coupon?page=${page}&limit=${limit}&searchTerm=${searchTerm}&panel_owner_id=${panel_owner_id}`,
          {
            credentials: 'include',
          }
        )

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
  console.log(getCoupons)

  return (
    <div>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Coupon</h1>
        </div>

        <div>
          <button
            className='w-[138px] h-[40px] rounded-[8px] py-[10px] px-[14px] bg-primaryColor  text-white text-sm'
            onClick={() => setOpenAddCouponModal(true)}
          >
            Add Coupon
          </button>
        </div>
      </div>
      {/* search Coupon... */}
      <div className='mt-3'>
        <input
          type='text'
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder='Search Coupon...'
          className='w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
        />
      </div>
      {/* Coupon  Table Show Value Update Status*/}
      <YourCouponTable
        refetch={refetch}
        setPage={setPage}
        page={page}
        limit={limit}
        setLimit={setLimit}
        user={user}
        isLoading={isLoading}
        getCoupons={getCoupons}
        totalData={getCoupons?.totalData}
      />

      {/* Add Coupon Modal Open  */}
      {openAddCouponModal && (
        <AddCoupon
          setOpenAddCouponModal={setOpenAddCouponModal}
          refetch={refetch}
        />
      )}
    </div>
  )
}

export default YourCoupon
