import { RxCross1 } from 'react-icons/rx'
import MiniSpinner from '../../shared/MiniSpinner/MiniSpinner'
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const UpdateSupport = ({ setShowSupportUpdateModal }) => {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit } = useForm()

  const handleDataPost = async (data) => {
    console.log(data)
  }
  return (
    <div>
      <div>
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[850px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin'>
            <div className='flex items-center justify-between mt-4'>
              <h3
                className='text-[26px] font-bold text-gray-800 capitalize'
                id='modal-title '
              >
                Update Support
              </h3>
              <button
                type='button'
                className='btn bg-white   p-1 absolute right-3 rounded-full top-3 hover:bg-bgBtnInactive hover:text-btnInactiveColor'
                onClick={() => setShowSupportUpdateModal(false)}
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
                  User Name
                </label>

                <input
                  {...register('user_id')}
                  type='text'
                  placeholder='User Name'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-4'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Subject
                </label>

                <input
                  {...register('subject')}
                  type='text'
                  placeholder='Subject'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-4'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Replay Message
                </label>

                <textarea
                  {...register('replay_message')}
                  type='text'
                  placeholder='Replay Message'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>
              <div className='mt-4'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Description <span className='text-red-500'>*</span>
                </label>

                <textarea
                  {...register('description')}
                  type='text'
                  placeholder='DesCription Message'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
              </div>

              <div className='flex  mt-6 justify-end'>
                {loading == true ? (
                  <div className='px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded'>
                    <MiniSpinner />
                  </div>
                ) : (
                  <button
                    className='px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded'
                    type='submit'
                  >
                    Update
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

export default UpdateSupport
