import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../../../utils/baseURL'

import ClientCampaignTable from '../../../components/Campaign/ClientCampaignProduct/ClientCampaignTable'
import useDebounced from '../../../hooks/useDebounced'

const ClientSingleCampaignList = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchValue, setSearchValue] = useState('')
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
  const panel_owner_id = user?.panel_owner_id ? user?.panel_owner_id : user?._id

  // Fetch Single Offer  data
  const {
    data: campaignProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/campaign/dashboard/self_campaign?page=${page}&limit=${limit}&searchTerm=${searchTerm}&panel_owner_id=${panel_owner_id}`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/campaign/dashboard/self_campaign?page=${page}&limit=${limit}&searchTerm=${searchTerm}&panel_owner_id=${panel_owner_id}`,
          {
            credentials: 'include',
          }
        )

        if (!res.ok) {
          const errorData = await res.text()
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          )
        }

        const data = await res.json()
        return data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error
      }
    },
  })

  return (
    <div>
      <div>
        <div className='flex justify-between mt-6'>
          <div>
            <h1 className='text-2xl'>Your Campaign Product</h1>
          </div>
        </div>
        {/* search Brand... */}
        <div className='mt-3'>
          <input
            type='text'
            defaultValue={searchTerm}
            onChange={(e) => handleSearchValue(e.target.value)}
            placeholder='Search Offer Product...'
            className='w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200'
          />
        </div>
        {/* show Offer table */}
        <ClientCampaignTable
          campaignProducts={campaignProducts}
          setLimit={setLimit}
          setPage={setPage}
          page={page}
          limit={limit}
          totalData={campaignProducts?.data?.length}
          refetch={refetch}
          user={user}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}

export default ClientSingleCampaignList
