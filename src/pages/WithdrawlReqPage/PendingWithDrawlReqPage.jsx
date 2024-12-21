import PendingWithDrawalTable from "./../../components/WithDrawalReq/PendingWithDrawalTable";

const PendingWithDrawlReqPage = () => {
  return (
    <div className="bg-white rounded-lg py-6 px-4 shadow">
      <div className=" mt-6">
        <div>
          <h1 className="text-2xl">Pending Withdrawal Request</h1>
        </div>
      </div>
      {/* search Pending Request... */}
      <div className="mt-3 flex justify-end">
        <input
          type="text"
          // defaultValue={searchTerm}
          // onChange={(e) => handleSearchValue(e.target.value)}
          placeholder="Search Pending Request..."
          className="w-full sm:w-[350px] px-4 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
        />
      </div>

      {/* Show pending Withdrawal  table data  */}
      <PendingWithDrawalTable />
    </div>
  );
};

export default PendingWithDrawlReqPage;
