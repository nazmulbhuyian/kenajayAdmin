import Pagination from '../common/pagination/Pagination'
import { MdDeleteForever } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import { useState } from 'react'
import UpdateSupport from './UpdateSupport'

const SupportTable = () => {
  const [showSupportUpdateModal, setShowSupportUpdateModal] = useState(false)
  const [supportUpdateData, setSupportUpdateData] = useState({})

  // //Table Serial number
  // const [serialNumber, setSerialNumber] = useState()
  // useEffect(() => {
  //   const newSerialNumber = (page - 1) * limit
  //   setSerialNumber(newSerialNumber)
  // }, [page, limit])
  // //End Table Serial number

  const handleUpdateSupport = () => {
    setSupportUpdateData()
    setShowSupportUpdateModal(true)
  }

  return (
    <>
      <div>
        <div className='rounded-lg border border-gray-200 mt-6'>
          <div className='overflow-x-auto rounded-t-lg'>
            <table className='min-w-full divide-y-2 divide-gray-200 bg-white text-sm'>
              <thead className='ltr:text-left rtl:text-right bg-[#fff9ee]'>
                <tr className='divide-x divide-gray-300  font-semibold text-center text-gray-900'>
                  <td className='whitespace-nowrap p-4 '>SL No</td>
                  <td className='whitespace-nowrap p-4 '>User Name</td>
                  <td className='whitespace-nowrap p-4 '>Subject</td>
                  <td className='whitespace-nowrap p-4 '>Replay Message</td>
                  <td className='whitespace-nowrap p-4 '>Description</td>
                  <td className='whitespace-nowrap p-4 '>Action</td>
                </tr>
              </thead>

              <tbody className='divide-y divide-gray-200 text-center'>
                <tr className='divide-x divide-gray-200'>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                    {/* {serialNumber + i + 1} */}#
                  </td>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                    Name
                  </td>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                    Sub
                  </td>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                    Message
                  </td>
                  <td className='whitespace-nowrap py-1.5 font-medium text-gray-700'>
                    description
                  </td>

                  <td className='whitespace-nowrap py-1.5 px-2 text-gray-700'>
                    <button
                    //onClick={() => handleDeleteCountry(request)}
                    >
                      <MdDeleteForever
                        size={25}
                        className='cursor-pointer text-red-500 hover:text-red-300'
                      />
                    </button>

                    <button
                      className='ml-3'
                      onClick={() => handleUpdateSupport()}
                    >
                      <FiEdit
                        size={25}
                        className='cursor-pointer text-gray-500 hover:text-gray-300'
                      />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        {/* pagination */}

        <Pagination
        // totalData={totalData}
        // setPage={setPage}
        // setLimit={setLimit}
        // page={page}
        // limit={limit}
        />

        {/* Show Request Update Modal */}
        {showSupportUpdateModal && (
          <UpdateSupport
            setShowSupportUpdateModal={setShowSupportUpdateModal}
            supportUpdateData={supportUpdateData}
          />
        )}
      </div>
    </>
  )
}

export default SupportTable
