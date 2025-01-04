import ShippingInformation from "./ShippingInformation";
import SoftwareInformation from "./SoftwareInformation";

const AllSiteSetting = () => {
  return (
    <div>
      <div className="md:mt-10 mt-8 bg-slate-50 rounded-lg shadow-lg">
        <div className="p-5">
          <h4 className="font-semibold text-[20px] mt-2">
            Shipping Information
          </h4>
          <hr className="mt-2 mb-4" />
          <ShippingInformation />
        </div>
      </div>
      {/*   Software Information */}
      <div className="md:mt-10 mt-8 bg-slate-50 rounded-lg shadow-lg">
        <div className="p-5">
          <h4 className="font-semibold text-[20px] mt-2">
            Software Information
          </h4>
          <hr className="mt-2 mb-4" />
          <SoftwareInformation />
        </div>
      </div>
    </div>
  );
};

export default AllSiteSetting;
