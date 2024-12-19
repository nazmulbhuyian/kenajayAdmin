import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { BASE_URL } from './../../utils/baseURL'
import MiniSpinner from '../../shared/MiniSpinner/MiniSpinner'

const AddCommission = ({ refetch, getInitialCommissionData }) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  

  const handleDataPost = async (data) => {
    setLoading(true)

    if (getInitialCommissionData?._id) {
      if (
        data?.seller_wise_commision === true &&
        data?.fixed_commision === true
      ) {
        toast.warn(
          'seller wise commission or fixed commission Either have to be false '
        )
        setLoading(false)
        return
      } else if (
        data?.seller_wise_commision === false &&
        data?.fixed_commision === false
      ) {
        toast.warn(
          'seller wise commission or fixed commission Either have to be true'
        )
        setLoading(false)
        return
      } else if (
        data?.fixed_commision === true &&
        data?.fixed_commision_rate === ''
      ) {
        toast.warn('You have to set fixed commission rate')
        setLoading(false)
        return
      } else if (
        data?.fixed_commision_rate &&
        (data?.fixed_commision_rate < 1 || data?.fixed_commision_rate > 100)
      ) {
        toast.warn(
          'fixed commision value must be getter than 0 and less then 100'
        )
        setLoading(false)
        return
      } else if (
        data?.default_commision_rate &&
        (data?.default_commision_rate < 1 || data?.default_commision_rate > 100)
      ) {
        toast.warn(
          'default commision value must be getter than 0 and less then 100'
        )
        setLoading(false)
        return
      } else {
        setLoading(true)
        try {
          const sendData = {
            _id: getInitialCommissionData?._id,

            seller_wise_commision: data?.seller_wise_commision,
            fixed_commision: data?.fixed_commision,
            fixed_commision_rate: data?.fixed_commision_rate,
            default_commision_rate: data?.default_commision_rate,
          }

          const response = await fetch(
            `${BASE_URL}/commision?role_type=commision_update`,
            {
              method: 'PATCH',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(sendData),
            }
          )
          const result = await response.json()
          if (result?.statusCode === 200 && result?.success === true) {
            toast.success(
              result?.message
                ? result?.message
                : 'Commission Update successfully',
              {
                autoClose: 1000,
              }
            )
            refetch()
            setLoading(false)
          } else {
            toast.error(result?.message || 'Something went wrong', {
              autoClose: 1000,
            })
            setLoading(false)
          }
        } catch (error) {
          toast.error(error?.message, {
            autoClose: 1000,
          })
          setLoading(false)
        } finally {
          setLoading(false)
        }
      }
    } else {
      if (
        data?.seller_wise_commision === true &&
        data?.fixed_commision === true
      ) {
        toast.warn(
          'seller wise commission or fixed commission Either have to be false '
        )
        setLoading(false)
        return
      } else if (
        data?.seller_wise_commision === false &&
        data?.fixed_commision === false
      ) {
        toast.warn(
          'seller wise commission or fixed commission Either have to be true'
        )
        setLoading(false)
        return
      } else if (
        data?.fixed_commision === true &&
        data?.fixed_commision_rate === ''
      ) {
        toast.warn('You have to set fixed commission rate')
        setLoading(false)
        return
      } else if (
        data?.fixed_commision_rate &&
        (data?.fixed_commision_rate < 1 || data?.fixed_commision_rate > 100)
      ) {
        toast.warn(
          'fixed commision value must be getter than 0 and less then 100'
        )
        setLoading(false)
        return
      } else if (
        data?.default_commision_rate &&
        (data?.default_commision_rate < 1 || data?.default_commision_rate > 100)
      ) {
        toast.warn(
          'default commision value must be getter than 0 and less then 100'
        )
        setLoading(false)
        return
      } else {
        setLoading(false)
        try {
          const sendData = {
            seller_wise_commision: data?.seller_wise_commision,
            fixed_commision: data?.fixed_commision,
            fixed_commision_rate: data?.fixed_commision_rate,
            default_commision_rate: data?.default_commision_rate,
          }

          const response = await fetch(
            `${BASE_URL}/commision?role_type=commision_create`,
            {
              method: 'POST',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(sendData),
            }
          )
          const result = await response.json()
          if (result?.statusCode === 200 && result?.success === true) {
            toast.success(
              result?.message
                ? result?.message
                : 'Commission Create successfully',
              {
                autoClose: 1000,
              }
            )
            refetch()
            setLoading(false)
          } else {
            toast.error(result?.message || 'Something went wrong', {
              autoClose: 1000,
            })
            setLoading(false)
          }
        } catch (error) {
          toast.error(error?.message, {
            autoClose: 1000,
          })
          setLoading(false)
        } finally {
          setLoading(false)
        }
      }
    }
  }

  return (
    <div className=''>
      <div className='bg-slate-50 rounded-lg shadow my-4 p-5'>
        <div className=' mt-4'>
          <h3
            className='text-[26px] font-bold text-gray-800 capitalize'
            id='modal-title'
          >
            Commission
          </h3>
        </div>
        <hr className='mt-2 mb-6' />

        <form onSubmit={handleSubmit(handleDataPost)} className=''>
          <div className=' bg-slate-50 rounded-lg shadow my-4'>
            {' '}
            <div className='px-2'>
              <div className='flex justify-between items-center mt-2'>
                <label className='block text-xs font-medium text-gray-700'>
                  Seller wise commission
                </label>
                <div className='whitespace-nowrap px-4 py-2 text-gray-700 '>
                  <label
                    htmlFor='seller_wise_commision'
                    className='inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800'
                  >
                    <span className='relative mt-2'>
                      <input
                        id='seller_wise_commision'
                        type='checkbox'
                        defaultChecked={
                          getInitialCommissionData?.seller_wise_commision
                        }
                        className='hidden peer'
                        {...register('seller_wise_commision')}
                      />
                      <div className='w-10 h-4 rounded-full shadow bg-slate-200 peer-checked:bg-bgBtnActive '></div>
                      <div className='absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primaryColor bg-white'></div>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className=' bg-slate-50 rounded-lg shadow my-4'>
            {' '}
            <div className='px-2'>
              <div className='flex justify-between items-center mt-2'>
                <label className='block text-xs font-medium text-gray-700'>
                  Fixed commission
                </label>
                <div className='whitespace-nowrap px-4 py-2 text-gray-700 '>
                  <label
                    htmlFor='fixed_commision'
                    className='inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800'
                  >
                    <span className='relative mt-2'>
                      <input
                        id='fixed_commision'
                        type='checkbox'
                        defaultChecked={
                          getInitialCommissionData?.fixed_commision
                        }
                        className='hidden peer'
                        {...register('fixed_commision')}
                      />
                      <div className='w-10 h-4 rounded-full shadow bg-slate-200 peer-checked:bg-bgBtnActive '></div>
                      <div className='absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primaryColor bg-white'></div>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-2'>
            <label
              htmlFor=''
              className='block text-xs font-medium text-gray-700'
            >
              Fixed commision rate ( Percentage rate will be 1-100 )
            </label>

            <input
              {...register('fixed_commision_rate', {
                // validate: (value) => {
                //   if (value < 1) {
                //     return 'value must be getter than 0'
                //   } else if (value > 100) {
                //     return 'value must be less then 100'
                //   }
                // },
              })}
              type='number'
              defaultValue={getInitialCommissionData?.fixed_commision_rate}
              placeholder='Percentage rate will be (1-100)'
              className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
            />
          </div>
          <div className='mt-2'>
            <label
              htmlFor=''
              className='block text-xs font-medium text-gray-700'
            >
              Default commision rate ( Percentage rate will be 1-100 )
            </label>

            <input
              {...register('default_commision_rate', {
                // validate: (value) => {
                //   if (value < 1) {
                //     return 'value must be getter than 0'
                //   } else if (value > 100) {
                //     return 'value must be less then 100'
                //   }
                // },
              })}
              type='number'
              defaultValue={getInitialCommissionData?.default_commision_rate}
              placeholder='Percentage rate will be (1-100)'
              className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
            />
          </div>

          <div className='flex gap-6 mt-6 justify-end'>
            {loading == true ? (
              <div className='px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded'>
                <MiniSpinner />
              </div>
            ) : (
              <>
                {getInitialCommissionData?._id ? (
                  <button
                    className='px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded'
                    type='submit'
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className='px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded'
                    type='submit'
                  >
                    Save
                  </button>
                )}
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCommission
