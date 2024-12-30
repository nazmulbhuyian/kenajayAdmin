import { Link } from "react-router-dom";
import Pagination from "../common/pagination/Pagination";
import { FiExternalLink } from "react-icons/fi";

const OrderTable = () => {
  return (
    <>
      {" "}
      <div className="">
        {/* Make the table wrapper horizontally scrollable */}
        <div className="mt-5 overflow-x-auto rounded ">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm border rounded">
            <thead className="bg-[#fff9ee]">
              <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                <td className="whitespace-nowrap p-4 ">SL No</td>

                <td className="whitespace-nowrap p-4 ">Invoice ID</td>
                <td className="whitespace-nowrap p-4 ">Order Date</td>
                <td className="whitespace-nowrap p-4 ">Subtotal</td>
                <td className="whitespace-nowrap p-4 ">Discount</td>
                <td className="whitespace-nowrap p-4 ">Shipping Cost</td>
                <td className="whitespace-nowrap p-4 ">Payment Status</td>
                <td className="whitespace-nowrap p-4 ">Grand Total</td>
                <td className="whitespace-nowrap p-4 ">Invoice Details</td>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-center">
              <tr className="divide-x divide-gray-200">
                <td className="whitespace-nowrap p-4">1</td>

                <td className="whitespace-nowrap p-4"> #1A9882</td>
                <td className="whitespace-nowrap p-4">12-4-2024</td>
                <td className="whitespace-nowrap p-4">৳ 3000</td>
                <td className="whitespace-nowrap p-4">20%</td>
                <td className="whitespace-nowrap p-4">৳ 50</td>
                <td className="whitespace-nowrap p-4">Active</td>
                <td className="whitespace-nowrap p-4">৳ 5000</td>
                <td className="whitespace-nowrap p-4">
                  <Link className="flex items-center justify-center gap-1 text-primary hover:underline">
                    Visit <FiExternalLink size={16} />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* pagination */}
      <div className="flex justify-end mt-6">
        <Pagination />
      </div>
    </>
  );
};

export default OrderTable;
