import { BiShow } from 'react-icons/bi'

import Pagination from '../common/pagination/Pagination'
import { useEffect, useState } from 'react'
import CampaignDesCription from './CampaignDescription/CampaignDesCription'
import { BASE_URL } from '../../utils/baseURL'
import { toast } from 'react-toastify'
import NoDataFound from '../../shared/NoDataFound/NoDataFound'
import TableLoadingSkeleton from '../common/loadingSkeleton/TableLoadingSkeleton'

const CampaignTable = ({
  page,
  setPage,
  refetch,
  limit,
  setLimit,
  campaignTypes,
  totalData,
  isLoading,
}) => {
  const [serialNumber, setSerialNumber] = useState()

  //get Serial number

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit
    setSerialNumber(newSerialNumber)
  }, [page, limit])
  //Show Campaign DesCription  Modal State
  const [showCampaignDesCription, setShowCampaignDesCription] = useState(false)
  const [productDetails, setProductDetails] = useState(false)

  //Offer Description Show Function
  const handleShowCampaignDesCription = (campaign) => {
    setShowCampaignDesCription(true)
    setProductDetails(campaign)
  }

  //Campaign Status Function

  const handleOfferActiveStatus = async (id, campaign_status) => {
    try {
      const data = {
        _id: id,
        campaign_status,
      }
      const response = await fetch(
        `${BASE_URL}/campaign?role_type=campaign_update`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        }
      )
      const result = await response.json()
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : 'campaign status successfully',
          {
            autoClose: 1000,
          }
        )
        refetch()
      } else {
        toast.error(result?.message || 'Something went wrong', {
          autoClose: 1000,
        })
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      })
    } finally {
      ;('')
    }
  }
  const handleOfferInActiveStatus = async (id, campaign_status) => {
    try {
      const data = {
        _id: id,
        campaign_status,
      }
      const response = await fetch(
        `${BASE_URL}/campaign?role_type=campaign_update`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(data),
        }
      )
      const result = await response.json()
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : 'campaign status successfully',
          {
            autoClose: 1000,
          }
        )
        refetch()
      } else {
        toast.error(result?.message || 'Something went wrong', {
          autoClose: 1000,
        })
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      })
    } finally {
      ;('')
    }
  }

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div className='rounded-lg   mt-6'>
          {campaignTypes?.data?.length > 0 ? (
            <div className='overflow-x-auto rounded-t-lg border'>
              <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm rounded-t-lg'>
                <thead className='ltr:text-left rtl:text-right bg-tableRowBGColor'>
                  <tr className='border divide-x'>
                    <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                      SL
                    </th>
                    <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                      campaign Image
                    </th>
                    <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                      Title
                    </th>
                    <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                      Start Date
                    </th>
                    <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                      End Date
                    </th>
                    <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                      Show Campaign Product
                    </th>
                    <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-gray-200 text-center'>
                  {campaignTypes?.data?.map((campaign, i) => (
                    <tr
                      key={campaign?._id}
                      className={`divide-x divide-gray-200 ${
                        i % 2 === 0 ? 'bg-white' : 'bg-tableRowBGColor'
                      }`}
                    >
                      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                        {serialNumber + i + 1}
                      </td>
                      <td className='whitespace-nowrap px-4 py-2 text-gray-700 flex justify-center'>
                        <img
                          className='w-[44px] h-[44px] rounded-[8px]'
                          src={campaign?.campaign_image}
                          alt=''
                        />
                      </td>
                      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                        {campaign?.campaign_title}
                      </td>
                      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                        {campaign?.campaign_start_date}
                      </td>
                      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 '>
                        {campaign?.campaign_end_date}
                      </td>
                      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900 '>
                        <button
                          onClick={() =>
                            handleShowCampaignDesCription(campaign)
                          }
                        >
                          <BiShow size={22} />
                        </button>
                      </td>
                      <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                        {campaign?.campaign_status === 'active' ? (
                          <button
                            className='bg-bgBtnActive text-btnActiveColor px-[10px] py-[4px] rounded-[8px]'
                            onClick={() =>
                              handleOfferActiveStatus(
                                campaign?._id,
                                campaign?.campaign_status
                                  ? 'in-active'
                                  : 'active'
                              )
                            }
                          >
                            <span>Active</span>
                          </button>
                        ) : (
                          <button
                            className='bg-bgBtnInactive text-btnInactiveColor px-[10px] py-[4px] rounded-[8px]'
                            onClick={() =>
                              handleOfferInActiveStatus(
                                campaign?._id,
                                campaign?.campaign_status
                                  ? 'active'
                                  : 'in-active'
                              )
                            }
                          >
                            <span>In-Active</span>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoDataFound />
          )}

          {/* Campaign Description */}
          {showCampaignDesCription && (
            <CampaignDesCription
              setShowCampaignDesCription={setShowCampaignDesCription}
              productDetails={productDetails}
            />
          )}

          {/* pagination */}

          {totalData > 10 && (
            <Pagination
              setLimit={setLimit}
              page={page}
              limit={limit}
              totalData={totalData}
              setPage={setPage}
            />
          )}
        </div>
      )}
    </>
  )
}

export default CampaignTable
