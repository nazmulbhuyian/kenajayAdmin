import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { BASE_URL } from "./../../utils/baseURL";
import MiniSpinner from "../../shared/MiniSpinner/MiniSpinner";

const AddCommission = ({ refetch, getInitialCommissionData }) => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();

  const handleDataPost = async (data) => {
    setLoading(true);

    if (getInitialCommissionData?._id) {
      try {
        const sendData = {
          _id: getInitialCommissionData?._id,

          default_commision_rate: data?.default_commision_rate,
        };

        const response = await fetch(
          `${BASE_URL}/commision?role_type=commision_update`,
          {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sendData),
          }
        );
        const result = await response.json();
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(
            result?.message
              ? result?.message
              : "Commission Update successfully",
            {
              autoClose: 1000,
            }
          );
          refetch();
          setLoading(false);
        } else {
          toast.error(result?.message || "Something went wrong", {
            autoClose: 1000,
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(error?.message, {
          autoClose: 1000,
        });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    } else {
      try {
        const sendData = {
          default_commision_rate: data?.default_commision_rate,
        };

        const response = await fetch(
          `${BASE_URL}/commision?role_type=commision_create`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sendData),
          }
        );
        const result = await response.json();
        if (result?.statusCode === 200 && result?.success === true) {
          toast.success(
            result?.message
              ? result?.message
              : "Commission Create successfully",
            {
              autoClose: 1000,
            }
          );
          refetch();
          setLoading(false);
        } else {
          toast.error(result?.message || "Something went wrong", {
            autoClose: 1000,
          });
          setLoading(false);
        }
      } catch (error) {
        toast.error(error?.message, {
          autoClose: 1000,
        });
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="">
      <div className="bg-slate-50 rounded-lg shadow my-4 p-5">
        <div className=" mt-4">
          <h3
            className="text-[26px] font-bold text-gray-800 capitalize"
            id="modal-title"
          >
            Commission
          </h3>
        </div>
        <hr className="mt-2 mb-6" />

        <form onSubmit={handleSubmit(handleDataPost)} className="">
          <div className="mt-2">
            <label
              htmlFor=""
              className="block text-xs font-medium text-gray-700"
            >
              Default commision rate ( Percentage rate will be 1-100 )
            </label>

            <input
              {...register("default_commision_rate")}
              type="number"
              defaultValue={getInitialCommissionData?.default_commision_rate}
              placeholder="Percentage rate will be (1-100)"
              className="mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2"
              min={1}
              max={100}
              onInput={(e) => {
                let value = parseInt(e.target.value, 10);
                if (value < 1) value = 1; // Replace with minimum value
                if (value > 100) value = 100; // Replace with maximum value
                e.target.value = value; // Update the value instantly
              }}
              // onInput={(e) => {
              //   const value = Math.max(
              //     1,
              //     Math.min(100, parseInt(e.target.value, 10) || 0)
              //   );
              //   e.target.value = value;
              // }}
            />
          </div>

          <div className="flex gap-6 mt-6 justify-end">
            {loading == true ? (
              <div className="px-10 py-2 flex items-center justify-center  bg-primaryColor text-white rounded">
                <MiniSpinner />
              </div>
            ) : (
              <>
                {getInitialCommissionData?._id ? (
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
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCommission;
