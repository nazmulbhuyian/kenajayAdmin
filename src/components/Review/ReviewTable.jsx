import { BiShow } from 'react-icons/bi'
import { MdDeleteForever } from 'react-icons/md'
import Pagination from './../common/pagination/Pagination'
import { useState } from 'react'
import ReviewDescription from './ReviewDescription'
import { FiEdit } from 'react-icons/fi'

const ReviewTable = () => {
  //review DesCription State
  const [desCription, setDesCription] = useState(false)
  const [desCriptionDATA, setDesCriptionDATA] = useState('')
  const handleDescription = (data) => {
    setDesCription(true)
    setDesCriptionDATA(data)
  }
  return (
    <div className='rounded-lg border border-gray-200 mt-6'>
      <div className='overflow-x-auto rounded-t-lg'>
        <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
          <thead className='ltr:text-left rtl:text-right'>
            <tr>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                SL No
              </th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                Name
              </th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                Email
              </th>

              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                Product Name
              </th>

              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                Ratting
              </th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                Description
              </th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                Publisher Email
              </th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                Status
              </th>
              <th className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                Action
              </th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-200 text-center'>
            <tr>
              <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                #
              </td>
              <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                Ahamed
              </td>
              <td className='whitespace-nowrap px-4 py-2 font-medium text-gray-900'>
                nazmulbhuyian000@gmail.com
              </td>

              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                Apple Phone
              </td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                4 Star
              </td>

              <td className='whitespace-nowrap px-4 py-2 '>
                <button onClick={handleDescription}>
                  <BiShow size={22} />
                </button>
              </td>
              <td className='whitespace-nowrap px-4 py-2 '>
                email123@hmail.com
              </td>
              <td className='whitespace-nowrap px-4 py-2 '>
                <button className='bg-bgBtnActive text-btnActiveColor px-[10px] py-[4px] rounded-[8px]'>
                  <span>Active</span>
                </button>
              </td>
              <td className='whitespace-nowrap px-4 py-2 text-gray-700'>
                <button>
                  <FiEdit size={22} />
                </button>
                <button className='ml-1'>
                  <MdDeleteForever size={22} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Review Description */}

      {desCription && (
        <ReviewDescription
          desCriptionDATA={desCriptionDATA}
          setDesCription={setDesCription}
        />
      )}
      {/* pagination */}
      <Pagination />
    </div>
  )
}

export default ReviewTable
