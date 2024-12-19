import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { BASE_URL } from '../../utils/baseURL'
import { toast } from 'react-toastify'
import { RxCross1 } from 'react-icons/rx'
import { RiImageAddFill } from 'react-icons/ri'
import MiniSpinner from '../../shared/MiniSpinner/MiniSpinner'

const AddSlider = ({ setOpenSliderCreateModal, refetch }) => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  //Image preview....
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // Handle Add Category
  const handleDataPost = async (data) => {
    console.log(data)

    setLoading(true)
    try {
      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'slider_image') {
          formData.append(key, data?.slider_image[0])
        } else {
          formData.append(key, value)
        }
      })

      const response = await fetch(
        `${BASE_URL}/slider?role_type=slider_create`,
        {
          method: 'POST',
          credentials: 'include',
          body: formData,
        }
      )
      const result = await response.json()
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : 'Slider created successfully',
          {
            autoClose: 1000,
          }
        )
        refetch()
        setLoading(false)
        setOpenSliderCreateModal(false)
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
  return (
    <div>
      <div>
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin'>
            <div className='flex items-center justify-between mt-4'>
              <h3
                className='text-[26px] font-bold text-gray-800 capitalize'
                id='modal-title '
              >
                Create Slider
              </h3>
              <button
                type='button'
                className='btn bg-white   p-1 absolute right-3 rounded-full top-3 hover:bg-bgBtnInactive hover:text-btnInactiveColor'
                onClick={() => setOpenSliderCreateModal(false)}
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
                  Slider Serial <span className='text-red-500'>*</span>
                </label>

                <input
                  {...register('slider_serial', {
                    required: 'Slider Serial is required',
                    validate: (value) => {
                      if (value < 1) {
                        return 'serial must be greater than 0'
                      }
                      // else if (value > 100) {
                      //   return 'Serial must be less then 100'
                      // }
                    },
                  })}
                  type='number'
                  placeholder='Slider Serial'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
                {errors.slider_serial && (
                  <p className='text-red-600'>
                    {errors.slider_serial?.message}
                  </p>
                )}
              </div>
              <div className='mt-4 grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-medium text-gray-700'>
                    Slider Status <span className='text-red-500'>*</span>
                  </label>
                  <select
                    {...register('slider_status', {
                      required: 'Slider Status is required',
                    })}
                    className='mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
                  >
                    <option value='active'>Active</option>
                    <option value='in-active'>In-Active</option>
                  </select>
                  {errors.slider_status && (
                    <p className='text-red-600'>
                      {errors.slider_status.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-xs font-medium text-gray-700'>
                    Slider Path <span className='text-red-500'>*</span>
                  </label>

                  <input
                    {...register('slider_path', {
                      required: 'Slider Path is required',
                    })}
                    type='text'
                    placeholder='Slider Path'
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                  {errors.slider_path && (
                    <p className='text-red-600'>
                      {errors.slider_path?.message}
                    </p>
                  )}
                </div>
              </div>
              <div className='mt-6'>
                {imagePreview ? (
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
                ) : (
                  <label
                    className='mt-4 w-full h-[160px] bg-gray-100 border-dashed border flex justify-center items-center rounded cursor-pointer'
                    htmlFor='slider_image'
                    type='button'
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
                )}
                <input
                  {...register('slider_image', {
                    required: 'Image is Required',
                    valiDate: {
                      isImage: (value) =>
                        (value[0] && value[0].type.startsWith('image/')) ||
                        'Only image files are allowed',
                    },
                  })}
                  accept='image/*'
                  type='file'
                  id='slider_image'
                  className='mt-2  sm:text-sm p-0.5 file:cursor-pointer file:bg-primaryColor file:text-white file:border-none file:rounded file:px-2 file:py-1.5'
                  onChange={handleImageChange}
                />
                <p className='text-xs text-[#C9CACA]  mt-1 text-end'>
                  Upload 300x300 pixel images in PNG, JPG, or WebP format (max 1
                  MB).
                </p>

                {errors.slider_image && (
                  <p className='text-red-600'>{errors.slider_image?.message}</p>
                )}
              </div>

              <div className='flex gap-8 mt-6 justify-end'>
                <button
                  className='px-10 py-2 border rounded hover:bg-bgBtnInactive hover:text-btnInactiveColor'
                  onClick={(event) => {
                    event.preventDefault() // Prevents form submission on Cancel
                    setOpenSliderCreateModal(false)
                  }}
                  type='button'
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

export default AddSlider
