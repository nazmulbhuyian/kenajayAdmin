import { useContext, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross1, RxCrossCircled } from 'react-icons/rx'
import useGetCouponProduct from '../../hooks/useGetCouponProduct'
import UseGetUser from '../../hooks/UseGetUser'
import useDebounced from '../../hooks/useDebounced'
import { AuthContext } from '../../context/AuthProvider'
import NoDataFound from '../../shared/NoDataFound/NoDataFound'
import TableLoadingSkeleton from '../common/loadingSkeleton/TableLoadingSkeleton'
import { MdAddToPhotos } from 'react-icons/md'

import MiniSpinner from '../../shared/MiniSpinner/MiniSpinner'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../utils/baseURL'
import { useNavigate } from 'react-router-dom'

const AddCoupon = ({ setOpenAddCouponModal, refetch }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [loading, setLoading] = useState(false)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [addCouponProducts, setAddCouponProducts] = useState([])
  const [addCouponUser, setAddCouponUser] = useState([])

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [searchValue, setSearchValue] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  //Initialize the state for coupon type
  const [couponType, setCouponType] = useState('fixed')
  //Coupon Customer Type State
  const [couponCustomerType, setCouponCustomerType] = useState('all')
  //Coupon Product  Type State
  const [couponProductType, setCouponProductType] = useState('all')

  const panel_owner_id = user?.panel_owner_id ? user?.panel_owner_id : user?._id

  ///get user hook
  const { data: couponProducts = [], isLoading } = useGetCouponProduct(
    page,
    limit,
    searchTerm,
    panel_owner_id
  )
  const { data: couponUsers = [] } = UseGetUser(
    page,
    limit,
    searchTerm,
    panel_owner_id
  )

  // Handle adding a product
  const handleAddProduct = (product) => {
    setAddCouponProducts((prevProducts) => [...prevProducts, product])
  }

  // Handle removing a product
  const handleDeleteProduct = (product) => {
    const newProducts = addCouponProducts.filter((p) => p?._id !== product?._id)
    setAddCouponProducts(newProducts)
  }
  // Handle adding a product
  const handleAddUser = (user) => {
    setAddCouponUser((addCouponUser) => [...addCouponUser, user])
  }

  // Handle removing a product
  const handleDeleteUser = (user) => {
    const newUser = addCouponUser.filter((u) => u?._id !== user?._id)
    setAddCouponUser(newUser)
  }

  // handle item search function....
  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 })
  useEffect(() => {
    setSearchTerm(searchText)
  }, [searchText])

  //handle item search function....
  // const handleCustomerSearchValue = (value) => {
  //   setSearchValue(value)
  //   setLimit(10)
  //   setPage(1)
  // }

  const handleDataPost = async (data) => {

    setLoading(true)
    if (data?.coupon_type === 'percent' && data?.coupon_amount > 100) {
      toast.warn('Coupon Amount cannot be greater than 100 for percent type')
      setLoading(false)
      return
    }
    try {
      const sendData = {
        coupon_code: data?.coupon_code,
        coupon_start_date: data?.coupon_start_date,
        coupon_end_date: data?.coupon_end_date,
        coupon_type: data?.coupon_type,
        coupon_amount: data?.coupon_amount,
        coupon_use_per_person: data?.coupon_use_per_person,
        coupon_use_total_person: data?.coupon_use_total_person,
        coupon_status: data?.coupon_status,
        coupon_customer_type: data?.coupon_customer_type,
        coupon_max_amount: data?.coupon_max_amount,
        coupon_product_type: data?.coupon_product_type,

        coupon_publisher_id: user?._id,
        panel_owner_id: user?.panel_owner_id ? user?.panel_owner_id : user?._id,
      }

      if (data?.coupon_product_type == 'specific') {
        sendData.coupon_specific_product = addCouponProducts?.map((item) => ({
          product_id: item?._id,
        }))
      }
      if (data?.coupon_customer_type == 'specific') {
        sendData.coupon_specific_customer = addCouponUser?.map((item) => ({
          customer_id: item?._id,
        }))
      }

      const response = await fetch(
        `${BASE_URL}/coupon/?role_type=coupon_create`,
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
          result?.message ? result?.message : 'Coupon created successfully',
          {
            autoClose: 1000,
          }
        )
        refetch()
        setLoading(false)
        setOpenAddCouponModal(false)
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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30'>
      <div className='relative overflow-hidden bg-white w-[1250px]  p-6  max-h-[90vh] rounded overflow-y-auto'>
        <div className='flex items-center justify-between'>
          <h3 className='text-[24px] font-semibold text-[#0A0A0A] capitalize'>
            Add Coupon
          </h3>
          <button className='btn bg-white   p-1 absolute right-3 rounded-full top-3 hover:bg-bgBtnInactive hover:text-btnInactiveColor'>
            <RxCross1
              onClick={() => {
                setOpenAddCouponModal(false)
              }}
              size={20}
            ></RxCross1>
          </button>
        </div>

        <form onSubmit={handleSubmit(handleDataPost)} className='mt-3'>
          <div className='mt-4 w-full  grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-xs font-medium text-gray-700'>
                Coupon Code <span className='text-red-500'>*</span>
              </label>
              <input
                {...register('coupon_code', {
                  required: 'Coupon code is required',
                })}
                type='text'
                placeholder='Coupon code'
                className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.coupon_code && (
                <p className='text-red-600'>{errors.coupon_code?.message}</p>
              )}
            </div>
            <div>
              <label className='block text-xs font-medium text-gray-700'>
                Coupon Status <span className='text-red-500'>*</span>
              </label>
              <select
                {...register('coupon_status', {
                  required: ' Status is required',
                })}
                className='mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
              >
                <option value='active'>Active</option>
                <option value='in-active'>In-Active</option>
              </select>
              {errors.coupon_status && (
                <p className='text-red-600'>{errors.coupon_status.message}</p>
              )}
            </div>

            <div>
              <label className='block text-xs font-medium text-gray-700'>
                Coupon Start Date <span className='text-red-500'>*</span>
              </label>
              <input
                {...register('coupon_start_date', {
                  required: 'Coupon Start Date is required',
                })}
                type='date'
                className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.coupon_start_date && (
                <p className='text-red-600'>
                  {errors.coupon_start_date?.message}
                </p>
              )}
            </div>
            <div>
              <label className='block text-xs font-medium text-gray-700'>
                Coupon End Date <span className='text-red-500'>*</span>
              </label>
              <input
                {...register('coupon_end_date', {
                  required: 'Coupon end Date is required',
                })}
                type='date'
                className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.coupon_end_date && (
                <p className='text-red-600'>
                  {errors.coupon_end_date?.message}
                </p>
              )}
            </div>
            <div>
              <label className='block text-xs font-medium text-gray-700'>
                Coupon Use total Person <span className='text-red-500'>*</span>
              </label>
              <input
                {...register('coupon_use_total_person', {
                  required: 'Coupon Amount is required',
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
                placeholder='Coupon use total person'
                className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.coupon_use_total_person && (
                <p className='text-red-600'>
                  {errors.coupon_use_total_person?.message}
                </p>
              )}
            </div>
            <div>
              <label className='block text-xs font-medium text-gray-700'>
                Coupon Use Per Person <span className='text-red-500'>*</span>
              </label>
              <input
                {...register('coupon_use_per_person', {
                  required: 'Coupon Amount is required',
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
                placeholder='Coupon use per person'
                className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.coupon_use_per_person && (
                <p className='text-red-600'>
                  {errors.coupon_use_per_person?.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-xs font-medium text-gray-700'>
                Coupon Type <span className='text-red-500'>(*per product)</span>
              </label>
              <select
                {...register('coupon_type', {
                  required: ' Status is required',
                })}
                value={couponType}
                onChange={(e) => setCouponType(e.target.value)}
                className='mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
              >
                <option value='fixed'>Fixed</option>
                <option value='percent'>Percent</option>
              </select>
              {errors.coupon_type && (
                <p className='text-red-600'>{errors.coupon_type.message}</p>
              )}
            </div>
            <div>
              <label className='block text-xs font-medium text-gray-700'>
                Coupon Amount <span className='text-red-500'>(*per product)</span>
              </label>
              <input
                {...register('coupon_amount', {
                  required: 'Coupon Amount is required',
                })}
                type='number'
                placeholder='Coupon number'
                className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.coupon_amount && (
                <p className='text-red-600'>{errors.coupon_amount?.message}</p>
              )}
            </div>

            <div>
              {' '}
              <label className='block text-xs font-medium text-gray-700'>
                Coupon Max Amount <span className='text-red-500'>(*per product)</span>
              </label>
              <input
                {...register('coupon_max_amount', {
                  required: ' Amount is required',
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
                placeholder='Coupon Max Amount'
                className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
              />
              {errors.coupon_max_amount && (
                <p className='text-red-600'>
                  {errors.coupon_max_amount?.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-xs font-medium text-gray-700'>
                Coupon Product Type <span className='text-red-500'>*</span>
              </label>
              <select
                {...register('coupon_product_type', {
                  required: 'Product Type is required',
                })}
                value={couponProductType}
                onChange={(e) => {
                  const selectedValue = e.target.value
                  setCouponProductType(selectedValue)
                  if (selectedValue === 'all') {
                    setAddCouponProducts([])
                  }
                }}
                className='mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
              >
                <option value='all'>All</option>
                <option value='specific'>Specific</option>
              </select>
              {errors.coupon_product_type && (
                <p className='text-red-600'>
                  {errors.coupon_product_type.message}
                </p>
              )}
            </div>

            <div>
              <label className='block text-xs font-medium text-gray-700'>
                Coupon Customer Type <span className='text-red-500'>*</span>
              </label>
              <select
                {...register('coupon_customer_type', {
                  required: ' Status is required',
                })}
                value={couponCustomerType}
                onChange={(e) => {
                  const selectedValue = e.target.value
                  setCouponCustomerType(selectedValue)
                  if (selectedValue === 'all') {
                    setAddCouponUser([])
                  }
                }}
                className='mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full'
              >
                <option value='all'>All</option>
                <option value='specific'>Specific</option>
              </select>
              {errors.coupon_customer_type && (
                <p className='text-red-600'>
                  {errors.coupon_customer_type.message}
                </p>
              )}
            </div>
          </div>
          <div className='mt-6 flex gap-4'>
            {couponCustomerType === 'specific' && (
              <>
                {isLoading ? (
                  <TableLoadingSkeleton />
                ) : (
                  <div className='overflow-x-auto rounded-t-lg w-1/2'>
                    <div className='flex justify-between'>
                      <p className='font-semibold my-2'> Users</p>
                    </div>

                    {couponUsers?.data?.length > 0 ? (
                      <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded'>
                        <thead className='ltr:text-left rtl:text-right text-center bg-[#fff9ee]'>
                          <tr className='border divide-x text-xs'>
                            <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                              ADD
                            </th>

                            <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                              User Name
                            </th>
                            <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                              Log With
                            </th>

                            <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                              Status
                            </th>
                          </tr>
                        </thead>

                        <tbody className='divide-y divide-gray-200 text-center'>
                          {couponUsers?.data?.map((cUser, i) => (
                            <tr
                              key={cUser?._id}
                              className={`divide-x divide-gray-200 text-xs ${
                                i % 2 === 0 ? 'bg-white' : 'bg-tableRowBGColor'
                              }`}
                            >
                              <td className='whitespace-nowrap px-2 py-1.5 font-medium text-gray-900'>
                                {addCouponUser.includes(cUser) ? (
                                  <button
                                    type='button'
                                    onClick={() => handleDeleteUser(cUser)}
                                    className='text-red-600 hover:text-red-400'
                                  >
                                    <RxCrossCircled size={25} />
                                  </button>
                                ) : (
                                  <button
                                    type='button'
                                    onClick={() => handleAddUser(cUser)}
                                  >
                                    <MdAddToPhotos
                                      size={25}
                                      className='text-green-600 hover:text-green-500'
                                    />
                                  </button>
                                )}
                              </td>
                              <td className='whitespace-nowrap px-2 py-1.5 font-medium text-gray-900 flex justify-center'>
                                {cUser?.user_name}
                              </td>

                              <td className='whitespace-nowrap px-2 py-1.5 font-medium text-gray-900'>
                                {cUser?.user_email ||
                                  cUser?.user_phone ||
                                  'No contact information available'}
                              </td>

                              <td className='whitespace-nowrap px-2 py-1.5 '>
                                {cUser?.user_status === 'active' ? (
                                  <button
                                    type='button'
                                    className='bg-bgBtnActive text-btnActiveColor px-[10px] py-[3px] rounded-[8px]'
                                    // onClick={() =>
                                    //   handleAttributeActiveStatus(
                                    //     attribute?._id,
                                    //     attribute?.attribute_status
                                    //       ? 'in-active'
                                    //       : 'active'
                                    //   )
                                    // }
                                  >
                                    <span>Active</span>
                                  </button>
                                ) : (
                                  <button
                                    type='button'
                                    className='bg-bgBtnInactive text-btnInactiveColor px-[10px] py-[3px] rounded-[8px]'
                                    // onClick={() =>
                                    //   handleAttributeInActiveStatus(
                                    //     attribute?._id,
                                    //     attribute?.attribute_status
                                    //       ? 'active'
                                    //       : 'in-active'
                                    //   )
                                    // }
                                  >
                                    <span>In-Active</span>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <NoDataFound />
                    )}
                  </div>
                )}
              </>
            )}

            {couponProductType === 'specific' && (
              <>
                {isLoading ? (
                  <TableLoadingSkeleton />
                ) : (
                  <div className='overflow-x-auto rounded-t-lg w-1/2'>
                    <p className='font-semibold my-2'> Products</p>
                    {couponProducts?.data?.length > 0 ? (
                      <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded'>
                        <thead className='ltr:text-left rtl:text-right text-center bg-[#fff9ee]'>
                          <tr className='border divide-x text-xs'>
                            <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                              ADD
                            </th>

                            <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                              Product Img
                            </th>
                            <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                              Product name
                            </th>

                            <th className='whitespace-nowrap py-4 font-medium text-gray-900'>
                              Status
                            </th>
                          </tr>
                        </thead>

                        <tbody className='divide-y divide-gray-200 text-center'>
                          {couponProducts?.data?.map((product, i) => (
                            <tr
                              key={product?._id}
                              className={`divide-x divide-gray-200 text-xs ${
                                i % 2 === 0 ? 'bg-white' : 'bg-tableRowBGColor'
                              }`}
                            >
                              <td className='whitespace-nowrap px-2 py-1.5 font-medium text-gray-900'>
                                {addCouponProducts.includes(product) ? (
                                  <button
                                    type='button'
                                    onClick={() => handleDeleteProduct(product)}
                                    className='text-red-600 hover:text-red-400'
                                  >
                                    <RxCrossCircled size={25} />
                                  </button>
                                ) : (
                                  <button
                                    type='button'
                                    onClick={() => handleAddProduct(product)}
                                  >
                                    <MdAddToPhotos
                                      size={25}
                                      className='text-green-600 hover:text-green-500'
                                    />
                                  </button>
                                )}
                              </td>
                              <td className='whitespace-nowrap px-2 py-1.5 font-medium text-gray-900 flex justify-center'>
                                <img
                                  src={product?.main_image}
                                  alt=''
                                  className='w-[34px] h-[34px] rounded-[8px]'
                                />
                              </td>

                              <td className='whitespace-nowrap px-2 py-1.5 font-medium text-gray-900'>
                                {product?.product_name}
                              </td>

                              <td className='whitespace-nowrap px-2 py-1.5 '>
                                {product?.product_status === 'active' ? (
                                  <button
                                    type='button'
                                    className='bg-bgBtnActive text-btnActiveColor px-[10px] py-[3px] rounded-[8px]'
                                    // onClick={() =>
                                    //   handleAttributeActiveStatus(
                                    //     attribute?._id,
                                    //     attribute?.attribute_status
                                    //       ? 'in-active'
                                    //       : 'active'
                                    //   )
                                    // }
                                  >
                                    <span>Active</span>
                                  </button>
                                ) : (
                                  <button
                                    type='button'
                                    className='bg-bgBtnInactive text-btnInactiveColor px-[10px] py-[3px] rounded-[8px]'
                                    // onClick={() =>
                                    //   handleAttributeInActiveStatus(
                                    //     attribute?._id,
                                    //     attribute?.attribute_status
                                    //       ? 'active'
                                    //       : 'in-active'
                                    //   )
                                    // }
                                  >
                                    <span>In-Active</span>
                                  </button>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <NoDataFound />
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          <div className='flex items-center justify-end mt-4 gap-2'>
            <button
              className='px-10 py-2 border hover:bg-bgBtnInactive hover:text-btnInactiveColor rounded '
              onClick={() => setOpenAddCouponModal(false)}
            >
              Cancel
            </button>
            {loading == true ? (
              <div className='px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded'>
                <MiniSpinner />
              </div>
            ) : (
              <button
                className='px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200  text-white rounded'
                type='submit'
              >
                Create
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCoupon
