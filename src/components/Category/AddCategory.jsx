import { RxCross1 } from 'react-icons/rx'
import { RiImageAddFill } from 'react-icons/ri'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { generateSlug } from '../../utils/generateSlug'
import MiniSpinner from '../../shared/MiniSpinner/MiniSpinner'
import { toast } from 'react-toastify'
import { BASE_URL } from './../../utils/baseURL'

const AddCategory = ({ setCategoryCreateModal, refetch, user }) => {
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

  // get token
  // const token = getCookie(authKey);
  // Handle Add Category
  const handleDataPost = async (data) => {
    setLoading(true)
    try {
      const category_slug = generateSlug(data?.category_name)

      const formData = new FormData()

      Object.entries(data).forEach(([key, value]) => {
        if (key === 'category_logo') {
          formData.append(key, data?.category_logo[0])
        } else {
          formData.append(key, value)
        }
      })

      formData.append('category_slug', category_slug)
      formData.append('category_publisher_id', user?._id)

      const response = await fetch(
        `${BASE_URL}/category?role_type=category_create`,
        {
          method: 'POST',
          credentials: 'include',
          body: formData,
        }
      )
      const result = await response.json()
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : 'Category created successfully',
          {
            autoClose: 1000,
          }
        )
        refetch()
        setLoading(false)
        setCategoryCreateModal(false)
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
                Create Category
              </h3>
              <button
                type='button'
                className='btn bg-white   p-1 absolute right-3 rounded-full top-3 hover:bg-bgBtnInactive hover:text-btnInactiveColor'
                onClick={() => setCategoryCreateModal(false)}
              >
                {' '}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className='mt-2 mb-6' />

            <form onSubmit={handleSubmit(handleDataPost)} className=''>
              <div>
                <label
                  htmlFor='UserEmail'
                  className='block text-xs font-medium text-gray-700'
                >
                  Category Name <span className='text-red-500'>*</span>
                </label>

                <input
                  {...register('category_name', {
                    required: 'category name is required',
                  })}
                  type='text'
                  placeholder='Category Name'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
                {errors.category_name && (
                  <p className='text-red-600'>
                    {errors.category_name?.message}
                  </p>
                )}
              </div>
              <div className='mt-4 grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-xs font-medium text-gray-700'>
                    Category Status <span className='text-red-500'>*</span>
                  </label>
                  <select
                    {...register('category_status', {
                      required: 'Category Status is required',
                    })}
                    className='mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
                  >
                    <option value='active'>Active</option>
                    <option value='in-active'>In-Active</option>
                  </select>
                  {errors.category_status && (
                    <p className='text-red-600'>
                      {errors.category_status.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-xs font-medium text-gray-700'>
                    Category serial <span className='text-red-500'>*</span>
                  </label>

                  <input
                    {...register('category_serial', {
                      required: 'category Serial is required',
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
                    placeholder='Type Number'
                    className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                  />
                  {errors.category_serial && (
                    <p className='text-red-600'>
                      {errors.category_serial?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-xs font-medium text-gray-700'>
                    Explore Category show
                  </label>
                  <div className='whitespace-nowrap px-4 py-2 text-gray-700 '>
                    <label
                      htmlFor='Toggle3'
                      className='inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800'
                    >
                      <span className='relative mt-2'>
                        <input
                          id='Toggle3'
                          type='checkbox'
                          className='hidden peer '
                          {...register('explore_category_show')}
                        />
                        <div className='w-10 h-4 rounded-full shadow bg-slate-200 peer-checked:bg-bgBtnActive '></div>
                        <div className='absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primaryColor bg-white'></div>
                      </span>
                    </label>
                  </div>
                  {errors.explore_category_show && (
                    <p className='text-red-600'>
                      {errors.explore_category_show?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className='block text-xs font-medium text-gray-700'>
                    Feature Category show
                  </label>
                  <div className='whitespace-nowrap px-4 py-2 text-gray-700 '>
                    <label
                      htmlFor='Toggle4'
                      className='inline-flex items-center space-x-4 cursor-pointer dark:text-gray-800'
                    >
                      <span className='relative mt-2'>
                        <input
                          id='Toggle4'
                          type='checkbox'
                          className='hidden peer'
                          {...register('feature_category_show')}
                        />
                        <div className='w-10 h-4 rounded-full shadow bg-slate-200 peer-checked:bg-bgBtnActive '></div>
                        <div className='absolute left-0 w-6 h-6 rounded-full shadow -inset-y-1 peer-checked:right-0 peer-checked:left-auto peer-checked:bg-primaryColor bg-white'></div>
                      </span>
                    </label>
                  </div>
                  {errors.feature_category_show && (
                    <p className='text-red-600'>
                      {errors.feature_category_show?.message}
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
                    htmlFor='category_logo'
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
                  {...register('category_logo', {
                    required: 'Image is Required',
                    valiDate: {
                      isImage: (value) =>
                        (value[0] && value[0].type.startsWith('image/')) ||
                        'Only image files are allowed',
                    },
                  })}
                  accept='image/*'
                  type='file'
                  id='category_logo'
                  className='mt-2  sm:text-sm p-0.5 file:cursor-pointer file:bg-primaryColor file:text-white file:border-none file:rounded file:px-2 file:py-1.5'
                  onChange={handleImageChange}
                />
                <p className='text-xs text-[#C9CACA]  mt-1 text-end'>
                  Upload 300x300 pixel images in PNG, JPG, or WebP format (max 1
                  MB).
                </p>

                {errors.category_logo && (
                  <p className='text-red-600'>
                    {errors.category_logo?.message}
                  </p>
                )}
              </div>

              <div className='flex gap-8 mt-6 justify-end'>
                <button
                  className='px-10 py-2 border rounded hover:bg-bgBtnInactive hover:text-btnInactiveColor'
                  onClick={(event) => {
                    event.preventDefault() // Prevents form submission on Cancel
                    setCategoryCreateModal(false)
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

export default AddCategory
