import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { RxCross1 } from 'react-icons/rx'
import MiniSpinner from './../../shared/MiniSpinner/MiniSpinner'

const AddSupport = ({ setSupportAddModal }) => {
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

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
                Add Support
              </h3>
              <button
                type='button'
                className='btn bg-white   p-1 absolute right-3 rounded-full top-3 hover:bg-bgBtnInactive hover:text-btnInactiveColor'
                onClick={() => setSupportAddModal(false)}
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
                  User Name <span className='text-red-500'>*</span>
                </label>

                <input
                  {...register('user_id', {
                    required: 'User name is required',
                  })}
                  type='text'
                  placeholder='User Name'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
                {errors.user_id && (
                  <p className='text-red-600'>{errors.user_id?.message}</p>
                )}
              </div>
              <div className='mt-4'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Subject <span className='text-red-500'>*</span>
                </label>

                <input
                  {...register('subject', {
                    required: 'subject is required',
                  })}
                  type='text'
                  placeholder='Subject'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
                {errors.subject && (
                  <p className='text-red-600'>{errors.subject?.message}</p>
                )}
              </div>
              <div className='mt-4'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Replay Message <span className='text-red-500'>*</span>
                </label>

                <textarea
                  {...register('replay_message', {
                    required: 'replay message is required',
                  })}
                  type='text'
                  placeholder='Replay Message'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
                {errors.replay_message && (
                  <p className='text-red-600'>
                    {errors.replay_message?.message}
                  </p>
                )}
              </div>
              <div className='mt-4'>
                <label
                  htmlFor=''
                  className='block text-xs font-medium text-gray-700'
                >
                  Description <span className='text-red-500'>*</span>
                </label>

                <textarea
                  {...register('description', {
                    required: 'description message is required',
                  })}
                  type='text'
                  placeholder='DesCription Message'
                  className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
                />
                {errors.description && (
                  <p className='text-red-600'>{errors.description?.message}</p>
                )}
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

export default AddSupport
