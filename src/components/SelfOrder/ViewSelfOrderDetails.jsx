import { RxCross1 } from "react-icons/rx";

const ViewSelfOrderDetails = ({
  setOpenOrdersDetailsMoadal,
  ordersDetailsData,
}) => {
  console.log(ordersDetailsData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative overflow-hidden text-left bg-white rounded-lg shadow-xl w-[1250px] p-6 max-h-[100vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3
            className="text-[26px] font-bold text-gray-800 capitalize"
            id="modal-title"
          >
            Order Information
          </h3>
          <button
            type="button"
            className="btn bg-white hover:bg-bgBtnInactive hover:text-btnInactiveColor  p-1 absolute right-3 rounded-full top-3"
            onClick={() => setOpenOrdersDetailsMoadal(false)}
          >
            {" "}
            <RxCross1 size={20}></RxCross1>
          </button>
        </div>

        <hr className="mt-2 mb-4" />

        {ordersDetailsData?.coupon_id && (
          <div className="my-3 bg-[#fff9ee shadow-md p-4">
            <p className="text-xl font-medium mb-2">Coupon Information</p>
            <div className="grid grid-cols-2 gap-y-1">
              <p className="  uppercase">Coupon Code</p>
              <p className="  ">{ordersDetailsData?.coupon_id?.coupon_code}</p>
              <p className=" ">Coupon Type</p>
              <p className=" ">{ordersDetailsData?.coupon_id?.coupon_type}</p>
              <p className=" ">Coupon Amount</p>
              <p className=" ">{ordersDetailsData?.coupon_id?.coupon_amount}</p>
            </div>
          </div>
        )}

        <div className="mt-3">
          <table className="min-w-full text-sm ">
            <thead className="border-b">
              <tr className="text-gray-900 text-center">
                <th className="whitespace-nowrap p-4">SL</th>
                <th className="whitespace-nowrap p-4">Image</th>
                <th className="whitespace-nowrap p-4">Product Name</th>
                <th className="whitespace-nowrap p-4">Product Unit Price</th>
                <th className="whitespace-nowrap p-4">Campaign Price</th>

                <th className="whitespace-nowrap p-4">Quantity</th>
                <th className="whitespace-nowrap p-4">Total Price</th>
              </tr>
            </thead>
            <tbody className="divide-gray-200">
              {ordersDetailsData?.order_products?.map((product, idx) => (
                <tr
                  key={idx}
                  className={`divide-y divide-gray-100 space-y-2 py-2 text-center ${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="whitespace-nowrap p-4">{idx + 1}</td>
                  <td className="py-2">
                    {product?.variation_id ? (
                      <img
                        src={product?.variation_id?.variation_image}
                        className="w-20 h-[72px] rounded-md border"
                        alt=""
                      />
                    ) : (
                      <img
                        src={product?.product_id?.main_image}
                        className="w-20 h-[72px] rounded-md border"
                        alt=""
                      />
                    )}
                  </td>
                  <td className="min-w-[260px] py-2.5 text-gray-700 px-4">
                    <div className="mt-1">
                      <p className="mb-1">
                        {product?.product_id?.product_name}
                      </p>
                      <div className="text-text-Lighter items-center">
                        {/* <p>Brand: {product?.brand}</p> */}
                        {product?.variation_id && (
                          <p>
                            Variation: {product?.variation_id?.variation_name}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 px-4">
                    ৳ {product?.product_unit_price}
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 px-4">
                    {product?.campaign_id ? (
                      <>{product?.campaign_id?.campaign_product_price}</>
                    ) : (
                      "Not Campaign Product"
                    )}
                  </td>

                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 px-4">
                    {product?.product_quantity}
                  </td>
                  <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 px-4">
                    ৳ {product?.product_grand_total_price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewSelfOrderDetails;
