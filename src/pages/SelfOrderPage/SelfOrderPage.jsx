import { useQuery } from "@tanstack/react-query";
import { useContext,  useState } from "react";
import { BASE_URL } from "../../utils/baseURL";
import { AuthContext } from "../../context/AuthProvider";
import SelfOrderTable from "../../components/SelfOrder/SelfOrderTable";
//import useDebounced from "../../hooks/useDebounced";

const SelfOrderPage = () => {
  const { user } = useContext(AuthContext);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchValue, setSearchValue] = useState("");

  const panel_owner_id = user?._id;

  // const searchText = useDebounced({ searchQuery: searchValue, delay: 500 });
  // useEffect(() => {
  //   setSearchTerm(searchText);
  // }, [searchText]);

  // //handle item search function....
  // const handleSearchValue = (value) => {
  //   setSearchValue(value);
  //   setLimit(10);
  //   setPage(1);
  // };
  const { data: ordersData, isLoading, refetch } = useQuery({
    queryKey: [
      `/api/v1/order/seller/dashboard?panel_owner_id=${panel_owner_id}&page=${page}&limit=${limit}`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/order/seller/dashboard?panel_owner_id=${panel_owner_id}&page=${page}&limit=${limit}`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(ordersData);

  return (
    <div className="bg-white rounded py-6 px-4 shadow">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl">Order List</h1>
        </div>
      </div>
      {/* <div className="mt-3 flex justify-end">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search Order..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div> */}
      {/* show All Order Table List Component*/}
      <SelfOrderTable
        ordersData={ordersData?.data}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        isLoading={isLoading}
        user={user}
        totalData={ordersData?.totalData}
        refetch={refetch}
      />
    </div>
  );
};

export default SelfOrderPage;
