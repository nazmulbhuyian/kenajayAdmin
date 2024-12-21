import { RxCross1 } from "react-icons/rx";

const AllWithDrawDescription = ({ setDesCription, desCriptionDATA }) => {
    console.log(desCriptionDATA);
    
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-6">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[750px] p-6 max-h-[90vh] overflow-y-auto scrollbar-thin">
        <div>
          <h3
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 capitalize border-b pb-2"
            id="modal-title "
          >
            All Withdrawal Description
          </h3>
          <button
            type="button"
            className="btn bg-white hover:bg-bgBtnInactive hover:text-btnInactiveColor  p-1 absolute right-3 rounded-full top-3"
            onClick={() => setDesCription(false)}
          >
            {" "}
            <RxCross1 size={20}></RxCross1>
          </button>
          <div className="mt-6">
            <p>Description</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllWithDrawDescription;
