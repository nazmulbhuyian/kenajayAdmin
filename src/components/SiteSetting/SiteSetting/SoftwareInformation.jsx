import { useForm } from "react-hook-form";

const SoftwareInformation = () => {
  const { register, handleSubmit } = useForm();

  const handleShippingPost = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={handleSubmit(handleShippingPost)} className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-xs font-medium text-gray-700"
              htmlFor="logo"
            >
              Logo
            </label>
            <input
              {...register("logo", {
                validate: (value) => {
                  if (value && value.length > 0) {
                    return (
                      value[0].type.startsWith("image/") ||
                      "Only image files are allowed"
                    );
                  }
                },
              })}
              id="logo"
              type="file"
              accept="image/*"
              className="mt-2 w-full file:bg-blue-600 file:border-none file:text-white rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 file:rounded cursor-pointer"
            />
          </div>

          <div>
            <label
              htmlFor=""
              className="block text-xs font-medium text-gray-700"
            >
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="Enter Title"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
          <div className="">
            <label
              htmlFor=""
              className="block text-xs font-medium text-gray-700"
            >
              Contact Number
            </label>
            <input
              {...register("contact")}
              type="number"
              placeholder="Enter Contact Number"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
          <div className="">
            <label
              htmlFor=""
              className="block text-xs font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              placeholder="Enter Email"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
          <div className="">
            <label
              htmlFor=""
              className="block text-xs font-medium text-gray-700"
            >
              Address
            </label>
            <input
              {...register("address")}
              type="text"
              placeholder="Enter Address"
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

export default SoftwareInformation;
