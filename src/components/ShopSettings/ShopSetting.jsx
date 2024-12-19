import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RiImageAddFill } from 'react-icons/ri'
import { RxCross1 } from 'react-icons/rx'
import { toast } from 'react-toastify'

import MiniSpinner from './../../shared/MiniSpinner/MiniSpinner'
import { BASE_URL } from './../../utils/baseURL';

const ShopSetting = ({ refetch, shopSettingData, user }) => {
  console.log(shopSettingData)
  const [loading, setLoading] = useState(false)

  const { register, handleSubmit } = useForm()

  // show Shop Banner image Preview in state
  const [shopBannerImagePreview, setShopBannerImagePreview] = useState(
    shopSettingData?.shop_banner
  )

  // show Shop Logo image Preview in state
  const [shopLogoImagePreview, setShopLogoImagePreview] = useState(
    shopSettingData?.shop_logo
  )

  // show Shop Banner image Preview Function

  const handleShopBannerImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setShopBannerImagePreview(URL.createObjectURL(file))
    }
  }

  // show Shop Logo image Preview Function
  const handleShopLogoImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setShopLogoImagePreview(URL.createObjectURL(file))
    }
  }

  const handleDataPost = async (data) => {
    setLoading(true)

    if (shopSettingData?._id) {
      try {
        const formData = new FormData()
        formData.append('_id', shopSettingData?._id)
        formData.append(
          'shop_logo',
          data?.shop_logo[0] ? data?.shop_logo[0] : shopSettingData?.shop_logo
        )
        formData.append(
          'shop_banner',
          data?.shop_banner[0]
            ? data?.shop_banner[0]
            : shopSettingData?.shop_banner
        )
        formData.append('shop_name', data?.shop_name)

        formData.append(
          'panel_owner_id',
          user?.panel_owner_id ? user?.panel_owner_id : user?._id
        )
        formData.append('shop_updated_id', user?._id)
        formData.append('shop_banner_key', shopSettingData?.shop_banner_key)
        formData.append('shop_logo_key', shopSettingData?.shop_logo_key)

        const response = await fetch(`${BASE_URL}/seller_shop_setting`, {
          method: 'PATCH',
          credentials: 'include',
          body: formData,
        })
        const result = await response.json()
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(
            result?.message
              ? result?.message
              : 'Shop Settings Update successfully',
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
    } else {
      try {
        const formData = new FormData()

        formData.append('shop_logo', data?.shop_logo[0])
        formData.append('shop_banner', data?.shop_banner[0])
        formData.append('shop_name', data?.shop_name)

        formData.append(
          'panel_owner_id',
          user?.panel_owner_id ? user?.panel_owner_id : user?._id
        )

        const response = await fetch(`${BASE_URL}/seller_shop_setting`, {
          method: 'POST',
          credentials: 'include',
          body: formData,
        })
        const result = await response.json()
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(
            result?.message
              ? result?.message
              : 'Shop Settings created successfully',
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
  return (
    <div>
      <div>
        <div>
          <div className='relative overflow-hidden text-left bg-white rounded-lg shadow-xl  p-6'>
            <form onSubmit={handleSubmit(handleDataPost)} className=''>
              <div>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Shop Name
                </label>
                <input
                  {...register('shop_name')}
                  defaultValue={shopSettingData?.shop_name}
                  type='text'
                  placeholder='Shop Name'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='flex mt-6 gap-8'>
                {/* ---Shop Logo Image Preview ---*/}

                <div className='w-1/2'>
                  <p className='mb-2 text-sm'>Shop Logo Image</p>
                  {shopLogoImagePreview ? (
                    <>
                      <div className='relative'>
                        <button
                          type='button'
                          className='btn bg-bgBtnInactive border p-1 absolute right-1 rounded-full top-1 text-btnInactiveColor '
                          onClick={() => setShopLogoImagePreview(false)}
                        >
                          {' '}
                          <RxCross1 size={15}></RxCross1>
                        </button>

                        <img
                          src={shopLogoImagePreview}
                          alt='Preview'
                          className='w-full h-64 object-cover my-2 rounded '
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <label
                        className=' w-full h-[160px] bg-gray-100 border-dashed border flex justify-center items-center rounded cursor-pointer'
                        htmlFor='shop_logo'
                      >
                        <div className='flex flex-col items-center justify-center '>
                          <div>
                            <RiImageAddFill size={25} />
                          </div>
                          <p className='mt-2 text-[#C9CACA]' type=''>
                            upload Shop Logo image
                          </p>
                        </div>
                      </label>
                    </>
                  )}
                  <input
                    {...register('shop_logo', {
                      valiDate: {
                        isImage: (value) =>
                          (value[0] && value[0].type.startsWith('image/')) ||
                          'Only image files are allowed',
                      },
                    })}
                    accept='image/*'
                    type='file'
                    id='shop_logo'
                    className='mt-1 sm:text-sm p-0.5 file:cursor-pointer file:bg-primaryColor file:text-white file:border-none file:rounded file:px-2 file:py-1.5'
                    onChange={handleShopLogoImageChange}
                  />
                  <p className='text-xs text-[#C9CACA]  mt-1 text-end'>
                    Upload 300x300 pixel images in PNG, JPG, or WebP format (max
                    1 MB).
                  </p>
                </div>

                {/* ---Shop Banner Image Preview ---*/}

                <div className='w-1/2'>
                  <p className='mb-2 text-sm'>Shop Banner Image</p>
                  {shopBannerImagePreview ? (
                    <>
                      <div className='relative'>
                        <button
                          type='button'
                          className='btn bg-bgBtnInactive border p-1 absolute right-1 rounded-full top-1 text-btnInactiveColor '
                          onClick={() => setShopBannerImagePreview(false)}
                        >
                          {' '}
                          <RxCross1 size={15}></RxCross1>
                        </button>

                        <img
                          src={shopBannerImagePreview}
                          alt='Preview'
                          className='w-full h-64 object-cover my-2 rounded '
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <label
                        className=' w-full h-[160px] bg-gray-100 border-dashed border flex justify-center items-center rounded cursor-pointer'
                        htmlFor='shop_banner'
                      >
                        <div className='flex flex-col items-center justify-center '>
                          <div>
                            <RiImageAddFill size={25} />
                          </div>
                          <p className='mt-2 text-[#C9CACA]' type=''>
                            upload Shop Banner image
                          </p>
                        </div>
                      </label>
                    </>
                  )}
                  <input
                    {...register('shop_banner', {
                      valiDate: {
                        isImage: (value) =>
                          (value[0] && value[0].type.startsWith('image/')) ||
                          'Only image files are allowed',
                      },
                    })}
                    accept='image/*'
                    type='file'
                    id='shop_banner'
                    className='mt-1 sm:text-sm p-0.5 file:cursor-pointer file:bg-primaryColor file:text-white file:border-none file:rounded file:px-2 file:py-1.5'
                    onChange={handleShopBannerImageChange}
                  />
                  <p className='text-xs text-[#C9CACA]  mt-1 text-end'>
                    Upload 300x300 pixel images in PNG, JPG, or WebP format (max
                    1 MB).
                  </p>
                </div>
              </div>
              <div className='flex gap-6 mt-6 justify-end'>
                {loading == true ? (
                  <div className='px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded'>
                    <MiniSpinner />
                  </div>
                ) : (
                  <button
                    className='px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded'
                    type='submit'
                  >
                    Save
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

export default ShopSetting
