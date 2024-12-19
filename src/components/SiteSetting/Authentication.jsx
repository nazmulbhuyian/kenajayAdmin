import { useState } from 'react'
import MiniSpinner from './../../shared/MiniSpinner/MiniSpinner'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { BASE_URL } from './../../utils/baseURL'

const Authentication = ({ refetch, initialAuthenticationData }) => {
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleDataPost = async (data) => {
    setLoading(true)
    if (initialAuthenticationData) {
      try {
        const sendData = {
          _id: initialAuthenticationData?._id,

          // google_client_id: data?.google_client_id
          //   ? data?.google_client_id
          //   : initialSettingsData?.google_client_id,
          // google_client_secret: data?.google_client_secret
          //   ? data?.google_client_secret
          //   : initialSettingsData?.google_client_secret,
          // facebook_client_id: data?.facebook_client_id
          //   ? data?.facebook_client_id
          //   : initialSettingsData?.facebook_client_id,
          // facebook_client_secret: data?.facebook_client_secret
          //   ? data?.facebook_client_secret
          //   : initialSettingsData?.facebook_client_secret,
          google_client_id: data?.google_client_id,
          google_client_secret: data?.google_client_secret,
          facebook_client_id: data?.facebook_client_id,
          facebook_client_secret: data?.facebook_client_secret,
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
      // ..........

      try {
        const sendData = {
          google_client_id: data?.google_client_id,
          google_client_secret: data?.google_client_secret,
          facebook_client_id: data?.facebook_client_id,
          facebook_client_secret: data?.facebook_client_secret,
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
                Authentication
              </h3>
            </div>

            <hr className='mt-2 mb-6' />

            <form onSubmit={handleSubmit(handleDataPost)} className=''>
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label
                    htmlFor=''
                    className='block text-xs font-medium text-gray-700'
                  >
                    Google Client Id
                  </label>
                  <input
                    {...register('google_client_id')}
                    defaultValue={initialAuthenticationData?.google_client_id}
                    type='text'
                    placeholder='Google Client Id'
                    disabled={!isEditing}
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                </div>
                <div>
                  <label
                    htmlFor=''
                    className='block text-xs font-medium text-gray-700'
                  >
                    Google Client secret
                  </label>
                  <input
                    {...register('google_client_secret')}
                    defaultValue={initialAuthenticationData?.google_client_secret}
                    type='text'
                    disabled={!isEditing}
                    placeholder='Google Client Secret'
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                </div>
                <div>
                  <label
                    htmlFor=''
                    className='block text-xs font-medium text-gray-700'
                  >
                    Facebook Client Id
                  </label>
                  <input
                    {...register('facebook_client_id')}
                    defaultValue={initialAuthenticationData?.facebook_client_id}
                    type='text'
                    disabled={!isEditing}
                    placeholder='Facebook Client Id'
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                </div>
                <div>
                  <label
                    htmlFor=''
                    className='block text-xs font-medium text-gray-700'
                  >
                    Facebook Client secret
                  </label>
                  <input
                    {...register('facebook_client_secret')}
                    defaultValue={initialAuthenticationData?.facebook_client_secret}
                    type='text'
                    disabled={!isEditing}
                    placeholder=' Facebook Client secret'
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

export default Authentication
