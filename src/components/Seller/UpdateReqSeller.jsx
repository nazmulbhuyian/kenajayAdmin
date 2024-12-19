import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import { BASE_URL } from "../../utils/baseURL";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";
import { useQuery } from "@tanstack/react-query";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import Select from "react-select";

const UpdateReqSeller = ({
  refetch,
  setUpdateModal,
  updateModalValue,
  roleData,
  isLoading,
  user,
  getInitialCommissionData,
}) => {
  const [loading, setLoading] = useState(false);
  const [user_phone, setUserPhone] = useState(updateModalValue?.user_phone);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm(updateModalValue);

  const { data: packageData, isLoading: isGetPackageLoading } = useQuery({
    queryKey: [`/api/v1/package`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/package`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleDataPost = async (data) => {
    setLoading(true);
    if (user_phone) {
      const formatPhoneNumberValueCheck = formatPhoneNumber(user_phone);
      const isPossiblePhoneNumberValueCheck = isPossiblePhoneNumber(user_phone);
      const isValidPhoneNumberValueCheck = isValidPhoneNumber(user_phone);
      if (formatPhoneNumberValueCheck == false) {
        toast.error("Mobile number not valid !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        return;
      }
      if (isPossiblePhoneNumberValueCheck == false) {
        toast.error("Mobile number not valid !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        return;
      }
      if (isValidPhoneNumberValueCheck == false) {
        toast.error("Mobile number not valid !", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
        return;
      }
    }
    const sendData = {
      _id: updateModalValue?._id,
      user_name: data?.user_name,
      user_email: data?.user_email,
      user_phone: user_phone,
      user_password: data?.user_password,
      role_id: data?.role_id,
      is_verified: true,
      user_status: "active",
      seller_request: false,
      commision_rate: data?.commision_rate,
      user_updated_by: user?._id,
      login_credentials: data?.user_email ? data?.user_email : user_phone,
    };
    if (!sendData?.user_phone) {
      delete sendData?.user_phone;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/seller/dashboard?role_type=seller_update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(sendData),
        }
      );
      const result = await response.json();
      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message ? result?.message : "seller updated  successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        setUpdateModal(false);
        reset();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.error("Network error or server is down", {
        autoClose: 1000,
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (isGetPackageLoading) {
    return <LoaderOverlay />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-gray-800 capitalize"
            id="modal-title"
          >
            {" "}
            Update Request Seller
          </h3>
          <button
            type="button"
            className="btn bg-white hover:bg-bgBtnInactive hover:text-btnInactiveColor  p-1 absolute right-3 rounded-full top-3"
            onClick={() => setUpdateModal(false)}
          >
            {" "}
            <RxCross1 size={20}></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        <form onSubmit={handleSubmit(handleDataPost)} className="">
          <div>
            <label
              htmlFor="user_name"
              className="block text-xs font-medium text-gray-700"
            >
              User Name
            </label>

            <input
              {...register("user_name", {
                required: "User name is required",
              })}
              type="text"
              defaultValue={updateModalValue?.user_name}
              placeholder="Enter user name"
              id="user_name"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.user_name && (
              <p className="text-red-600 text-sm">
                {errors.user_name?.message}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="user_email"
              className="block text-xs font-medium text-gray-700 mt-2"
            >
              User Email
            </label>

            <input
              {...register("user_email")}
              type="text"
              id="user_email"
              defaultValue={updateModalValue?.user_email}
              placeholder="Enter user email"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.user_email && (
              <p className="text-red-600 text-sm">
                {errors.user_email?.message}
              </p>
            )}
          </div>
          <div className="mt-2">
            <label htmlFor="user_phone">Phone</label>
            <PhoneInput
              className="mt-2 w-full rounded-md border-white-light bg-white px-2 py-1  text-black ps-4 placeholder:text-white-dark text-xl custom-input border fo"
              placeholder="Enter phone number"
              id="user_phone"
              value={user_phone}
              defaultCountry="BD"
              international
              countryCallingCodeEditable={false}
              onChange={setUserPhone}
              error={
                user_phone
                  ? !isValidPhoneNumber(user_phone) && "Invalid phone number"
                  : "Phone number required"
              }
            />
          </div>

          <div className="relative">
            <label
              htmlFor="user_password"
              className="block text-sm font-medium text-gray-700 mt-2"
            >
              Password
            </label>

            <input
              {...register("user_password", {
                validate: {
                  isPassword: (value) =>
                    value.length >= 4 ||
                    " Password must be at least 4 characters",
                },
                required: "User Password is required",
              })}
              type={showPassword ? "text" : "password"} // Dynamic type based on state
              id="user_password"
              placeholder="Enter your new password"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
            {errors.user_password && (
              <p className="text-red-600 text-sm">
                {errors.user_password?.message}
              </p>
            )}

            {/* Eye icon for toggling password visibility */}
            <div
              className="absolute top-9 right-3 cursor-pointer"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="commision_rate"
              className="block text-xs font-medium text-gray-700 mt-2"
            >
              Commission Rate
            </label>

            <input
              {...register("commision_rate")}
              type="number"
              id="commision_rate"
              defaultValue={getInitialCommissionData?.default_commision_rate}
              placeholder="Enter Commision Rate"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
            />
          </div>

          <div className="flex gap-2">
            <div className="mt-4 flex-1">
              <label
                htmlFor="role_id"
                className="block text-xs font-medium text-gray-700"
              >
                Role <span className="text-red-500">*</span>
              </label>
              <select
                {...register("role_id", {
                  required: " User Role is required",
                })}
                id="role_id"
                className=" mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                defaultValue={updateModalValue?.role_name}
              >
                {isLoading ? (
                  <MiniSpinner />
                ) : (
                  <>
                    {updateModalValue?.role_name && (
                      <option
                        className="capitalize"
                        disabled
                        selected
                        defaultValue={updateModalValue?.role_name}
                      >
                        {updateModalValue?.role_name}
                      </option>
                    )}
                    {roleData.map((role) => (
                      <option key={role?._id} value={role?._id}>
                        {role?.role_name}
                      </option>
                    ))}
                  </>
                )}
              </select>
              {errors.role_id && (
                <p className="text-red-600 text-sm">
                  {errors.role_id?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-6 mt-6 justify-end">
            <button
              className="px-10 py-2 border hover:bg-bgBtnInactive hover:text-btnInactiveColor rounded"
              onClick={() => setUpdateModal(false)}
              type="button"
            >
              Cancel
            </button>
            {loading ? (
              <div className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200  text-white rounded">
                Loading...
                <MiniSpinner />
              </div>
            ) : (
              <button
                className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded"
                type="submit"
              >
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateReqSeller;
