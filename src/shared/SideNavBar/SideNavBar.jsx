import { useEffect, useState } from "react";
import { logo } from "../../utils/imageImport";
import { Link, useLocation } from "react-router-dom";
import {
  MdOutlineAddchart,
  MdOutlineCampaign,
  MdOutlineFlashAuto,
  MdOutlineReviews,
} from "react-icons/md";
import { BiMoneyWithdraw, BiTask } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { GrAnnounce } from "react-icons/gr";
import { BsChatSquareQuoteFill, BsShieldPlus } from "react-icons/bs";
import {
  PiFlagBannerFill,
  PiGitPullRequestBold,
  PiUsersThree,
} from "react-icons/pi";
import { TbCategoryPlus } from "react-icons/tb";

import { FiUsers } from "react-icons/fi";
import { ChildMenuItem, DropdownMenu, MenuItem } from "./DropdownAndMenuItem";
import { IoSettings } from "react-icons/io5";

import { RiCoupon3Line } from "react-icons/ri";
import { FaAllergies, FaBorderAll } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { TfiLayoutSliderAlt } from "react-icons/tfi";

const SideNavBar = () => {
  const { pathname } = useLocation();
  const [activeDropdown, setActiveDropdown] = useState(null); // Centralized state to track open dropdown
  useEffect(() => {
    // Retrieve active dropdown from localStorage when the component mounts
    const saveDropDown = localStorage.getItem("activeDropdown");
    if (saveDropDown) {
      setActiveDropdown(saveDropDown);
    }
  }, []);

  // Toggle dropdowns, collapse others when one is opened
  const toggleDropdown = (dropdown) => {
    const newActiveDropdown = activeDropdown === dropdown ? null : dropdown;
    setActiveDropdown(newActiveDropdown);

    localStorage.setItem("activeDropdown", newActiveDropdown);
  };

  // Collapse all dropdowns when a menu item is clicked
  const closeAllDropdowns = () => {
    setActiveDropdown(null);
    localStorage.removeItem("activeDropdown");
  };
  const isActive = (route) =>
    pathname === route
      ? "bg-blueColor-600 text-white font-semibold border-blueColor-100 "
      : "";

  return (
    <div className="flex flex-col min-h-screen bg-blueColor-800 text-gray-50">
      <div className="flex-grow">
        {/* Logo */}
        <div className="flex items-center justify-center border-b border-blueColor-600 mt-1 pb-3">
          <Link to="/">
            <img src={logo} alt="Logo" width={200} height={100} />
          </Link>
        </div>
        {/* Menu */}
        <ul className="flex flex-col pb-4 space-y-[2px]">
          <MenuItem
            to="/"
            icon={GoHome}
            label="Dashboard"
            isActive={isActive("/")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />

          <DropdownMenu
            label="Task"
            icon={BiTask}
            isOpen={activeDropdown === "task"}
            onClick={() => toggleDropdown("task")}
          >
            <ChildMenuItem
              to="/category"
              icon={TbCategoryPlus}
              label="Category"
              isActive={isActive("/category")}
            />
            <ChildMenuItem
              to="/sub-category"
              icon={TbCategoryPlus}
              label="Sub Category"
              isActive={isActive("/sub-category")}
            />
            <ChildMenuItem
              to="/child-category"
              icon={TbCategoryPlus}
              label="Child Category"
              isActive={isActive("/child-category")}
            />
            <ChildMenuItem
              to="/brand-category"
              icon={TbCategoryPlus}
              label="Brand Category"
              isActive={isActive("/brand-category")}
            />
            <ChildMenuItem
              to="/specification-list"
              icon={TbCategoryPlus}
              label="Specification"
              isActive={isActive("/specification-list")}
            />
            <ChildMenuItem
              to="/attribute"
              icon={TbCategoryPlus}
              label="Attribute"
              isActive={isActive("/attribute")}
            />
          </DropdownMenu>

          <DropdownMenu
            label="Products"
            icon={BiTask}
            isOpen={activeDropdown === "products"}
            onClick={() => toggleDropdown("products")}
          >
            <ChildMenuItem
              to="/product/product-list"
              icon={TbCategoryPlus}
              label="Product List"
              isActive={isActive("/product/product-list")}
            />
            <ChildMenuItem
              to="/product/self-product-list"
              icon={TbCategoryPlus}
              label="Self Product List"
              isActive={isActive("/product/self-product-list")}
            />
            <ChildMenuItem
              to="/product/product-create"
              icon={TbCategoryPlus}
              label="Add Product"
              isActive={isActive("/product/product-create")}
            />
          </DropdownMenu>

          <DropdownMenu
            label="Campaign"
            icon={MdOutlineCampaign}
            isOpen={activeDropdown === "campaign"}
            onClick={() => toggleDropdown("campaign")}
          >
            <ChildMenuItem
              to="/campaign-list"
              icon={GrAnnounce}
              label="Campaign List"
              isActive={isActive("/campaign-list")}
            />
            <ChildMenuItem
              to="/your-campaign"
              icon={GrAnnounce}
              label="Your Campaign Product"
              isActive={isActive("/your-campaign")}
            />
            <ChildMenuItem
              to="/add-campaign"
              icon={MdOutlineAddchart}
              label="Add Campaign"
              isActive={isActive("/add-campaign")}
            />
          </DropdownMenu>

          <DropdownMenu
            label="Staff"
            icon={FiUsers}
            isOpen={activeDropdown === "staff"}
            onClick={() => toggleDropdown("staff")}
          >
            <ChildMenuItem
              to="/all-staff"
              icon={PiUsersThree}
              label="All Staff"
              isActive={isActive("/all-staff")}
            />
            <ChildMenuItem
              to="/create-staff-role"
              icon={BsShieldPlus}
              label="Add Staff Role"
              isActive={isActive("/create-staff-role")}
            />
            <ChildMenuItem
              to="/staff-role"
              icon={BsShieldPlus}
              label="Staff Role"
              isActive={isActive("/staff-role")}
            />
          </DropdownMenu>

          <DropdownMenu
            label="Seller"
            icon={AiOutlineUsergroupAdd}
            isOpen={activeDropdown === "seller"}
            onClick={() => toggleDropdown("seller")}
          >
            <ChildMenuItem
              to="/all-seller"
              icon={FaAllergies}
              label="All Seller"
              isActive={isActive("/all-seller")}
            />
            <ChildMenuItem
              to="/seller-request"
              icon={PiGitPullRequestBold}
              label="Seller Request"
              isActive={isActive("/seller-request")}
            />
          </DropdownMenu>

          <MenuItem
            to="/supplier"
            icon={FaUsers}
            label="Supplier"
            isActive={isActive("/supplier")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />
          <MenuItem
            to="/review"
            icon={MdOutlineReviews}
            label="Review"
            isActive={isActive("/review")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />
          <DropdownMenu
            label="Coupon"
            icon={BiTask}
            isOpen={activeDropdown === "coupons"}
            onClick={() => toggleDropdown("coupons")}
          >
            <ChildMenuItem
              to="/coupon"
              icon={RiCoupon3Line}
              label="All Coupon"
              isActive={isActive("/coupon")}
            />
            <ChildMenuItem
              to="/your-coupon"
              icon={RiCoupon3Line}
              label="Your Coupon"
              isActive={isActive("/your-coupon")}
            />
          </DropdownMenu>

          <MenuItem
            to="/banner"
            icon={PiFlagBannerFill}
            label="Banner"
            isActive={isActive("/banner")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />
          <MenuItem
            to="/slider"
            icon={TfiLayoutSliderAlt}
            label="Slider"
            isActive={isActive("/slider")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />
          <MenuItem
            to="/settings"
            icon={IoSettings}
            label="Setting"
            isActive={isActive("/settings")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />

          <MenuItem
            to="/shop-settings"
            icon={IoSettings}
            label="Shop Setting"
            isActive={isActive("/shop-settings")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />
          <MenuItem
            to="/support"
            icon={MdOutlineFlashAuto}
            label="Support"
            isActive={isActive("/support")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />
          <MenuItem
            to="/order"
            icon={FaBorderAll}
            label="Order"
            isActive={isActive("/order")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />
          <MenuItem
            to="/withdraw"
            icon={BsChatSquareQuoteFill}
            label="WithDrawal Method"
            isActive={isActive("/withdraw")}
            onClick={closeAllDropdowns} // Close all dropdowns when clicked
          />
          {/* WithDrawal Req */}

          <DropdownMenu
            label="Withdrawal Request"
            icon={BiTask}
            isOpen={activeDropdown === "WithdrawalRequest"}
            onClick={() => toggleDropdown("WithdrawalRequest")}
          >
            <ChildMenuItem
              to="/all-withdraw"
              icon={BiMoneyWithdraw}
              label="All WithDrawal"
              isActive={isActive("/all-withdraw")}
            />
            <ChildMenuItem
              to="/pending-withdraw"
              icon={BiMoneyWithdraw}
              label="Pending WithDrawal"
              isActive={isActive("/pending-withdraw")}
            />
            <ChildMenuItem
              to="/success-withdraw"
              icon={BiMoneyWithdraw}
              label="Success WithDrawal"
              isActive={isActive("/success-withdraw")}
              onClick={closeAllDropdowns}
            />
          </DropdownMenu>
        </ul>
      </div>
    </div>
  );
};

export default SideNavBar;
