import { useForm } from "react-hook-form";

const StoreDetails = () => {
  const { register, handleSubmit } = useForm();

  const handleShippingPost = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleShippingPost)} className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="">
            <label
              htmlFor="facebook"
              className="block text-xs font-medium text-gray-700"
            >
              Facebook
            </label>
            <input
              {...register("facebook")}
              type="url"
              id="facebook"
              placeholder="Enter Your Facebook Link"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
          <div className="">
            <label
              htmlFor="instagram"
              className="block text-xs font-medium text-gray-700"
            >
              Instagram
            </label>
            <input
              {...register("instagram")}
              type="url"
              id="instagram"
              placeholder="Enter Your Instagram Link"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
          <div className="">
            <label
              htmlFor="twitter"
              className="block text-xs font-medium text-gray-700"
            >
              Twitter
            </label>
            <input
              {...register("twitter")}
              type="url"
              id="twitter"
              placeholder="Enter Your Twitter Link"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
          <div className="">
            <label
              htmlFor="you_tube"
              className="block text-xs font-medium text-gray-700"
            >
              Youtube
            </label>
            <input
              {...register("you_tube")}
              type="url"
              id="you_tube"
              placeholder="Enter Your Youtube Link"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
          <div className="">
            <label
              htmlFor="watsapp"
              className="block text-xs font-medium text-gray-700"
            >
              WatsApp
            </label>
            <input
              {...register("watsapp")}
              type="url"
              id="watsapp"
              placeholder="Enter Your WatsApp Link"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
        </div>
        <div className="flex gap-6 mt-4 justify-end">
          {/* {sslLoading == true ? (
              <div className="px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded">
                <MiniSpinner />
              </div>
            ) : (
              <>
                {getInitialPaymentData?._id ? (
                  <button
                    className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded"
                    type="submit"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded"
                    type="submit"
                  >
                    Save
                  </button>
                )}
              </>
            )} */}
          <button
            className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreDetails;
