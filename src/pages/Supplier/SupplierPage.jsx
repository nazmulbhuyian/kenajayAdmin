import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { BASE_URL } from "../../utils/baseURL";
import AddSupplier from "../../components/Supplier/AddSupplier";
import useDebounced from "../../hooks/useDebounced";
import SupplierTable from "../../components/Supplier/SupplierTable";
// import SupplierTable from "../../components/Supplier/SupplierTable";

const SupplierPage = () => {
  //Add staff modal open state
  const [openAddModal, setOpenAddModal] = useState(false);
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
  const handleSearchValue = (value) => {
    setSearchValue(value);
    setLimit(10);
    setPage(1);
  };

  const {
    data: supplierData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [
      `/api/v1/supplier/${
        user?.panel_owner_id ? user?.panel_owner_id : user?._id
      }?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=staff_show`,
    ],
    queryFn: async () => {
      const res = await fetch(
        `${BASE_URL}/supplier/${
          user?.panel_owner_id ? user?.panel_owner_id : user?._id
        }?page=${page}&limit=${limit}&searchTerm=${searchTerm}&role_type=staff_show`,
        {
          credentials: "include",
        }
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div className="bg-white rounded py-6 px-4 shadow">
      <div className="flex justify-between mt-6">
        <div>
          <h1 className="text-2xl">All Supplier List </h1>
        </div>
        <div>
          <div>
            <button
              className="h-[40px] rounded-[8px] py-[10px] px-[14px] bg-primaryColor hover:bg-blue-500 duration-200  text-white text-sm"
              onClick={() => setOpenAddModal(true)}
            >
              Add Supplier
            </button>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search Supplier..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>
      {/* show All Supplier Table List Component*/}
      <SupplierTable
        supplierData={supplierData?.data}
        refetch={refetch}
        limit={limit}
        page={page}
        setPage={setPage}
        setLimit={setLimit}
        isLoading={isLoading}
        user={user}
        totalData={supplierData?.totalData}
      />

      {/* add all ReSeller modal component */}
      {openAddModal && (
        <AddSupplier
          setOpenAddModal={setOpenAddModal}
          refetch={refetch}
          user={user}
        />
      )}
    </div>
  );
};

export default SupplierPage;
