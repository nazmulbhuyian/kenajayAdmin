import { useState } from 'react'
import { useForm } from 'react-hook-form'
import MiniSpinner from '../../shared/MiniSpinner/MiniSpinner'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../utils/baseURL'

const ShippingConFig = ({ refetch, getShippingConfiguration }) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const handleDataPost = async (data) => {
    setLoading(true)

    if (getShippingConfiguration?._id) {
      if (data?.area_wise_delivery === true && data?.fixed_delivery === true) {
        toast.warn(
          'Area wise delivery or Fixed Delivery Either have to be false'
        )
        setLoading(false)
        return
      } else if (
        data?.fixed_delivery === true &&
        data?.fixed_delivery_charge === ''
      ) {
        toast.warn('You have to set Fixed Delivery Charge')
        setLoading(false)
        return
      } else {
        try {
          const sendData = {
            _id: getShippingConfiguration?._id,
            area_wise_delivery: data?.area_wise_delivery,
            fixed_delivery: data?.fixed_delivery,
            product_wise_delivery: data?.product_wise_delivery,
            fixed_delivery_charge: data?.fixed_delivery_charge,
          }

          const response = await fetch(
            `${BASE_URL}/shipping_configuration?role_type=shipping_configuration_update`,
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
      if (data?.area_wise_delivery === true && data?.fixed_delivery === true) {
        toast.warn(
          'Area wise delivery or Fixed Delivery Either have to be false'
        )
        setLoading(false)
        return
      } else if (
        data?.fixed_delivery === true &&
        data?.fixed_delivery_charge === ''
      ) {
        toast.warn('You have to set Fixed Delivery Charge')
        setLoading(false)
        return
      } else {
        setLoading(true)
        try {
          const sendData = {
            area_wise_delivery: data?.area_wise_delivery,
            fixed_delivery: data?.fixed_delivery,
            product_wise_delivery: data?.product_wise_delivery,
            fixed_delivery_charge: data?.fixed_delivery_charge,
          }

          const response = await fetch(
            `${BASE_URL}/shipping_configuration?role_type=shipping_configuration_create`,
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
            Shipping Configuration
          </h3>
        </div>
        <hr className='mt-2 mb-6' />

        <form onSubmit={handleSubmit(handleDataPost)} className=''>
          <div className=' bg-slate-50 rounded-lg shadow my-4'>
            {' '}
            <div className='px-2'>
              <div className='flex justify-between items-center mt-2'>
                <label className='block text-xs font-medium text-gray-700'>
                  Area Wise Delivery
                </label>
                <div className='whitespace-nowrap px-4 py-2 text-gray-700 '>
                  <label
                    htmlFor='area_wise_delivery'
                    className='inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800'
                  >
                    <span className='relative mt-2'>
                      <input
                        id='area_wise_delivery'
                        type='checkbox'
                        defaultChecked={
                          getShippingConfiguration?.area_wise_delivery
                        }
                        className='hidden peer'
                        {...register('area_wise_delivery')}
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
                  Fixed Delivery
                </label>
                <div className='whitespace-nowrap px-4 py-2 text-gray-700 '>
                  <label
                    htmlFor='fixed_delivery'
                    className='inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800'
                  >
                    <span className='relative mt-2'>
                      <input
                        id='fixed_delivery'
                        type='checkbox'
                        defaultChecked={
                          getShippingConfiguration?.fixed_delivery
                        }
                        className='hidden peer'
                        {...register('fixed_delivery')}
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
                  Product Wise Delivery
                </label>
                <div className='whitespace-nowrap px-4 py-2 text-gray-700 '>
                  <label
                    htmlFor='product_wise_delivery'
                    className='inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800'
                  >
                    <span className='relative mt-2'>
                      <input
                        id='product_wise_delivery'
                        type='checkbox'
                        defaultChecked={
                          getShippingConfiguration?.product_wise_delivery
                        }
                        className='hidden peer'
                        {...register('product_wise_delivery')}
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
              Fixed Delivery Charge
            </label>

            <input
              {...register('fixed_delivery_charge', {
                // validate: (value) => {
                //   if (value < 1) {
                //     return 'value must be getter than 0'
                //   }
                // },
              })}
              type='number'
              defaultValue={getShippingConfiguration?.fixed_delivery_charge}
              placeholder='Enter Fixed Delivery Amount'
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
                {getShippingConfiguration?._id ? (
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

export default ShippingConFig
