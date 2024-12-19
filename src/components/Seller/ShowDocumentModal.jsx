import { RxCross1 } from 'react-icons/rx'

const ShowDocumentModal = ({ setOpenDocumentModal, getDocumentData }) => {
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
               Seller Request NID Document
              </h3>
              <button
                type='button'
                className='btn bg-white hover:bg-bgBtnInactive hover:text-btnInactiveColor  p-1 absolute right-3 rounded-full top-3'
                onClick={() => setOpenDocumentModal(false)}
              >
                {' '}
                <RxCross1 size={20}></RxCross1>
              </button>
            </div>

            <hr className='mt-2 mb-6' />

            <div>
              {getDocumentData?.nid_card?.endsWith('.pdf') ||
              getDocumentData?.nid_card?.endsWith('.PDF') ? (
                <iframe
                  src={getDocumentData?.nid_card}
                  width='100%'
                  height='500'
                  title='PDF Preview'
                />
              ) : (
                <img
                  src={getDocumentData?.nid_card}
                  alt={getDocumentData?.nid_card}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowDocumentModal
