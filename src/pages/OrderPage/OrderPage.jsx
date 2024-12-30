import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import useDebounced from "../../hooks/useDebounced";
import OrderTable from "../../components/Order/OrderTable";

const OrderPage = () => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const { user } = useContext(AuthContext);

  const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  useEffect(() => {
    setSearchTerm(searchText);
  }, [searchText]);

  // handle item search function....
  //   const handleSearchValue = (value) => {
  //     setSearchValue(value);
  //     setLimit(10);
  //     setPage(1);
  //   };

  //   const {
  //     data: ordersData,
  //     isLoading,
  //     refetch,
  //   } = useQuery({
  //     queryKey: [
  //       `/api/v1/supplier/${
  //         user?.panel_owner_id ? user?.panel_owner_id : user?._id
  //       }?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=staff_show`,
  //     ],
  //     queryFn: async () => {
  //       const res = await fetch(
  //         `${BASE_URL}/supplier/${
  //           user?.panel_owner_id ? user?.panel_owner_id : user?._id
  //         }?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=staff_show`,
  //         {
  //           credentials: "include",
  //         }
  //       );
  //       const data = await res.json();
  //       return data;
  //     },
    //   });
    

  return (
    <div className="bg-white rounded py-6 px-4 shadow">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl">Order List</h1>
        </div>
        <div></div>
      </div>
      {/* <div className="mt-3">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search Supplier..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div> */}
      {/* show All Order Table List Component*/}
      <OrderTable
        //ordersData={ordersData?.data}
        //refetch={refetch}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        //isLoading={isLoading}
        user={user}
        //totalData={ordersData?.totalData}
      />

      {/* add all ReSeller modal component */}
    </div>
  );
};

export default OrderPage;
