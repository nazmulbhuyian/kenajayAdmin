import { toast } from "react-toastify";
import NoDataFound from "../../shared/NoDataFound/NoDataFound";
import { BASE_URL } from "../../utils/baseURL";
import Swal from "sweetalert2-optimized";
import { MdDeleteForever } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import Pagination from "./../common/pagination/Pagination";
import { useEffect, useState } from "react";
import UpDateAllSeller from "./UpDateAllSeller";
import TableLoadingSkeleton from "./../common/loadingSkeleton/TableLoadingSkeleton";

const AllSellerTableList = ({
  SellerData,
  refetch,
  limit,
  page,
  setPage,
  setLimit,
  roleData,
  isLoading,
  isLoadingSeller,
  user,
  totalData,
}) => {
  const [serialNumber, setSerialNumber] = useState();
  const [updateModal, setUpdateModal] = useState(false);
  const [updateModalValue, setUpdateModalValue] = useState({});

  const handleUpdateSellerModal = (item) => {
    setUpdateModal(true);
    setUpdateModalValue(item);
  };
  //page serial number
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);
  //Delete seller
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You won't be able to revert this ${item?.user_name} user!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const sendData = {
          _id: item?._id,
        };
        try {
          const response = await fetch(
            `${BASE_URL}/seller/dashboard?role_type=seller_delete`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                credentials: "include",
              },
              body: JSON.stringify(sendData),
            }
          );
          const result = await response.json();
          // console.log(result);
          if (result?.statusCode === 200 && result?.success === true) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: `${item?.user_name} seller has been deleted!`,
              icon: "success",
            });
          } else {
            toast.error(result?.message, {
              autoClose: 1000,
            });
          }
        } catch (error) {
          toast.error("Network error or server is down", {
            autoClose: 1000,
          });
          console.log(error);
        }
      }
    });
  };
  return (
    <>
      {isLoadingSeller ? (
        <TableLoadingSkeleton />
      ) : (
        <div>
          {/* Table for showing data */}
          {SellerData?.length > 0 ? (
            <div className="mt-5 overflow-x-auto rounded">
              <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded">
                {" "}
                <thead className=" bg-[#fff9ee] ">
                  <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                    <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                      SL
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                      User Name
                    </th>

                    <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                      User Phone
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                      User Role
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                      Is Verified
                    </th>
                    <th className="whitespace-nowrap px-4 py-2.5   text-gray-800 ">
                      Status
                    </th>
                    <th className="px-4 py-2.5 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-center ">
                  {SellerData?.map((item, i) => (
                    <tr
                      key={item?._id}
                      className={`divide-x divide-gray-200 ${
                        i % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                      }`}
                    >
                      {" "}
                      <td className="whitespace-nowrap px-4 py-1.5 font-medium text-gray-900">
                        {serialNumber + i + 1}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold">
                        {item?.user_name}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {item?.user_phone ? item?.user_phone : "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {item?.role_id?.role_name
                          ? item?.role_id?.role_name
                          : "-"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {item?.is_verified === true
                          ? "Verified"
                          : "Un-Verified"}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 font-semibold capitalize">
                        {item?.user_status}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                        <MdDeleteForever
                          onClick={() => handleDelete(item)}
                          className="cursor-pointer text-red-500 hover:text-red-300"
                          size={25}
                        />{" "}
                        <FiEdit
                          onClick={() => handleUpdateSellerModal(item)}
                          className="cursor-pointer text-gray-500 hover:text-gray-300"
                          size={25}
                        />
                      </td>
                      {/* <td className="whitespace-nowrap px-4 py-2 space-x-1 flex items-center justify-center gap-4">
                    {user?.role_id?.staff_delete ||
                    user?.role_id?.staff_update ? (
                      <>
                        {user?.role_id?.staff_delete && (
                          <MdDeleteForever
                            onClick={() => handleDelete(item)}
                            className="cursor-pointer text-red-500 hover:text-red-300"
                            size={25}
                          />
                        )}
                        {user?.role_id?.staff_update && (
                          <FiEdit
                            onClick={() => updateStaffModal(item)}
                            className="cursor-pointer text-gray-500 hover:text-gray-300"
                            size={25}
                          />
                        )}
                      </>
                    ) : (
                      <small>Access Denied</small>
                    )}
                  </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <NoDataFound />
          )}
          {/* Update Sub Category */}

          {totalData > 10 && (
            <Pagination
              totalData={totalData}
              setPage={setPage}
              setLimit={setLimit}
              page={page}
              limit={limit}
            />
          )}

          {/* Update seller component */}
          {updateModal && (
            <UpDateAllSeller
              setUpdateModal={setUpdateModal}
              updateModalValue={updateModalValue}
              refetch={refetch}
              roleData={roleData}
              isLoading={isLoading}
              user={user}
            />
          )}
        </div>
      )}
    </>
  );
};

export default AllSellerTableList;
