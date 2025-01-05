import { useState } from "react";
import ReactQuill from "react-quill-new";

const AboutUs = () => {
  const [about_us, setAboutUs] = useState("");
  const [return_policy, setReturnPolicy] = useState("");
  const [privacy_policy, setPrivacyPolicy] = useState("");
  const [refund_policy, setRefundPolicy] = useState("");
  const [cancellation_policy, setCancellationPolicy] = useState("");
  const [terms_condition, setTermsAndCondition] = useState("");
  const [shipping_info, setShippingInfo] = useState("");

  return (
    <div>
      <ReactQuill theme="snow" value={about_us} onChange={setAboutUs} />

      <div className="mt-2 flex items-center justify-end">
        <button
          //onClick={() => handleAboutUsPost()}
          className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded mt-3"
          type="submit"
        >
          Submit
        </button>
      </div>
      {/*Return Policy Info */}
      <h4 className="font-semibold text-[20px] mt-4">Return Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={return_policy}
        onChange={setReturnPolicy}
      />

      <div className="mt-2 flex items-center justify-end">
        <button
          //onClick={() => handleReturnPolicyPost()}
          className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded mt-3"
          type="submit"
        >
          Submit
        </button>
      </div>

      {/*Privacy Policy Info */}
      <h4 className="font-semibold text-[20px] mt-4">Privacy Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={privacy_policy}
        onChange={setPrivacyPolicy}
      />

      <div className="mt-2 flex items-center justify-end">
        <button
          //onClick={() => handlePrivacyPolicyPost()}
          className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded mt-3"
          type="submit"
        >
          Submit
        </button>
      </div>

      {/*Refund Policy Policy Info */}
      <h4 className="font-semibold text-[20px] mt-4">Refund Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={refund_policy}
        onChange={setRefundPolicy}
      />

      <div className="mt-2 flex items-center justify-end">
        <button
          //onClick={() => handleRefundPolicyPost()}
          className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded mt-3"
          type="submit"
        >
          Submit
        </button>
      </div>

      {/*Cancellation Policy Policy Info */}
      <h4 className="font-semibold text-[20px] mt-4">Cancellation Policy</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={cancellation_policy}
        onChange={setCancellationPolicy}
      />

      <div className="mt-2 flex items-center justify-end">
        <button
          //onClick={() => handleCancellationPolicyPost()}
          className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded mt-3"
          type="submit"
        >
          Submit
        </button>
      </div>

      {/* terms_condition Policy Policy Info */}
      <h4 className="font-semibold text-[20px] mt-4">Terms And Condition</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={terms_condition}
        onChange={setTermsAndCondition}
      />

      <div className="mt-2 flex items-center justify-end">
        <button
          //onClick={() => handleTermsAndConditionPost()}
          className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded mt-3"
          type="submit"
        >
          Submit
        </button>
      </div>

      {/* shipping_info Policy Policy Info */}
      <h4 className="font-semibold text-[20px] mt-4">Shipping Information</h4>
      <hr className="mt-2 mb-4" />
      <ReactQuill
        theme="snow"
        value={shipping_info}
        onChange={setShippingInfo}
      />

      <div className="mt-2 flex items-center justify-end">
        <button
          //onClick={() => handleShippingInformationPost()}
          className="px-10 py-2  bg-primaryColor hover:bg-blue-500 duration-200 text-white rounded mt-3"
          type="submit"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AboutUs;
