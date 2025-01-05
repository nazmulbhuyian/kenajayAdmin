import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import Pagination from "../common/pagination/Pagination";
import ViewSelfOrderDetails from "./ViewSelfOrderDetails";
import { BASE_URL } from "../../utils/baseURL";
import { toast } from "react-toastify";

const SelfOrderTable = ({
  ordersData,
  limit,
  page,
  setPage,
  setLimit,
  isLoading,
  totalData,
  refetch
}) => {
  const [serialNumber, setSerialNumber] = useState();
  const [openOrdersDetailsMoadal, setOpenOrdersDetailsMoadal] = useState();
  const [ordersDetailsData, setOrdersDetailsData] = useState();

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);
  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);

  const handleViewOrderDetails = (order) => {
    setOpenOrdersDetailsMoadal(true);
    setOrdersDetailsData(order);
  };

  //   handle order status
  const handleOrderStatus = async (
    order_status,
    _id,
    orders,
    customer_id,
    grand_total_amount
  ) => {
    try {
      const sendData = {
        _id: _id,
        order_status: order_status,
        order_status_update: true,
        customer_id: customer_id,
        grand_total_amount: grand_total_amount,
        order_orders: orders?.map((item) => ({
          order_id: item?.order_id?._id,
          order_quantity: item?.order_quantity,
          product_price: item?.product_price,
          product_buying_price: item?.product_buying_price,
          product_total_price: item?.product_total_price,
        })),
      };

      const response = await fetch(`${BASE_URL}/order`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const result = await response.json();
      if (result?.statusCode === 200 && result?.success === true) {
        toast.success(
          result?.message ? result?.message : "Status Update successfully",
          {
            autoClose: 1000,
          }
        );
        refetch();
      } else {
        toast.error(result?.message || "Something went wrong", {
          autoClose: 1000,
        });
        refetch();
      }
    } catch (error) {
      toast.error(error?.message, {
        autoClose: 1000,
      });
      refetch();
    } finally {
      refetch();
    }
  };

  return (
    <>
      {isLoading ? (
        <TableLoadingSkeleton />
      ) : (
        <div className="">
          {/* Make the table wrapper horizontally scrollable */}
          <div className="mt-5 overflow-x-auto rounded ">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded">
              <thead className="bg-[#fff9ee]">
                <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                  <td className="whitespace-nowrap p-4 ">SL No</td>

                  <td className="whitespace-nowrap p-4 ">Delivery Status</td>
                  <td className="whitespace-nowrap p-4 ">Discount</td>
                  <td className="whitespace-nowrap p-4 ">Sub Total Amount</td>
                  <td className="whitespace-nowrap p-4 ">Grand Total Amount</td>
                  <td className="whitespace-nowrap p-4 ">View Order Details</td>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-center">
                {ordersData?.map((order, index) => (
                  <tr
                    key={order?._id}
                    className={`divide-x divide-gray-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-tableRowBGColor"
                    }`}
                  >
                    <td className="whitespace-nowrap p-4">
                      {serialNumber + index + 1}
                    </td>

                    <td className="whitespace-nowrap p-4">
                      <select
                        onChange={(e) =>
                          handleOrderStatus(
                            e.target.value,
                            order
                          )
                        }
                        id="delivery_status"
                        className="block w-full px-1 py-1 text-gray-700 bg-white border border-gray-200 rounded-xl cursor-pointer"
                      >
                        <option selected value={order?.delivery_status}>
                          {order?.delivery_status}
                        </option>
                        {order?.delivery_status == "processing" && (
                          <option value="shipped">Shipped</option>
                        )}
                        {order?.delivery_status == "shipped" && (
                          <option value="delivered">Delivered</option>
                        )}
                        {order?.delivery_status == "processing" && (
                          <option value="cancel">Cancel</option>
                        )}
                      </select>
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {order?.discount_amount}
                    </td>

                    <td className="whitespace-nowrap p-4">
                      {order?.sub_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {order?.grand_total_amount}
                    </td>

                    <td className="whitespace-nowrap p-4 flex justify-center">
                      <FaRegEye
                        onClick={() => handleViewOrderDetails(order)}
                        className="cursor-pointer text-gray-500
                      hover:text-gray-900"
                        size={25}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* pagination */}
          {totalData > 2 && (
            <Pagination
              page={page}
              setPage={setPage}
              limit={limit}
              setLimit={setLimit}
              totalData={totalData}
            />
          )}
        </div>
      )}
      {openOrdersDetailsMoadal && (
        <ViewSelfOrderDetails
          setOpenOrdersDetailsMoadal={setOpenOrdersDetailsMoadal}
          ordersDetailsData={ordersDetailsData}
        />
      )}
    </>
  );
};

export default SelfOrderTable;
