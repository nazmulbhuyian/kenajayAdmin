import { Link } from "react-router-dom";
import Pagination from "../common/pagination/Pagination";

import TableLoadingSkeleton from "../common/loadingSkeleton/TableLoadingSkeleton";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";

const OrderTable = ({
  ordersData,

  limit,
  page,
  setPage,
  setLimit,
  isLoading,

  totalData,
}) => {
  const [serialNumber, setSerialNumber] = useState();

  useEffect(() => {
    const newSerialNumber = (page - 1) * limit;
    setSerialNumber(newSerialNumber);
  }, [page, limit]);
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

                  <td className="whitespace-nowrap p-4 ">Invoice No</td>
                  <td className="whitespace-nowrap p-4 ">Customer Name</td>
                  <td className="whitespace-nowrap p-4 ">Customer Phone</td>
                  <td className="whitespace-nowrap p-4 ">Order Status</td>
                  <td className="whitespace-nowrap p-4 ">Billing Address</td>
                  <td className="whitespace-nowrap p-4 ">Shipping Location</td>
                  <td className="whitespace-nowrap p-4 ">Verified Status</td>
                  <td className="whitespace-nowrap p-4 ">Shipping Cost</td>
                  <td className="whitespace-nowrap p-4 ">Total Amount</td>
                  <td className="whitespace-nowrap p-4 ">Grand Total Amount</td>
                  <td className="whitespace-nowrap p-4 ">Discount Amount</td>
                  <td className="whitespace-nowrap p-4 ">View Details</td>
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
                      {" "}
                      {serialNumber + index + 1}
                    </td>

                    <td className="whitespace-nowrap p-4">
                      {order?.invoice_id}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.customer_id?.user_name}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.customer_id?.user_phone}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.order_status}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.billing_address}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.shipping_location}
                    </td>

                    <td className="whitespace-nowrap p-4">
                      {order?.customer_id?.is_verified === true ? (
                        <span>Verified</span>
                      ) : (
                        <span>Un-verified</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.shipping_cost}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.sub_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.grand_total_amount}
                    </td>
                    <td className="whitespace-nowrap p-4">
                      {" "}
                      {order?.discount_amount}
                    </td>
                    <td className="whitespace-nowrap p-4 flex justify-center">
                      <Link
                        to={`/all-order-info/${order?._id}`}
                        className=" text-gray-500 hover:text-gray-900"
                      >
                        <FaRegEye size={23} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* pagination */}
          {totalData > 10 && (
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
    </>
  );
};

export default OrderTable;
