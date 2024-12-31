import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/baseURL";
import { LoaderOverlay } from "../common/loader/LoderOverley";

const ViewAllOrderInfo = () => {
  const { id } = useParams();

  const { data: orders, isLoading } = useQuery({
    queryKey: [`/api/v1/order/${id}`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/order/${id}`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
  });
  if (isLoading) {
    return <LoaderOverlay />;
  }
  console.log(orders);

  return (
    <section className="max-w-7xl mx-auto">
      {/* Order Product */}

      <div className="">
        <div className="flex justify-between bg-[#fff9ee] p-2.5 shadow-md rounded ">
          <p className="text-xl">Order Information</p>
        </div>
        <div className="bg-[#fff9ee] p-2.5 shadow-md rounded grid grid-cols-4 divide-x-2 divide-gray-800 mt-3 gap-4">
          <div className="bg-red-400 px-4">name</div>

          <div className="bg-blue-400  px-4">invice</div>
          <div className="bg-purple-400  px-4">date issue</div>
          <div className="bg-yellow-500  px-4">Total</div>
        </div>
        <div className="mt-3">
          {orders?.data?.order_products?.map((shop, index) => (
            <div
              key={index}
              className="mb-4 overflow-x-auto bg-[#fff9ee] p-4 shadow-md rounded"
            >
              <p className="text-lg font-medium">{shop?.shop_id?.shop_name}</p>
              <table className="min-w-full text-sm ">
                <thead className="border-b">
                  <tr className="text-gray-900">
                    <th className="whitespace-nowrap p-4">SL</th>
                    <th className="whitespace-nowrap p-4">Image</th>
                    <th className="whitespace-nowrap p-4">Product Info</th>
                    <th className="whitespace-nowrap p-4">Unit Price</th>
                    <th className="whitespace-nowrap p-4">Quantity</th>
                    <th className="whitespace-nowrap p-4">Total Price</th>
                  </tr>
                </thead>
                <tbody className="divide-gray-200">
                  {shop?.order_products?.map((product, idx) => (
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
                                Variation:{" "}
                                {product?.variation_id?.variation_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 px-4">
                        ৳ {product?.product_unit_price}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 px-4">
                        {product?.product_quantity}
                      </td>
                      <td className="whitespace-nowrap py-2.5 font-medium text-gray-700 px-4">
                        ৳{product?.product_grand_total_price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="sm:text-right text-text-default mt-2.5 ">
                <p className="text-sm">
                  <strong>Shop Subtotal:</strong> ৳{shop?.sub_total_amount}
                </p>
                <p className="text-sm">
                  <strong>Discount Amount:</strong> ৳{shop?.discount_amount}
                </p>
                <p className="text-sm">
                  <strong>Grand Total:</strong> ৳{shop?.grand_total_amount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Product */}
    </section>
  );
};

export default ViewAllOrderInfo;
