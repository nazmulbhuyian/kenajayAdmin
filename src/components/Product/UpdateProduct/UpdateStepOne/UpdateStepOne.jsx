import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { BASE_URL } from "../../../../utils/baseURL";
import { LoaderOverlay } from "../../../common/loader/LoderOverley";
import UpdateStepOnePrice from "./UpdateStepOnePrice";
import { toast } from "react-toastify";
import DefaultProductVariation from "./DefaultProductVariation";

const UpdateStepOne = ({
  setCurrentStep,
  setStepOneData,
  stepOneData
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [category_id, setCategory_id] = useState(
    stepOneData?.category_id ? stepOneData?.category_id : ""
  );

  const [category_name, setCategory_name] = useState(
    stepOneData?.category_name ? stepOneData?.category_name : ""
  );
  const [isSub_CategoryOpen, setIsSub_CategoryOpen] = useState(true);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [sub_category_id, setSub_Category_id] = useState(
    stepOneData?.sub_category_id ? stepOneData?.sub_category_id : ""
  );
  const [sub_category_name, setSub_Category_name] = useState(
    stepOneData?.sub_category_name ? stepOneData?.sub_category_name : ""
  );
  const [isChild_CategoryOpen, setIsChild_CategoryOpen] = useState(true);
  const [childCategoryData, setChildCategoryData] = useState([]);
  const [child_category_id, setChild_Category_id] = useState(
    stepOneData?.child_category_id ? stepOneData?.child_category_id : ""
  );
  const [child_category_name, setChild_Category_name] = useState(
    stepOneData?.child_category_name ? stepOneData?.child_category_name : ""
  );
  const [isBrandOpen, setIsBrandOpen] = useState(true);
  const [brandData, setBrandData] = useState([]);
  const [brand_id, setBrand_id] = useState(
    stepOneData?.brand_id ? stepOneData?.brand_id : ""
  );
  const [brand_name, setBrand_name] = useState(
    stepOneData?.brand_name ? stepOneData?.brand_name : ""
  );

  // set default value
  const categoryNameValue = stepOneData?.category_name
    ? stepOneData?.category_name
    : "";
  const categoryNameId = stepOneData?.category_id
    ? stepOneData?.category_id
    : "";

  const sub_categoryNameValue = stepOneData?.sub_category_name
    ? stepOneData?.sub_category_name
    : "";
  const sub_categoryNameId = stepOneData?.sub_category_id
    ? stepOneData?.sub_category_id
    : "";

  const child_categoryNameValue = stepOneData?.child_category_name
    ? stepOneData?.child_category_name
    : "";
  const child_categoryNameId = stepOneData?.child_category_id
    ? stepOneData?.child_category_id
    : "";

  const brandNameValue = stepOneData?.brand_name ? stepOneData?.brand_name : "";
  const brandNameId = stepOneData?.brand_id ? stepOneData?.brand_id : "";

  // set  change value state
  const [isChangeCategory, setIsChangeCategory] = useState(false);
  const [isChangeSub_Category, setIsChangeSub_Category] = useState(false);

  // set show product variation status
  const [showProductVariation, setShowProductVariation] = useState(
    stepOneData?.is_variation ? stepOneData?.is_variation : false
  );
  const [againAddNewVariation, setAgainAddNewVariation] = useState(
    stepOneData?.againAddNewVariation
      ? stepOneData?.againAddNewVariation
      : false
  );
  // Set product variation data
  const [inputValueData, setFormData] = useState(
    stepOneData?.newVariationData || []
  );

  useEffect(() => {
    // Check if new data is different from the current state
    if (
      stepOneData?.newVariationData &&
      stepOneData.newVariationData.length > 0 &&
      JSON.stringify(stepOneData.newVariationData) !==
        JSON.stringify(inputValueData)
    ) {
      setFormData(stepOneData.newVariationData);
    }
  }, [stepOneData?.newVariationData]);

  // set default variation data
  const [defaultVariationData, setDefaultVariationData] = useState(
    stepOneData?.defaultVariationData
  );

  const { data: categories = [], isLoading: categoryLoading } = useQuery({
    queryKey: [`/api/v1/category/dashboard`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/category/dashboard`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
  }); // get all category for select

  const { data: sub_categories = [], isLoading: subCategoryLoading } = useQuery(
    {
      queryKey: [`/api/v1/sub_category/dashboard`],
      queryFn: async () => {
        const res = await fetch(`${BASE_URL}/sub_category/dashboard`, {
          credentials: "include",
        });
        const data = await res.json();
        return data;
      },
    }
  ); // get all Sub category for select

  const { data: child_categories = [], isLoading: childCategoryLoading } =
    useQuery({
      queryKey: [`/api/v1/child_category/dashboard`],
      queryFn: async () => {
        const res = await fetch(`${BASE_URL}/child_category/dashboard`, {
          credentials: "include",
        });
        const data = await res.json();
        return data;
      },
    }); // get all Child category for select

  const { data: brands = [], isLoading: brandLoading } = useQuery({
    queryKey: [`/api/v1/brand/dashboard`],
    queryFn: async () => {
      const res = await fetch(`${BASE_URL}/brand/dashboard`, {
        credentials: "include",
      });
      const data = await res.json();
      return data;
    },
  }); // get all Brand for select

  //   set sub category
  useEffect(() => {
    const getSubCategoryData = sub_categories?.data?.filter(
      (sub_category) => sub_category?.category_id?._id === category_id
    );
    setSubCategoryData(getSubCategoryData);
  }, [sub_categories?.data, category_id]);

  //   set child category
  useEffect(() => {
    const getChildCategoryData = child_categories?.data?.filter(
      (child_category) =>
        child_category?.category_id?._id === category_id &&
        child_category?.sub_category_id?._id === sub_category_id
    );
    setChildCategoryData(getChildCategoryData);
  }, [child_categories?.data, category_id, sub_category_id]);

  //   set brand
  useEffect(() => {
    if (brands?.data) {
      const getBrandData = brands?.data?.filter((brand) => {
        // Check if the brand's category_id matches the current category_id
        const categoryMatch = brand?.category_id?._id === category_id;
        return categoryMatch;
      });
      setBrandData(getBrandData);
    }
  }, [brands?.data, category_id]);

  function validateProductData(data) {
    const {
      product_price,
      product_discount_price,
      product_quantity,
      product_alert_quantity,
    } = data;

    // Convert string values to numbers for comparison
    const price = parseFloat(product_price);
    const discountPrice = parseFloat(product_discount_price);
    const quantity = parseFloat(product_quantity);
    const alertQuantity = parseFloat(product_alert_quantity);

    // Validation checks
    if (price <= discountPrice) {
      toast.error("Product price must be greater than the discount price.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (quantity <= alertQuantity) {
      toast.error("Product quantity must be greater than the alert quantity.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    // If all validations pass
    return null;
  }

  function validateVariationProductData(item, index) {
    const {
      variation_price,
      variation_discount_price,
      variation_quantity,
      variation_alert_quantity,
    } = item;

    // Convert string values to numbers for comparison
    const price = parseFloat(variation_price);
    const discountPrice = parseFloat(variation_discount_price);
    const quantity = parseFloat(variation_quantity);
    const alertQuantity = parseFloat(variation_alert_quantity);

    // Validation checks
    if (price <= discountPrice) {
      toast.error(
        `Product price must be greater than the discount price at serial no ${
          index + 1
        }.`,
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return;
    }
    if (quantity <= alertQuantity) {
      toast.error(
        `Product quantity must be greater than the alert quantity at serial no ${
          index + 1
        }.`,
        {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
      return;
    }
    // If all validations pass
    return null;
  }

  const handleDataPost = async (data) => {
    // Manually check if the category is selected
    if (!category_id) {
      toast.error("Please select the category", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    let variationValidateError = false;

    if (showProductVariation == true) {
      // Validate each item in inputValueData
      defaultVariationData?.forEach((item, index) => {
        const validationError = validateVariationProductData(item, index);
        if (validationError !== null) {
          variationValidateError = true;
          return;
        }

        if (item.variation_alert_quantity < 0) {
          toast.error(
            `Variation Alert Quantity is required at serial no ${index + 1}`,
            {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          return;
        }
        if (item.variation_buying_price < 0) {
          toast.error(
            `Variation Buying Price is required at serial no ${index + 1}`,
            {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          return;
        }
        if (item.variation_discount_price < 0) {
          toast.error(
            `Variation Discount Price is required at serial no ${index + 1}`,
            {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          return;
        }
        if (item.variation_price < 1) {
          toast.error(
            `Variation Price  is required at serial no ${index + 1}`,
            {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          return;
        }
        if (item.variation_quantity < 0) {
          toast.error(
            `Variation Quantity  is required at serial no ${index + 1}`,
            {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          return;
        }
      });

      try {

        const sendData = {
          showProductVariation,
          variation_details: defaultVariationData?.map((item) => ({
            ...item,
          })),
        }
        const response = await fetch(
          `${BASE_URL}/product/check_product_barcode_when_update`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              credentials: "include",
            },
            body: JSON.stringify(sendData),
          }
        );
        const result = await response.json();
        if (result?.statusCode == 200 && result?.success == true) {
          ("");
        } else {
          toast.error(result?.message || "Something went wrong", {
            autoClose: 1000,
          });
          variationValidateError = true;
        }
      } catch (error) {
        toast.error("Something went wrong", {
          autoClose: 1000,
        });
        console.log(error);
        variationValidateError = true;
      } finally {
        ("");
      }

      if (variationValidateError) return;
    }

    const sendData = {
      category_id: category_id,
      category_name: category_name,
      sub_category_id: sub_category_id,
      sub_category_name: sub_category_name,
      child_category_id: child_category_id,
      child_category_name: child_category_name,
      brand_id: brand_id,
      brand_name: brand_name,
      product_name: data?.product_name,
      product_sku: data?.product_sku,
      product_price: data?.product_price,
      product_discount_price: data?.product_discount_price,
      product_quantity: data?.product_quantity,
      product_alert_quantity: data?.product_alert_quantity,
      product_buying_price: data?.product_buying_price,
      is_variation: showProductVariation,
      defaultVariationData: defaultVariationData,
      newVariationData: inputValueData?.map((item) => ({
        ...item,
      })),
      againAddNewVariation: againAddNewVariation,
    };
    if (!sendData?.sub_category_id) {
      delete sendData?.sub_category_id;
    }
    if (!sendData?.sub_category_name) {
      delete sendData?.sub_category_name;
    }
    if (!sendData?.child_category_id) {
      delete sendData?.child_category_id;
    }
    if (!sendData?.child_category_name) {
      delete sendData?.child_category_name;
    }
    if (!sendData?.brand_id) {
      delete sendData?.brand_id;
    }
    if (!sendData?.brand_name) {
      delete sendData?.brand_name;
    }
    if (showProductVariation == true) {
      delete sendData?.product_price;
      delete sendData?.product_discount_price;
      delete sendData?.product_quantity;
      delete sendData?.product_alert_quantity;
      delete sendData?.product_buying_price;
    }
    if (showProductVariation == false) {
      delete sendData?.newVariationData;
    }
    if (showProductVariation == false) {
      delete sendData?.defaultVariationData;
    }
    if (againAddNewVariation == true) {
      delete sendData?.defaultVariationData;
    }
    if (againAddNewVariation == false) {
      delete sendData?.newVariationData;
    }

    if (showProductVariation == false) {
      delete sendData?.variation_details;
      const validationError = validateProductData(sendData);
      if (validationError !== null) {
        return;
      }
    }

    setStepOneData(sendData);
    setCurrentStep(2);
  };

  // loading set
  if (
    categoryLoading ||
    subCategoryLoading ||
    childCategoryLoading ||
    brandLoading
  ) {
    return <LoaderOverlay />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleDataPost)} className="mt-3 space-y-8">
        {/* Product Information */}
        <section className=" shadow-md bg-gray-50 rounded-lg p-4 sm:p-8 md:p-12">
          <h1 className="sm:text-3xl text-xl mb-6 font-semibold text-textColor">
            Product Information
          </h1>
          {/* Product all field  */}
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
            {/* Product Name */}
            <div className="">
              <label htmlFor="product_name" className="font-medium">
                Product Name<span className="text-red-500">*</span>
              </label>
              <input
                defaultValue={stepOneData?.product_name}
                {...register("product_name", {
                  required: "Product Name is required",
                })}
                id="product_name"
                type="text"
                placeholder="Enter Product Name"
                className="block w-full p-2.5 text-gray-800 outline-primaryColor bg-white border border-gray-300 rounded-lg mt-2"
              />
              {errors.product_name && (
                <p className="text-red-600">{errors.product_name?.message}</p>
              )}
            </div>
            {/* Product Sku */}
            <div className="">
              <label htmlFor="product_sku" className="font-medium">
                Product SKU
              </label>
              <input
                defaultValue={stepOneData?.product_sku}
                {...register("product_sku")}
                id="product_sku"
                type="text"
                placeholder="Enter Product SKU"
                className="block w-full p-2.5 outline-primaryColor text-gray-800 bg-white border border-gray-300 rounded-lg mt-2"
              />
            </div>
            {/* Category Name */}
            <div className=" space-y-2">
              <label htmlFor="category_name" className="font-medium">
                Category Name<span className="text-red-500">*</span>
              </label>

              <Select
                id="category_id"
                name="category_id"
                required
                defaultValue={{
                  _id: categoryNameId,
                  category_name: categoryNameValue,
                }}
                aria-label="Select a Category"
                options={categories?.data}
                getOptionLabel={(x) => x?.category_name}
                getOptionValue={(x) => x?._id}
                onChange={(selectedOption) => {
                  setIsChangeCategory(true);
                  setIsChild_CategoryOpen(false);
                  setIsSub_CategoryOpen(false);
                  setIsBrandOpen(false);
                  setCategory_id(selectedOption?._id);
                  setCategory_name(selectedOption?.category_name);
                  setStepOneData({
                    ...stepOneData,
                    category_id: selectedOption?._id,
                  });
                  setSub_Category_name("");
                  setSub_Category_id("");
                  setChild_Category_name("");
                  setChild_Category_id("");
                  setBrand_name("");
                  setBrand_id("");
                  setTimeout(() => {
                    setIsSub_CategoryOpen(true);
                    setIsChild_CategoryOpen(true);
                    setIsBrandOpen(true);
                  }, 100);
                }}
              ></Select>
            </div>
            {/* Sub Category Name */}
            {isSub_CategoryOpen && (
              <div className=" space-y-2 ">
                <label htmlFor="sub_category_name" className="font-medium">
                  Sub Category Name
                </label>
                {isChangeCategory == true ? (
                  <Select
                    id="sub_category_id"
                    name="sub_category_id"
                    aria-label="Select a Sub Category"
                    options={subCategoryData}
                    getOptionLabel={(x) => x?.sub_category_name}
                    getOptionValue={(x) => x?._id}
                    onChange={(selectedOption) => {
                      setIsChangeSub_Category(true);
                      setIsChild_CategoryOpen(false);
                      setSub_Category_id(selectedOption?._id);
                      setStepOneData({
                        ...stepOneData,
                        sub_category_id: selectedOption?._id,
                      });
                      setSub_Category_name(selectedOption?.sub_category_name);
                      setChild_Category_name("");
                      setChild_Category_id("");
                      setTimeout(() => {
                        setIsChild_CategoryOpen(true);
                      }, 100);
                    }}
                  ></Select>
                ) : (
                  <Select
                    id="sub_category_id"
                    name="sub_category_id"
                    defaultValue={{
                      _id: sub_categoryNameId,
                      sub_category_name: sub_categoryNameValue,
                    }}
                    aria-label="Select a Sub Category"
                    options={subCategoryData}
                    getOptionLabel={(x) => x?.sub_category_name}
                    getOptionValue={(x) => x?._id}
                    onChange={(selectedOption) => {
                      setIsChangeSub_Category(true);
                      setIsChild_CategoryOpen(false);
                      setSub_Category_id(selectedOption?._id);
                      setStepOneData({
                        ...stepOneData,
                        sub_category_id: selectedOption?._id,
                      });
                      setSub_Category_name(selectedOption?.sub_category_name);
                      setTimeout(() => {
                        setIsChild_CategoryOpen(true);
                      }, 100);
                    }}
                  ></Select>
                )}
              </div>
            )}
            {/* Child Category Name */}
            {isChild_CategoryOpen && (
              <div className="space-y-2">
                <label htmlFor="child_category_name" className="font-medium">
                  Child Category Name
                </label>
                {isChangeCategory == true || isChangeSub_Category == true ? (
                  <Select
                    id="child_category_id"
                    name="child_category_id"
                    aria-label="Select a Child Category"
                    options={childCategoryData}
                    getOptionLabel={(x) => x?.child_category_name}
                    getOptionValue={(x) => x?._id}
                    onChange={(selectedOption) => {
                      setChild_Category_id(selectedOption?._id);
                      setChild_Category_name(
                        selectedOption?.child_category_name
                      );
                    }}
                  ></Select>
                ) : (
                  <Select
                    id="child_category_id"
                    name="child_category_id"
                    defaultValue={{
                      _id: child_categoryNameId,
                      child_category_name: child_categoryNameValue,
                    }}
                    aria-label="Select a Child Category"
                    options={childCategoryData}
                    getOptionLabel={(x) => x?.child_category_name}
                    getOptionValue={(x) => x?._id}
                    onChange={(selectedOption) => {
                      setChild_Category_id(selectedOption?._id);
                      setChild_Category_name(
                        selectedOption?.child_category_name
                      );
                    }}
                  ></Select>
                )}
              </div>
            )}

            {/* Brand Name */}
            {isBrandOpen && (
              <div className="space-y-2">
                <label htmlFor="brand_name" className="font-medium">
                  Brand Name
                </label>
                {isChangeCategory == true ? (
                  <Select
                    id="brand_id"
                    name="brand_id"
                    aria-label="Select a Brand"
                    options={brandData}
                    getOptionLabel={(x) => x?.brand_name}
                    getOptionValue={(x) => x?._id}
                    onChange={(selectedOption) => {
                      setBrand_id(selectedOption?._id);
                      setBrand_name(selectedOption?.brand_name);
                    }}
                  ></Select>
                ) : (
                  <Select
                    id="brand_id"
                    name="brand_id"
                    aria-label="Select a Brand"
                    defaultValue={{
                      _id: brandNameId,
                      brand_name: brandNameValue,
                    }}
                    options={brandData}
                    getOptionLabel={(x) => x?.brand_name}
                    getOptionValue={(x) => x?._id}
                    onChange={(selectedOption) => {
                      setBrand_id(selectedOption?._id);
                      setBrand_name(selectedOption?.brand_name);
                    }}
                  ></Select>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Product Price and variation */}
        {showProductVariation === true ? (
          <DefaultProductVariation
            defaultVariationData={defaultVariationData}
            setDefaultVariationData={setDefaultVariationData}
          />
        ) : (
          <UpdateStepOnePrice
            stepOneData={stepOneData}
            register={register}
            errors={errors}
          />
        )}

        <div className="grid place-content-end ">
          <button
            type="submit"
            className=" bg-primaryColor text-white text-lg  py-2.5 px-6 font-semibold  rounded-lg  text-center"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStepOne;
