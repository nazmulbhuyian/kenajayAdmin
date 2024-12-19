import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BASE_URL } from '../../utils/baseURL'
import { toast } from 'react-toastify'
import MiniSpinner from '../../shared/MiniSpinner/MiniSpinner'

const EmailCredential = ({ refetch, initialAuthenticationData }) => {
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleDataPost = async (data) => {
    setLoading(true)

    if (initialAuthenticationData?._id) {
      try {
        const sendData = {
          _id: initialAuthenticationData?._id,

          otp_email_secure: data?.otp_email_secure,
          otp_email_host: data?.otp_email_host,
          otp_email_port: data?.otp_email_port,
          otp_email_user: data?.otp_email_user,
          otp_email_password: data?.otp_email_password,
          otp_email_from: data?.otp_email_from,
          otp_email_subject: data?.otp_email_subject,
          otp_email_text: data?.otp_email_text,
          otp_email_html: data?.otp_email_html,
        }

        const response = await fetch(
          `${BASE_URL}/authentication?role_type=authentication_create`,
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
              : 'Authentication Update successfully',
            {
              autoClose: 1000,
            }
          )

          refetch()
          setLoading(false)
          setIsEditing(false)
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
    } else {
      try {
        const sendData = {
          otp_email_secure: data?.otp_email_secure,
          otp_email_host: data?.otp_email_host,
          otp_email_port: data?.otp_email_port,
          otp_email_user: data?.otp_email_user,
          otp_email_password: data?.otp_email_password,
          otp_email_from: data?.otp_email_from,
          otp_email_subject: data?.otp_email_subject,
          otp_email_text: data?.otp_email_text,
          otp_email_html: data?.otp_email_html,
        }
        console.log(sendData)

        const response = await fetch(
          `${BASE_URL}/authentication?role_type=authentication_create`,
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
              : 'Authentication created successfully',
            {
              autoClose: 1000,
            }
          )

          refetch()
          setLoading(false)
          setIsEditing(false)
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
  return (
    <div>
      {' '}
      <div>
        <div>
          <div className='relative overflow-hidden text-left bg-white rounded-lg shadow-xl  p-6'>
            <div className=' mt-4'>
              <h3
                className='text-[26px] font-bold text-gray-800 capitalize'
                id='modal-title'
              >
                OTP By Email Credential
              </h3>
            </div>

            <hr className='mt-2 mb-6' />

            <form onSubmit={handleSubmit(handleDataPost)} className=''>
              <div className=' bg-slate-50 rounded-lg shadow my-4'>
                {' '}
                <div className='px-2'>
                  <div className='flex justify-between items-center mt-2'>
                    <label className='block text-xs font-medium text-gray-700'>
                      Otp Email Secure
                    </label>
                    <div className='whitespace-nowrap px-4 py-2 text-gray-700 '>
                      <label
                        htmlFor='EmailSecure'
                        className='inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800'
                      >
                        <span className='relative mt-2'>
                          <input
                            id='EmailSecure'
                            type='checkbox'
                            disabled={!isEditing}
                            defaultChecked={
                              initialAuthenticationData?.otp_email_secure
                            }
                            className='hidden peer'
                            {...register('otp_email_secure')}
                          />
                          <div className='w-10 h-4 rounded-full shadow bg-slate-200 peer-checked:bg-bgBtnActive '></div>
                          <div className='absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primaryColor bg-white'></div>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label
                    htmlFor=''
                    className='block text-xs font-medium text-gray-700'
                  >
                    Otp Email Host
                  </label>
                  <input
                    {...register('otp_email_host')}
                    defaultValue={initialAuthenticationData?.otp_email_host}
                    type='text'
                    placeholder='Otp Email Host'
                    disabled={!isEditing}
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                </div>
                <div>
                  <label
                    htmlFor=''
                    className='block text-xs font-medium text-gray-700'
                  >
                    Otp Email Port
                  </label>
                  <input
                    {...register('otp_email_port', {
                      validate: (value) => {
                        if (value < 1) {
                          return 'Offer greater than 0'
                        }
                        // else if (value > 100) {
                        //   return 'Serial must be less then 100'
                        // }
                      },
                    })}
                    defaultValue={initialAuthenticationData?.otp_email_port}
                    type='number'
                    disabled={!isEditing}
                    placeholder='Otp Email Port'
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                </div>
                <div>
                  <label
                    htmlFor=''
                    className='block text-xs font-medium text-gray-700'
                  >
                    Otp Email User
                  </label>
                  <input
                    {...register('otp_email_user')}
                    defaultValue={initialAuthenticationData?.otp_email_user}
                    type='text'
                    disabled={!isEditing}
                    placeholder='Otp Email User'
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                </div>
                <div>
                  <label
                    htmlFor=''
                    className='block text-xs font-medium text-gray-700'
                  >
                    Otp Email Password
                  </label>
                  <input
                    {...register('otp_email_password')}
                    defaultValue={initialAuthenticationData?.otp_email_password}
                    type='text'
                    disabled={!isEditing}
                    placeholder='Otp Email Password'
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                </div>
                <div>
                  <label
                    htmlFor=''
                    className='block text-xs font-medium text-gray-700'
                  >
                    Otp Email Form
                  </label>
                  <input
                    {...register('otp_email_from')}
                    defaultValue={initialAuthenticationData?.otp_email_from}
                    type='text'
                    disabled={!isEditing}
                    placeholder='Otp Email Form'
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                </div>
                <div>
                  <label
                    htmlFor=''
                    className='block text-xs font-medium text-gray-700'
                  >
                    Otp Email Subject
                  </label>
                  <input
                    {...register('otp_email_subject')}
                    defaultValue={initialAuthenticationData?.otp_email_subject}
                    type='text'
                    disabled={!isEditing}
                    placeholder='Otp Email Subject'
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                </div>
                <div>
                  <label
                    htmlFor=''
                    className='block text-xs font-medium text-gray-700'
                  >
                    Otp Email Text
                  </label>
                  <input
                    {...register('otp_email_text')}
                    defaultValue={initialAuthenticationData?.otp_email_text}
                    type='text'
                    disabled={!isEditing}
                    placeholder='Otp Email Text'
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                </div>
                <div>
                  <label
                    htmlFor=''
                    className='block text-xs font-medium text-gray-700'
                  >
                    Otp Email Html
                  </label>
                  <input
                    {...register('otp_email_html')}
                    defaultValue={initialAuthenticationData?.otp_email_html}
                    type='text'
                    disabled={!isEditing}
                    placeholder='Otp Email Html'
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                </div>
              </div>

              <div className='flex gap-6 mt-6 justify-end'>
                {isEditing === true ? (
                  <>
                    <button
                      className='px-10 py-2 border rounded hover:bg-bgBtnInactive hover:text-btnInactiveColor'
                      type='button'
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    {loading == true ? (
                      <div className='px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded'>
                        <MiniSpinner />
                      </div>
                    ) : (
                      <>
                        {initialAuthenticationData ? (
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
                            Create
                          </button>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <button
                    className='px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded'
                    type='button'
                    onClick={() => setIsEditing(true)}
                  >
                    Edit
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailCredential
