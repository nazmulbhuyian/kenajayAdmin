import { Link } from 'react-router-dom'
import CampaignTable from '../../../components/Campaign/CampaignTable'
import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from '../../../utils/baseURL'
import { LoaderOverlay } from '../../../components/common/loader/LoderOverley'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/AuthProvider'
import useDebounced from '../../../hooks/useDebounced'

const CampaignListPage = () => {
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
  // Fetch Single Offer  data
  const {
    data: campaignTypes = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/campaign/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=campaign_show`,
    ],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/campaign/dashboard?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=campaign_show`,
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
      <div className='flex justify-between mt-6'>
        <div>
          <h1 className='text-2xl'>Campaign</h1>
        </div>
        <Link to='/add-campaign'>
          <div>
            <button className='w-[138px] h-[40px] rounded-[8px] py-[10px] px-[14px] bg-primaryColor  text-white text-sm'>
              Add Campaign
            </button>
          </div>
        </Link>
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
      {/* show Campaign table */}
      <CampaignTable
        refetch={refetch}
        page={page}
        setPage={setPage}
        limit={limit}
        setLimit={setLimit}
        user={user}
        campaignTypes={campaignTypes}
        totalData={campaignTypes?.totalData}
        isLoading={isLoading}
      />
    </div>
  )
}

export default CampaignListPage
