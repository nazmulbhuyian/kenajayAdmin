import { useEffect, useState } from 'react'
import TableLoadingSkeleton from '../common/loadingSkeleton/TableLoadingSkeleton'
import { FiEdit } from 'react-icons/fi'
import { MdDeleteForever } from 'react-icons/md'
import NoDataFound from '../../shared/NoDataFound/NoDataFound'
import Pagination from '../common/pagination/Pagination'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2-optimized'
import { BASE_URL } from '../../utils/baseURL'
import UpdateWithDrawal from './UpdateWithDrawal'

const WithDrawalTable = ({
  withDrawMethods,
  setPage,
  setLimit,
  refetch,
  totalData,
  page,
  limit,
  user,
  isLoading,
}) => {
  const [serialNumber, setSerialNumber] = useState()
  const [openWithDrawalMethodModal, setOpenWithDrawalMethodModal] =
    useState(false)
  const [getWithDrawalMethodData, setGetWithDrawalMethodData] = useState(false)

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit
    setSerialNumber(newSerialNumber)
  }, [page, limit])

  //update Modal Function
  const handleWithDrawalUpdateModal = (withDrawMethod) => {
    setOpenWithDrawalMethodModal(true)
    setGetWithDrawalMethodData(withDrawMethod)
  }

  //Update Button Status of Brand
  const handleWithdrawalActiveStatus = async (id, payment_method_status) => {
    try {
      const data = {
        _id: id,
        payment_method_status,
      }
      const response = await fetch(
        `${BASE_URL}/payment_method?role_type=_update`,
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
          result?.message
            ? result?.message
            : 'Withdrawal status Update successfully',
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
  const handleWithdrawalInActiveStatus = async (id, payment_method_status) => {
    try {
      const data = {
        _id: id,
        payment_method_status,
      }
      const response = await fetch(
        `${BASE_URL}/payment_method?role_type=_update`,
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
          result?.message
            ? result?.message
            : 'Withdrawal status Update successfully',
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

  //handle Delete Brand Table Row Function

  //Delete Withdrawal
  const handleDeleteWithdrawalTableRow = (withDrawMethod) => {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this ${withDrawMethod?.payment_method} !`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: withDrawMethod?._id,
          payment_method_image_key: withDrawMethod?.payment_method_image_key,
        }
        try {
          const response = await fetch(
            `
            ${BASE_URL}/payment_method?role_type=_delete`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
                credentials: 'include',
              },
              body: JSON.stringify(sendData),
            }
          )
          const result = await response.json()
          // console.log(result);
          if (result?.statusCode === 200 && result?.success === true) {
            refetch()
            Swal.fire({
              title: 'Deleted!',
              text: `${withDrawMethod?.payment_method}  has been deleted!`,
              icon: 'success',
            })
          } else {
            toast.error(result?.message, {
              autoClose: 1000,
            })
          }
        } catch (error) {
          toast.error('Network error or server is down', {
            autoClose: 1000,
          })
          console.error(error)
        }
      }
    })
  }

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          <div className='rounded-lg border border-gray-200 mt-6'>
            {withDrawMethods?.data?.length > 0 ? (
              <div className='overflow-x-auto rounded-t-lg'>
                <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
                  <thead className='ltr:text-left rtl:text-right bg-[#fff9ee]'>
                    <tr className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
                      <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                        SL No
                      </th>
                      <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                        Payment Method Name
                      </th>
                      <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                        Payment Method Img
                      </th>
                      <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                        Minimum Withdraw Amount
                      </th>
                      <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                        Payment Method Status
                      </th>

                      <th className='whitespace-nowrap p-4 font-medium text-gray-900'>
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className='divide-y divide-gray-200 text-center'>
                    {withDrawMethods?.data?.map((withDrawMethod, i) => (
                      <tr
                        key={withDrawMethod?._id}
                        className={`divide-x divide-gray-200 ${
                          i % 2 === 0 ? 'bg-white' : 'bg-tableRowBGColor'
                        }`}
                      >
                        <td className='whitespace-nowrap px-4  py-1.5 font-medium text-gray-900'>
                          {serialNumber + i + 1}
                        </td>
                        <td className='whitespace-nowrap px-4  py-1.5 font-medium text-gray-900'>
                          {withDrawMethod?.payment_method}
                        </td>
                        <td className='whitespace-nowrap px-4  py-1.5 text-gray-700 flex justify-center'>
                          <img
                            className='w-[44px] h-[44px] rounded-[8px] '
                            src={withDrawMethod?.payment_method_image}
                            alt=''
                          />
                        </td>
                        <td className='whitespace-nowrap px-4  py-1.5 text-gray-700'>
                          {withDrawMethod?.minimum_withdrow_amount}
                        </td>
                        <td className='whitespace-nowrap px-4  py-1.5 text-gray-700'>
                          {withDrawMethod?.payment_method_status ===
                          'active' ? (
                            <button
                              className='bg-bgBtnActive text-btnActiveColor px-[10px] py-[4px] rounded-[8px]'
                              onClick={() =>
                                handleWithdrawalActiveStatus(
                                  withDrawMethod?._id,
                                  withDrawMethod?.payment_method_status
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
                                handleWithdrawalInActiveStatus(
                                  withDrawMethod?._id,
                                  withDrawMethod?.payment_method_status
                                    ? 'active'
                                    : 'in-active'
                                )
                              }
                            >
                              <span>In-Active</span>
                            </button>
                          )}
                        </td>

                        <td className='whitespace-nowrap px-4  py-1.5 text-gray-700'>
                          <button className='ml-[8px]'>
                            <MdDeleteForever
                              className='cursor-pointer text-red-500 hover:text-red-300'
                              size={25}
                              onClick={() =>
                                handleDeleteWithdrawalTableRow(withDrawMethod)
                              }
                            />
                          </button>

                          <button
                            className='ml-[8px]'
                            onClick={() =>
                              handleWithDrawalUpdateModal(withDrawMethod)
                            }
                          >
                            <FiEdit
                              size={25}
                              className='cursor-pointer text-gray-500 hover:text-gray-300'
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <NoDataFound />
            )}
          </div>
          {/* pagination */}

          {totalData > 10 && (
            <Pagination
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              totalData={totalData}
            />
          )}

          {/* Show Expense Update Modal */}
          {openWithDrawalMethodModal && (
            <UpdateWithDrawal
              setOpenWithDrawalMethodModal={setOpenWithDrawalMethodModal}
              getWithDrawalMethodData={getWithDrawalMethodData}
              refetch={refetch}
              user={user}
            />
          )}
        </div>
      )}
    </>
  )
}

export default WithDrawalTable
