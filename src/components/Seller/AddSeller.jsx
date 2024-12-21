import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";
import { toast } from "react-toastify";
import { BASE_URL } from "../../utils/baseURL";
import { useQuery } from "@tanstack/react-query";
import { LoaderOverlay } from "../common/loader/LoderOverley";
import Select from "react-select";
import "react-phone-number-input/style.css";
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from "react-phone-number-input";

const AddSeller = ({
  SetOpenAddSellerModal,
  roleData,
  refetch,
  isLoading,
  user,

  getInitialCommissionData,
}) => {
  const [loading, setLoading] = useState(false);
  const [user_phone, setUserPhone] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //handle Data post....
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
    if (!user_phone) {
      toast.error("Phone is required!", {
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
    try {
      const sendData = {
        login_credentials:user_phone,
        user_name: data?.user_name,

        user_status: data?.user_status,
        user_phone: user_phone,
        user_password: data?.user_password,
        role_id: data?.role_id,
        user_publisher_id: user?._id,
        commision_rate: data?.commision_rate,
      };
      const response = await fetch(
        `${BASE_URL}/seller/dashboard?role_type=seller_create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify(sendData),
        }
      );
      const result = await response.json();
      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message ? result?.message : "Seller created successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
        setLoading(false);
        reset();
        SetOpenAddSellerModal(false);
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
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[550px] p-6 max-h-[100vh] overflow-y-auto scrollbar-thin">
          <div className="flex items-center justify-between mt-4">
            <h3
              className="text-[26px] font-bold text-gray-800 capitalize"
              id="modal-title"
            >
              Add All Seller
            </h3>
            <button
              type="button"
              className="btn bg-white hover:bg-bgBtnInactive hover:text-btnInactiveColor  p-1 absolute right-3 rounded-full top-3"
              onClick={() => SetOpenAddSellerModal(false)}
            >
              {" "}
              <RxCross1 size={20}></RxCross1>
            </button>
          </div>

          <hr className="mt-2 mb-6" />

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
                id="user_name"
                placeholder="Enter user name"
                className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              />
              {errors.user_name && (
                <p className="text-red-600 text-sm">
                  {errors.user_name?.message}
                </p>
              )}
            </div>

            <div className="mt-2">
              <label htmlFor="user_phone">Phone</label>
              <PhoneInput
                className="mt-1 w-full rounded-md border-white-light bg-white px-2 py-1  text-black ps-4 placeholder:text-white-dark text-xl custom-input border fo"
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
                placeholder="Enter user password"
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

            <div className="flex items-center justify-between gap-2">
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
                  placeholder="Enter user role"
                  className=" mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                >
                  {isLoading ? (
                    <MiniSpinner />
                  ) : (
                    <>
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
              <div className="mt-4 flex-1">
                <label
                  htmlFor="user_status"
                  className="block text-xs font-medium text-gray-700"
                >
                  Status <span className="text-red-500">*</span>
                </label>
                <select
                  {...register("user_status", {
                    required: " Status is required",
                  })}
                  className="mt-2 rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2 w-full"
                >
                  <option value="active">Active</option>
                  <option value="in-active">In-Active</option>
                </select>
                {errors.user_status && (
                  <p className="text-red-600 text-sm">
                    {errors.user_status.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex gap-6 mt-6 justify-end">
              <button
                className="px-10 py-2 border rounded hover:bg-bgBtnInactive hover:text-btnInactiveColor"
                onClick={() => SetOpenAddSellerModal(false)}
                type="button"
              >
                Cancel
              </button>
              {loading ? (
                <div className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200  text-white text-sm">
                  Loading... <MiniSpinner />
                </div>
              ) : (
                <button
                  className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded"
                  type="submit"
                >
                  Add All Seller
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSeller;
