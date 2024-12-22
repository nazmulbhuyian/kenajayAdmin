import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import NotFound from "../shared/NotFound/NotFound";
import CategoryPage from "../pages/CategoryPage/CategoryPage";
import SubcategoryPage from "../pages/SubCategoryPage/SubcategoryPage";
import ChildCategoryPage from "../pages/ChildCategoryPage/ChildCategoryPage";
import BrandPage from "../pages/BrandPage/BrandPage";
import SpecificationPage from "../pages/SpecificationPage/SpecificationPage";
import AttributePage from "../pages/AttributePage/AttributePage";
import AllStaffPage from "../pages/StaffAndRolePage/AllStaffPage/AllStaffPage";
import StaffRoleTablePage from "../pages/StaffAndRolePage/StaffRoleTablePage/StaffRoleTablePage";
import ReviewPage from "../pages/ReviewPage/ReviewPage";
import CampaignListPage from "../pages/CampaignPage/CampaignListPage/CampaignListPage";
import AddStaffRolePage from "../pages/StaffAndRolePage/AddStaffRolePage/AddStaffRolePage";
import AddProductPage from "../pages/ProductPage/AddProductPage/AddProductPage";
import ProductListTablePage from "../pages/ProductPage/ProductListTablePage/ProductListTablePage";
import AddCampaignPage from "../pages/CampaignPage/AddCampaignPage/AddCampaignPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import CouponPage from "../pages/CouponPage/CouponPage";
import AllSeller from "../pages/SellerPage/AllSellerPage/AllSeller";
import SellerRequest from "../pages/SellerPage/SellerRequestPage/SellerRequest";
import ProductUpdatePage from "../pages/ProductPage/ProductUpdatePage/ProductUpdatePage";
import SupplierPage from "../pages/Supplier/SupplierPage";
import ClientSingleCampaignList from "../pages/CampaignPage/ClientSingleCampaignList/ClientSingleCampaignList";
import YourCoupon from "../pages/CouponPage/YourCouponPage.jsx/YourCoupon";
import SelfProductTablePage from "../pages/ProductPage/SelfProductTablePage/SelfProductTablePage";
import BannerPage from "../pages/Banner/BannerPage";
import SliderPage from "../pages/SliderPage/SliderPage";
import SettingPage from "../pages/SettingPage/SettingPage";
import SupportPage from "../pages/SupportPage/SupportPage";
import WithDrawlMethod from "../pages/WithdrawlMethodsPage/WithDrawlMethod";
import ShopSettingsPage from "../pages/ShopSettingPage/ShopSettingsPage";
import PrivateRoute from "./privateRoute/PrivateRoute";
import ALLWithDrawlReqPage from "../pages/WithdrawlReqPage/ALLWithDrawlReqPage";
import PendingWithDrawlReqPage from "../pages/WithdrawlReqPage/PendingWithdrawlReqPage";
import SuccessWithDrawlReqPage from "../pages/WithdrawlReqPage/SuccessWithDrawlReqPage";
import AddCoupon from "../components/Coupon/AddCoupon";

const route = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
      },
      // ------Task Start------
      {
        path: "/category",
        element: <CategoryPage />,
      },
      {
        path: "/sub-category",
        element: <SubcategoryPage />,
      },
      {
        path: "/child-category",
        element: <ChildCategoryPage />,
      },
      {
        path: "/brand-category",
        element: <BrandPage />,
      },
      {
        path: "/specification-list",
        element: <SpecificationPage />,
      },
      {
        path: "/attribute",
        element: <AttributePage />,
      },

      // ------Task End------
      // ------Product Start------
      {
        path: "/product/product-create",
        element: <AddProductPage />,
      },
      {
        path: "/product/product-update/:id",
        element: <ProductUpdatePage />,
      },
      {
        path: "/product/product-list",
        element: <ProductListTablePage />,
      },
      {
        path: "/product/self-product-list",
        element: <SelfProductTablePage />,
      },
      // ------Product End-------
      // ------ Campaign Start----
      {
        path: "/add-campaign",
        element: <AddCampaignPage />,
      },
      {
        path: "/your-campaign",
        element: <ClientSingleCampaignList />,
      },
      {
        path: "/campaign-list",
        element: <CampaignListPage />,
      },
      // ------ Campaign End ----
      // ------Staff And Role----
      {
        path: "/all-staff",
        element: <AllStaffPage />,
      },
      {
        path: "/staff-role",
        element: <StaffRoleTablePage />,
      },
      {
        path: "/create-staff-role",
        element: <AddStaffRolePage />,
      },

      // ------Staff And Role End----
      {
        path: "/review",
        element: <ReviewPage />,
      },

      //------Coupon start-----//
      {
        path: "/coupon",
        element: <CouponPage />,
      },
      {
        path: "/your-coupon",
        element: <YourCoupon />,
      },
      {
        path: "/add-coupon",
        element: <AddCoupon />,
      },
      //------Coupon End-----//

      //----sell start----//
      {
        path: "/all-seller",
        element: <AllSeller />,
      },
      {
        path: "/seller-request",
        element: <SellerRequest />,
      },
      {
        path: "/supplier",
        element: <SupplierPage />,
      },

      //....Banner Page Start....//
      {
        path: "/banner",
        element: <BannerPage />,
      },
      //....Slider Page Start....//
      {
        path: "/slider",
        element: <SliderPage />,
      },
      //....Site Settings Page....//
      {
        path: "/settings",
        element: <SettingPage />,
      },
      //....Shop Settings Page....//
      {
        path: "/shop-settings",
        element: <ShopSettingsPage />,
      },

      //......Req....//
      {
        path: "/support",
        element: <SupportPage />,
      },
      {
        path: "/withdraw",
        element: <WithDrawlMethod />,
      },
      //......With Drawl Req Page....//
      {
        path: "/all-withdraw",
        element: <ALLWithDrawlReqPage />,
      },
      {
        path: "/pending-withdraw",
        element: <PendingWithDrawlReqPage />,
      },
      {
        path: "/success-withdraw",
        element: <SuccessWithDrawlReqPage />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
]);

export default route;
