import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiImageAddFill } from 'react-icons/ri'
import { RxCross1 } from 'react-icons/rx'
import MiniSpinner from './../../shared/MiniSpinner/MiniSpinner'
import { BASE_URL } from './../../utils/baseURL'
import { toast } from 'react-toastify'

const UpdateWithDrawal = ({
  setOpenWithDrawalMethodModal,
  getWithDrawalMethodData,
  refetch,
  
}) => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // show Brand image Preview in state
  const [imagePreview, setImagePreview] = useState(
    getWithDrawalMethodData?.payment_method_image
  )

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }
  console.log(getWithDrawalMethodData)
  // Handle Update Withdrawal
  const handleDataPost = async (data) => {
    if (data?.payment_method_image[0]) {
      setLoading(true)
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'payment_method_image') {
          formData.append(key, data?.payment_method_image[0])
        } else formData.append(key, value)
      })
      formData.append('_id', getWithDrawalMethodData?._id)
      formData.append(
        'payment_method_image_key',
        getWithDrawalMethodData?.payment_method_image_key
      )

      const response = await fetch(
        `${BASE_URL}/payment_method?role_type=_update`,
        {
          method: 'PATCH',
          credentials: 'include',
          body: formData,
        }
      )
      const result = await response.json()
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : 'Withdrawal update successfully',
          {
            autoClose: 1000,
          }
        )
        refetch()
        setLoading(false)
        setOpenWithDrawalMethodModal(false)
      } else {
        toast.error(result?.message || 'Something went wrong', {
          autoClose: 1000,
        })
        setLoading(false)
      }
    } else {
      setLoading(true)
      const sendData = {
        _id: getWithDrawalMethodData?._id,

        payment_method: data?.payment_method
          ? data?.payment_method
          : getWithDrawalMethodData?.payment_method,
        minimum_withdrow_amount: data?.minimum_withdrow_amount
          ? data?.minimum_withdrow_amount
          : getWithDrawalMethodData?.minimum_withdrow_amount,

        payment_method_status: data?.payment_method_status
          ? data?.payment_method_status
          : getWithDrawalMethodData?.payment_method_status,

        payment_method_image_key:
          getWithDrawalMethodData?.payment_method_image_key,
      }
      const response = await fetch(
        `${BASE_URL}/payment_method?role_type=_update`,
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
          result?.message ? result?.message : 'Withdrawal update successfully',
          {
            autoClose: 1000,
          }
        )
        refetch()
        setLoading(false)
        setOpenWithDrawalMethodModal(false)
      } else {
        toast.error(result?.message || 'Something went wrong', {
          autoClose: 1000,
        })
        setLoading(false)
      }
    }
  }
  return (
    <div>
      <div>
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[750px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin'>
            <div className='flex items-center justify-between mt-4'>
              <h3
                className='text-[26px] font-bold text-gray-800 capitalize'
                id='modal-title'
              >
                Update Withdrawal
              </h3>
              <button
                type='button'
                className='btn bg-white hover:bg-bgBtnInactive hover:text-btnInactiveColor  p-1 absolute right-3 rounded-full top-3'
                onClick={() => setOpenWithDrawalMethodModal(false)}
              >
                {' '}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className='mt-2 mb-6' />

            <form onSubmit={handleSubmit(handleDataPost)} className=''>
              <div>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Payment Method Name
                </label>

                <input
                  {...register('payment_method')}
                  type='text'
                  defaultValue={getWithDrawalMethodData?.payment_method}
                  placeholder=' Payment Method Name'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>

              <div className='mt-2'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Minimum Withdraw Amount
                </label>

                <input
                  {...register('minimum_withdrow_amount', {
                    validate: (value) => {
                      if (value < 1) {
                        return 'Amount must be getter than 0'
                      }
                      // else if (value > 100) {
                      //   return 'Serial must be less then 100'
                      // }
                    },
                  })}
                  defaultValue={
                    getWithDrawalMethodData?.minimum_withdrow_amount
                  }
                  type='number'
                  placeholder='Minimum Withdraw Amount'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-2'>
                <label className='block text-xs font-medium text-gray-700'>
                  Payment Method Status
                </label>
                <select
                  {...register('payment_method_status')}
                  className='mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
                  defaultValue={getWithDrawalMethodData?.payment_method_status}
                >
                  <option value='active'>Active</option>
                  <option value='in-active'>In-Active</option>
                </select>
              </div>
              <div className='mt-6'>
                {imagePreview ? (
                  <>
                    <div className='relative'>
                      <button
                        type='button'
                        className='btn bg-bgBtnInactive border p-1 absolute right-1 rounded-full top-1 text-btnInactiveColor '
                        onClick={() => setImagePreview(false)}
                      >
                        {' '}
                        <RxCross1 size={15}></RxCross1>
                      </button>

                      <img
                        src={imagePreview}
                        alt='Preview'
                        className='w-full h-64 object-cover my-2 rounded '
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <label
                      className='mt-4 w-full h-[160px] bg-gray-100 border-dashed border flex justify-center items-center rounded cursor-pointer'
                      htmlFor='payment_method_image'
                    >
                      <div className='flex flex-col items-center justify-center '>
                        <div>
                          <RiImageAddFill size={25} />
                        </div>
                        <p className='mt-2 text-[#C9CACA]' type=''>
                          upload image
                        </p>
                      </div>
                    </label>
                  </>
                )}
                <input
                  {...register('payment_method_image', {
                    valiDate: {
                      isImage: (value) =>
                        (value[0] && value[0].type.startsWith('image/')) ||
                        'Only image files are allowed',
                    },
                  })}
                  accept='image/*'
                  type='file'
                  id='payment_method_image'
                  className='mt-1 sm:text-sm p-0.5 file:cursor-pointer file:bg-primaryColor file:text-white file:border-none file:rounded file:px-2 file:py-1.5'
                  onChange={handleImageChange}
                />
                <p className='text-xs text-[#C9CACA]  mt-1 text-end'>
                  Upload 300x300 pixel images in PNG, JPG, or WebP format (max 1
                  MB).
                </p>
                {errors.brand_logo && (
                  <p className='text-red-600'>{errors.brand_logo?.message}</p>
                )}
              </div>
              <div className='flex gap-6 mt-6 justify-end'>
                <button
                  className='px-10 py-2 border rounded hover:bg-bgBtnInactive hover:text-btnInactiveColor'
                  onClick={() => setOpenWithDrawalMethodModal(false)}
                >
                  Cancel
                </button>
                {loading == true ? (
                  <div className='px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded'>
                    <MiniSpinner />
                  </div>
                ) : (
                  <button
                    className='px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded'
                    type='submit'
                  >
                    Create
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

export default UpdateWithDrawal
