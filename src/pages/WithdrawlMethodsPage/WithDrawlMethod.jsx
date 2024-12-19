import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../../utils/baseURL'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'
import useDebounced from '../../hooks/useDebounced'
import WithDrawalTable from '../../components/WithDrawal/WithDrawalTable'
import AddWithDrawal from '../../components/WithDrawal/AddWithDrawal'

const WithDrawlMethod = () => {
  const [withdrawalAddModal, setWithdrawalAddModal] = useState(false)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const { user } = useContext(AuthContext)
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

  //data fetching of WithDrawl Method by Tans Tack Query
  const {
    data: withDrawMethods = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/payment_method/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=payment_method_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/payment_method/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=payment_method_show`,
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

  return (
    <div className='bg-white rounded-lg py-6 px-4 shadow'>
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Withdrawal Methods</h1>
        </div>

        <div>
          <button
            type='button'
            className='h-[40px] rounded-[8px] py-[10px] px-[14px] bg-primaryColor hover:bg-blue-500 duration-200  text-white text-sm'
            onClick={() => setWithdrawalAddModal(true)}
          >
            Add Methods
          </button>
        </div>
      </div>
      {/* search Methods.. */}
      <div className='mt-3'>
        <input
          type='text'
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder='Search Methods...'
          className='w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
        />
      </div>
      {/* WithDrawl Table Data Show and update and delete operation file */}
      <WithDrawalTable
        withDrawMethods={withDrawMethods}
        setPage={setPage}
        setLimit={setLimit}
        setSearchTerm={setSearchTerm}
        refetch={refetch}
        totalData={withDrawMethods?.totalData}
        page={page}
        limit={limit}
        user={user}
        isLoading={isLoading}
      />

      {/* Add Expenses Modal Show */}
      {withdrawalAddModal && (
        <AddWithDrawal
          setWithdrawalAddModal={setWithdrawalAddModal}
          refetch={refetch}
          user={user}
        />
      )}
    </div>
  )
}

export default WithDrawlMethod
