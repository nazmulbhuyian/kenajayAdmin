import { useState } from "react";
import Pagination from "./../common/pagination/Pagination";
import { BiShow } from "react-icons/bi";
import { MdDeleteForever } from "react-icons/md";
import SuccessWithdrawalDescription from "./SuccessWithdrawalDescription";
import { FiEdit } from "react-icons/fi";

const SuccessWithDrawlTable = () => {
  const [desCription, setDesCription] = useState(false);
  const [desCriptionDATA, setDesCriptionDATA] = useState("");

  const handleDescription = (data) => {
    setDesCription(true);
    setDesCriptionDATA(data);
  };
  return (
    <div>
      <div className="rounded-lg border border-gray-200 mt-6">
        <div className="overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right bg-[#fff9ee]">
              <tr className="divide-x divide-gray-300  font-semibold text-center text-gray-900">
                <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                  SL No
                </th>
                <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                  Payment Method Name
                </th>
                <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                  Payment Method Img
                </th>
                <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                  Minimum Withdraw Amount
                </th>
                <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                  Payment Method Status
                </th>
                <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                  Description
                </th>
                <th className="whitespace-nowrap p-4 font-medium text-gray-900">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 text-center">
              <tr className="divide-x divide-gray-200 ">
                <td className="whitespace-nowrap px-4  py-1.5 font-medium text-gray-900">
                  1
                </td>
                <td className="whitespace-nowrap px-4  py-1.5 font-medium text-gray-900"></td>
                <td className="whitespace-nowrap px-4  py-1.5 text-gray-700 flex justify-center">
                  <img
                    className="w-[44px] h-[44px] rounded-[8px] "
                    src=""
                    alt=""
                  />
                </td>
                <td className="whitespace-nowrap px-4  py-1.5 text-gray-700"></td>
                <td className="whitespace-nowrap px-4  py-1.5 text-gray-700">
                  {/* {withDrawMethod?.payment_method_status ===
                          "active" ? (
                            <button
                              className="bg-bgBtnActive text-btnActiveColor px-[10px] py-[4px] rounded-[8px]"
                              onClick={() =>
                                handleWithdrawalActiveStatus(
                                  withDrawMethod?._id,
                                  withDrawMethod?.payment_method_status
                                    ? "in-active"
                                    : "active"
                                )
                              }
                            >
                              <span>Active</span>
                            </button>
                          ) : (
                            <button
                              className="bg-bgBtnInactive text-btnInactiveColor px-[10px] py-[4px] rounded-[8px]"
                              onClick={() =>
                                handleWithdrawalInActiveStatus(
                                  withDrawMethod?._id,
                                  withDrawMethod?.payment_method_status
                                    ? "active"
                                    : "in-active"
                                )
                              }
                            >
                              <span>In-Active</span>
                            </button>
                          )} */}
                  <button className="bg-bgBtnActive text-btnActiveColor px-[10px] py-[4px] rounded-[8px]">
                    <span>Active</span>
                  </button>
                </td>
                <td className="whitespace-nowrap px-4 py-1.5 ">
                  <button onClick={handleDescription}>
                    <BiShow
                      size={24}
                      className="text-gray-900 hover:text-gray-500"
                    />
                  </button>
                </td>
                <td className="whitespace-nowrap px-4  py-1.5 text-gray-700">
                  <button className="ml-[8px]">
                    <MdDeleteForever
                      className="cursor-pointer text-red-500 hover:text-red-300"
                      size={25}
                      //   onClick={() =>
                      //     handleDeleteWithdrawalTableRow(withDrawMethod)
                      //   }
                    />
                  </button>

                  <button
                      className="ml-[8px]"
                      // onClick={() =>
                      //   handleWithDrawalUpdateModal(withDrawMethod)
                      // }
                    >
                      <FiEdit
                        size={25}
                        className="cursor-pointer text-gray-500 hover:text-gray-300"
                      />
                    </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* pagination */}

      <Pagination />

      {desCription && (
        <SuccessWithdrawalDescription
          setDesCription={setDesCription}
          desCriptionDATA={desCriptionDATA}
        />
      )}
    </div>
  );
};

export default SuccessWithDrawlTable;
