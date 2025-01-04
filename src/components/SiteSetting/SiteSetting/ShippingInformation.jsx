import { useForm } from "react-hook-form";
//import MiniSpinner from "../../../shared/MiniSpinner/MiniSpinner";

const ShippingInformation = () => {
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
              htmlFor=""
              className="block text-xs font-medium text-gray-700"
            >
              Inside Dhaka Shipping Charge
            </label>
            <input
              {...register("inside_dhaka_shipping_charge")}
              type="text"
              placeholder="Enter Shipping Charge"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
          <div className="">
            <label
              htmlFor=""
              className="block text-xs font-medium text-gray-700"
            >
              Outside Dhaka Shipping Charge
            </label>
            <input
              {...register("outside_dhaka_shipping_charge")}
              type="text"
              placeholder="Enter Shipping Charge"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
          <div className="">
            <label
              htmlFor=""
              className="block text-xs font-medium text-gray-700"
            >
              Inside Dhaka Shipping Days
            </label>
            <input
              {...register("inside_dhaka_shipping_days")}
              type="text"
              placeholder="Enter Shipping Days"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>
          <div className="">
            <label
              htmlFor=""
              className="block text-xs font-medium text-gray-700"
            >
              Outside Dhaka Shipping Days
            </label>
            <input
              {...register("outside_dhaka_shipping_days")}
              type="text"
              placeholder="Enter Shipping Days"
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

export default ShippingInformation;
