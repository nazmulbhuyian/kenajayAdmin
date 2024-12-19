import { useState } from 'react'
import { useForm } from 'react-hook-form'
import MiniSpinner from './../../shared/MiniSpinner/MiniSpinner'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../utils/baseURL'
import SSlImg from './../../assets/PaymentImg/SSlImage.jpeg'
import Stripe from './../../assets/PaymentImg/stripe.jpeg'
import Bkash from './../../assets/PaymentImg/bkash.png'

const PaymentGetWay = ({ refetch, getInitialPaymentData }) => {
  const { register, handleSubmit } = useForm()
  const [sslLoading, setSslLoading] = useState(false)
  const [stripeLoading, setStripeLoading] = useState(false)
  const [bkashLoading, setBkashLoading] = useState(false)
  const [cashOnDelivery, setCashOnDelivery] = useState(
    getInitialPaymentData?.cash_on_delivery
      ? getInitialPaymentData?.cash_on_delivery
      : false
  )

  const handleSSlPost = async (data) => {
    setSslLoading(true)

    if (getInitialPaymentData?._id) {
      try {
        const sendData = {
          _id: getInitialPaymentData?._id,
          ssl_client_id: data?.ssl_client_id,
          ssl_client_secret: data?.ssl_client_secret,
          ssl_is_live: data?.ssl_is_live,
          ssl_status: data?.ssl_status,
        }

        const response = await fetch(
          `${BASE_URL}/payment_gateway?role_type=payment_update`,
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
            result?.message ? result?.message : 'Payment Update successfully',
            {
              autoClose: 1000,
            }
          )
          refetch()
          setSslLoading(false)
        } else {
          toast.error(result?.message || 'Something went wrong', {
            autoClose: 1000,
          })

          setSslLoading(false)
        }
      } catch (error) {
        toast.error(error?.message, {
          autoClose: 1000,
        })
        setSslLoading(false)
      } finally {
        setSslLoading(false)
      }
    } else {
      try {
        const sendData = {
          ssl_client_id: data?.ssl_client_id,
          ssl_client_secret: data?.ssl_client_secret,
          ssl_is_live: data?.ssl_is_live,
          ssl_status: data?.ssl_status,
        }

        const response = await fetch(
          `${BASE_URL}/payment_gateway?role_type=payment_create`,
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
            result?.message ? result?.message : 'Payment created successfully',
            {
              autoClose: 1000,
            }
          )
          refetch()
          setSslLoading(false)
        } else {
          toast.error(result?.message || 'Something went wrong', {
            autoClose: 1000,
          })

          setSslLoading(false)
        }
      } catch (error) {
        toast.error(error?.message, {
          autoClose: 1000,
        })
        setSslLoading(false)
      } finally {
        setSslLoading(false)
      }
    }
  }

  //Stripe data post...........

  const handleStripePost = async (data) => {
    setStripeLoading(true)

    if (getInitialPaymentData?._id) {
      try {
        const sendData = {
          _id: getInitialPaymentData?._id,
          // stripe_client_id: data?.stripe_client_id
          //   ? data?.stripe_client_id
          //   : getInitialPaymentData?.stripe_client_id,
          // stripe_client_secret: data?.stripe_client_secret
          //   ? data?.stripe_client_secret
          //   : getInitialPaymentData?.stripe_client_secret,
          // stripe_status: data?.stripe_status
          //   ? data?.stripe_status
          //   : getInitialPaymentData?.stripe_status,
          stripe_client_id: data?.stripe_client_id,
          stripe_client_secret: data?.stripe_client_secret,
          stripe_status: data?.stripe_status,
        }

        const response = await fetch(
          `${BASE_URL}/payment_gateway?role_type=payment_update`,
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
            result?.message ? result?.message : 'Payment Update successfully',
            {
              autoClose: 1000,
            }
          )
          refetch()
          setStripeLoading(false)
        } else {
          toast.error(result?.message || 'Something went wrong', {
            autoClose: 1000,
          })

          setStripeLoading(false)
        }
      } catch (error) {
        toast.error(error?.message, {
          autoClose: 1000,
        })
        setStripeLoading(false)
      } finally {
        setStripeLoading(false)
      }
    } else {
      try {
        const sendData = {
          stripe_client_id: data?.stripe_client_id,
          stripe_client_secret: data?.stripe_client_secret,
          stripe_status: data?.stripe_status,
        }

        const response = await fetch(
          `${BASE_URL}/payment_gateway?role_type=payment_create`,
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
            result?.message ? result?.message : 'Payment created successfully',
            {
              autoClose: 1000,
            }
          )
          refetch()
          setStripeLoading(false)
        } else {
          toast.error(result?.message || 'Something went wrong', {
            autoClose: 1000,
          })
          setStripeLoading(false)
        }
      } catch (error) {
        toast.error(error?.message, {
          autoClose: 1000,
        })

        setStripeLoading(false)
      } finally {
        setStripeLoading(false)
      }
    }
  }

  // Bkash Data post...........

  const handleBkashPost = async (data) => {
    setBkashLoading(true)
    if (getInitialPaymentData?._id) {
      try {
        const sendData = {
          _id: getInitialPaymentData?._id,
 
          bkash_key: data?.bkash_key,
          bkash_user_name: data?.bkash_user_name,
          bkash_password: data?.bkash_password,
          bkash_secret: data?.bkash_secret,
          bkash_status: data?.bkash_status,
          bkash_grant_token_url: data?.bkash_grant_token_url,
          bkash_execute_payment_url: data?.bkash_execute_payment_url,
          bkash_create_payment_url: data?.bkash_create_payment_url,
        }

        const response = await fetch(
          `${BASE_URL}/payment_gateway?role_type=payment_update`,
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
            result?.message ? result?.message : 'Payment Update successfully',
            {
              autoClose: 1000,
            }
          )
          refetch()
          setBkashLoading(false)
        } else {
          toast.error(result?.message || 'Something went wrong', {
            autoClose: 1000,
          })

          setBkashLoading(false)
        }
      } catch (error) {
        toast.error(error?.message, {
          autoClose: 1000,
        })
        setBkashLoading(false)
      } finally {
        setBkashLoading(false)
      }
    } else {
      try {
        const sendData = {
          bkash_key: data?.bkash_key,
          bkash_user_name: data?.bkash_user_name,
          bkash_password: data?.bkash_password,
          bkash_secret: data?.bkash_secret,
          bkash_status: data?.bkash_status,
          bkash_grant_token_url: data?.bkash_grant_token_url,
          bkash_execute_payment_url: data?.bkash_execute_payment_url,
          bkash_create_payment_url: data?.bkash_create_payment_url,
        }

        const response = await fetch(
          `${BASE_URL}/payment_gateway?role_type=payment_create`,
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
            result?.message ? result?.message : 'Payment created successfully',
            {
              autoClose: 1000,
            }
          )
          refetch()
          setBkashLoading(false)
        } else {
          toast.error(result?.message || 'Something went wrong', {
            autoClose: 1000,
          })
          setBkashLoading(false)
        }
      } catch (error) {
        toast.error(error?.message, {
          autoClose: 1000,
        })
        setBkashLoading(false)
      } finally {
        setBkashLoading(false)
      }
    }
  }

  //  Cash on Delivery....Post

  const handleToggle = () => {
    setCashOnDelivery((prev) => {
      const newValue = !prev
      handleCashOnDeliveryPost(newValue)
      return newValue
    })
  }
  const handleCashOnDeliveryPost = async (newValue) => {
    console.log(newValue)

    if (getInitialPaymentData?._id) {
      try {
        const sendData = {
          _id: getInitialPaymentData?._id,
          cash_on_delivery: newValue,
        }
        console.log(sendData)

        const response = await fetch(
          `${BASE_URL}/payment_gateway?role_type=payment_update`,
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
            result?.message ? result?.message : 'Payment Update successfully',
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
        // setCashOnLoading(false)
      }
    } else {
      try {
        const sendData = {
          cash_on_delivery: newValue,
        }

        const response = await fetch(
          `${BASE_URL}/payment_gateway?role_type=payment_create`,
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
              : 'Cash on Delivery created successfully',
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
        // setCashOnLoading(false)
      }
    }
  }

  return (
    <div>
      <div>
        <div className=' relative overflow-hidden text-left bg-white p-6'>
          <div className=' mt-4'>
            <h3
              className='text-[26px] font-bold text-gray-800 capitalize'
              id='modal-title'
            >
              Payment Getway
            </h3>
          </div>

          <hr className='mt-2 mb-6' />

          <div className=' bg-slate-50 rounded-lg shadow my-4'>
            {' '}
            <div className='px-2'>
              <div className='flex justify-between items-center mt-2'>
                <label className='block  text-gray-700 font-bold'>
                  Cash on Delivery
                </label>

                <div className='whitespace-nowrap px-4 py-2 text-gray-700'>
                  <label
                    htmlFor='CashOnDelivery1'
                    className='inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800'
                  >
                    <span className='relative mt-2'>
                      <input
                        id='CashOnDelivery1'
                        type='checkbox'
                        checked={cashOnDelivery}
                        className='hidden peer'
                        onChange={handleToggle}
                      />
                      <div className='w-10 h-4 rounded-full shadow bg-slate-200 peer-checked:bg-bgBtnActive'></div>
                      <div className='absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primaryColor bg-white'></div>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-5'>
            <div className='bg-slate-50 rounded-lg shadow-xl'>
              <div className='pt-4 px-4 flex justify-between'>
                <h4 className='font-semibold text-lg'>SSL</h4>
                <img src={SSlImg} alt='' />
              </div>
              <hr className='mt-1 mx-4' />
              <form onSubmit={handleSubmit(handleSSlPost)} className='p-4'>
                <div className=''>
                  <div>
                    <label
                      htmlFor=''
                      className='block text-xs font-medium text-gray-700'
                    >
                      SSl Client Id
                    </label>
                    <input
                      {...register('ssl_client_id')}
                      type='text'
                      defaultValue={getInitialPaymentData?.ssl_client_id}
                      placeholder='SSl Client Id'
                      className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=''
                      className='block text-xs font-medium text-gray-700 mt-2'
                    >
                      SSl Client Secret
                    </label>
                    <input
                      {...register('ssl_client_secret')}
                      type='text'
                      defaultValue={getInitialPaymentData?.ssl_client_secret}
                      placeholder='SSl Client Secret'
                      className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                    />
                  </div>
                  <div>
                    <label className='block text-xs font-medium text-gray-700 mt-2'>
                      SSl Status
                    </label>
                    <select
                      {...register('ssl_status')}
                      className='mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
                      defaultValue={getInitialPaymentData?.ssl_status}
                    >
                      <option value='active'>Active</option>
                      <option value='in-active'>In-Active</option>
                    </select>
                  </div>
                  <div className='flex justify-between items-center mt-2 '>
                    <label className='block text-xs  text-gray-700 font-bold'>
                      SSL is Live
                    </label>
                    <div className='whitespace-nowrap px-4 py-2 text-gray-700 '>
                      <label
                        htmlFor='SSL1'
                        className='inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800'
                      >
                        <span className='relative mt-2'>
                          <input
                            {...register('ssl_is_live')}
                            id='SSL1'
                            type='checkbox'
                            defaultChecked={getInitialPaymentData?.ssl_is_live}
                            className='hidden peer'
                          />
                          <div className='w-10 h-4 rounded-full shadow bg-slate-200 peer-checked:bg-bgBtnActive '></div>
                          <div className='absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primaryColor bg-white'></div>
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className='flex gap-6 mt-2 justify-end'>
                    {sslLoading == true ? (
                      <div className='px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded'>
                        <MiniSpinner />
                      </div>
                    ) : (
                      <>
                        {getInitialPaymentData?._id ? (
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
                </div>
              </form>
            </div>

            {/* 2nd div */}
            <div className='bg-slate-50 rounded-lg shadow-xl'>
              <div className='pt-4 px-4 flex justify-between'>
                <h4 className='font-semibold text-lg'>Stripe</h4>
                <img src={Stripe} alt='' />
              </div>
              <hr className='mt-1 mx-4' />
              <form onSubmit={handleSubmit(handleStripePost)} className='p-4'>
                <div className=''>
                  <div>
                    <label
                      htmlFor=''
                      className='block text-xs font-medium text-gray-700'
                    >
                      Stripe Client Id
                    </label>
                    <input
                      {...register('stripe_client_id')}
                      type='text'
                      defaultValue={getInitialPaymentData?.stripe_client_id}
                      placeholder='Stripe Client Id'
                      className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=''
                      className='block text-xs font-medium text-gray-700 mt-2'
                    >
                      Stripe Client Secret
                    </label>
                    <input
                      {...register('stripe_client_secret')}
                      type='text'
                      defaultValue={getInitialPaymentData?.stripe_client_secret}
                      placeholder='Stripe Client Secret'
                      className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                    />
                  </div>
                  <div>
                    <label className='block text-xs font-medium text-gray-700 mt-2'>
                      Stripe Status
                    </label>
                    <select
                      {...register('stripe_status')}
                      className='mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
                      defaultValue={getInitialPaymentData?.stripe_status}
                    >
                      <option value='active'>Active</option>
                      <option value='in-active'>In-Active</option>
                    </select>
                  </div>

                  <div className='flex gap-6 mt-6 justify-end'>
                    {stripeLoading == true ? (
                      <div className='px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded'>
                        <MiniSpinner />
                      </div>
                    ) : (
                      <>
                        {getInitialPaymentData?._id ? (
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
                </div>
              </form>
            </div>
            <div className='bg-slate-50 rounded-lg shadow-xl'>
              <div className='pt-4 px-4 flex justify-between'>
                <h4 className='font-semibold text-lg'>Bkash</h4>
                <img src={Bkash} alt='' className='object-contain ' />
              </div>
              <hr className='mt-1 mx-4' />
              <form onSubmit={handleSubmit(handleBkashPost)} className='p-4'>
                <div className=''>
                  <div>
                    <label
                      htmlFor=''
                      className='block text-xs font-medium text-gray-700'
                    >
                      Bkash Key
                    </label>
                    <input
                      {...register('bkash_key')}
                      type='text'
                      defaultValue={getInitialPaymentData?.bkash_key}
                      placeholder='Bkash Key'
                      className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=''
                      className='block text-xs font-medium text-gray-700 mt-2'
                    >
                      Bkash User Name
                    </label>
                    <input
                      {...register('bkash_user_name')}
                      type='text'
                      defaultValue={getInitialPaymentData?.bkash_user_name}
                      placeholder=' Bkash User Name'
                      className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=''
                      className='block text-xs font-medium text-gray-700 mt-2'
                    >
                      Bkash Password
                    </label>
                    <input
                      {...register('bkash_password')}
                      type='text'
                      placeholder='Bkash Password'
                      defaultValue={getInitialPaymentData?.bkash_password}
                      className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=''
                      className='block text-xs font-medium text-gray-700 mt-2'
                    >
                      Bkash Secret
                    </label>
                    <input
                      {...register('bkash_secret')}
                      type='text'
                      placeholder='Bkash Secret'
                      defaultValue={getInitialPaymentData?.bkash_secret}
                      className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=''
                      className='block text-xs font-medium text-gray-700 mt-2'
                    >
                      Bkash Grant Token URL
                    </label>
                    <input
                      {...register('bkash_grant_token_url')}
                      type='text'
                      placeholder='Bkash Grant Token Url'
                      defaultValue={
                        getInitialPaymentData?.bkash_grant_token_url
                      }
                      className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=''
                      className='block text-xs font-medium text-gray-700 mt-2'
                    >
                      Bkash Create Payment URL
                    </label>
                    <input
                      {...register('bkash_create_payment_url')}
                      type='text'
                      placeholder='Bkash Create Payment URL'
                      defaultValue={
                        getInitialPaymentData?.bkash_create_payment_url
                      }
                      className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                    />
                  </div>
                  <div>
                    <label
                      htmlFor=''
                      className='block text-xs font-medium text-gray-700 mt-2'
                    >
                      Bkash Verify Payment URL
                    </label>
                    <input
                      {...register('bkash_execute_payment_url')}
                      type='text'
                      placeholder='Bkash Verify Payment URL'
                      defaultValue={
                        getInitialPaymentData?.bkash_execute_payment_url
                      }
                      className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                    />
                  </div>
                  <div>
                    <label className='block text-xs font-medium text-gray-700 mt-2'>
                      Bkash Status
                    </label>
                    <select
                      {...register('bkash_status')}
                      defaultValue={getInitialPaymentData?.bkash_status}
                      className='mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
                    >
                      <option value='active'>Active</option>
                      <option value='in-active'>In-Active</option>
                    </select>
                  </div>

                  <div className='flex gap-6 mt-6 justify-end'>
                    {bkashLoading == true ? (
                      <div className='px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded'>
                        <MiniSpinner />
                      </div>
                    ) : (
                      <>
                        {getInitialPaymentData?._id ? (
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
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentGetWay
