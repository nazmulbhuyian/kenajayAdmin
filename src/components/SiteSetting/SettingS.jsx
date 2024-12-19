import { useEffect, useState } from 'react'
import Authentication from './Authentication'
import PaymentGetWay from './PaymentGetWay'
import CurrencySymbol from './CurrencySymbol'
import { useQuery } from '@tanstack/react-query'
import { BASE_URL } from './../../utils/baseURL'
import { LoaderOverlay } from '../common/loader/LoderOverley'
import AddCommission from './AddCommission'
import EmailCredential from './EmailCredential'
import PhoneCredential from './PhoneCredential'
import ShippingConFig from './ShippingConFig'

const SettingS = () => {
  const [activeNavButton, setActiveNavButton] = useState('authentication')

  const handleNavButtonClick = (buttonName) => {
    setActiveNavButton(buttonName)
    sessionStorage.setItem('activeTab', buttonName)
  }
  useEffect(() => {
    // Retrieve active dropdown from localStorage when the component mounts
    const saveDropDown = sessionStorage.getItem('activeTab')
    if (saveDropDown) {
      setActiveNavButton(saveDropDown)
    }
  }, [])

  //data fetching of Authentication by Tans Tack Query
  const {
    data: getInitialAuthenticationData,
    isLoading: authLoading,
    refetch,
  } = useQuery({
    queryKey: [`/api/v1/authentication`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/authentication`, {
          credentials: 'include',
        })

        if (!res.ok) {
          const errorData = await res.text() // Get more info about the error
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          )
        }

        const data = await res.json()
        return data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error // Rethrow to propagate the error to react-query
      }
    },
  })

  //data fetching of Payment Method by Tans Tack Query
  const {
    data: getInitialPaymentData,
    refetch: paymentDataRefetch,
    isLoading: sslLoadings,
  } = useQuery({
    queryKey: [`/api/v1/payment_gateway`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/payment_gateway`, {
          credentials: 'include',
        })

        if (!res.ok) {
          const errorData = await res.text() // Get more info about the error
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          )
        }

        const data = await res.json()
        return data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error // Rethrow to propagate the error to react-query
      }
    },
  })

  //data fetching of Commission by Tans Tack Query
  const {
    data: getInitialCommissionData,
    isLoading: commissionLoading,
    refetch: commissionRefetch,
  } = useQuery({
    queryKey: [`/api/v1/commision`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/commision`, {
          credentials: 'include',
        })

        if (!res.ok) {
          const errorData = await res.text() // Get more info about the error
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          )
        }

        const data = await res.json()
        return data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error // Rethrow to propagate the error to react-query
      }
    },
  })

  //data fetching of Currency by Tans Tack Query
  const {
    data: getInitialCurrencyData,
    isLoading: currencyLoading,
    refetch: currencyRefetch,
  } = useQuery({
    queryKey: [`/api/v1/setting`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/setting`, {
          credentials: 'include',
        })

        if (!res.ok) {
          const errorData = await res.text() // Get more info about the error
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          )
        }

        const data = await res.json()
        return data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error // Rethrow to propagate the error to react-query
      }
    },
  })

  //Get Phone Credential Data by Tans Tack Query
  const {
    data: getInitialPhoneData,
    isLoading: phoneLoading,
    refetch: phoneRefetch,
  } = useQuery({
    queryKey: [`/api/v1/setting`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/setting`, {
          credentials: 'include',
        })

        if (!res.ok) {
          const errorData = await res.text() // Get more info about the error
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          )
        }

        const data = await res.json()
        return data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error // Rethrow to propagate the error to react-query
      }
    },
  })

  //data fetching of Shipping Configuration by Tans Tack Query
  const {
    data: getShippingConfiguration,
    isLoading: shippingConfigurationLoading,
    refetch: shippingConfigurationRefetch,
  } = useQuery({
    queryKey: [`/api/v1/shipping_configuration`],
    queryFn: async () => {
      try {
        const res = await fetch(`${BASE_URL}/shipping_configuration`, {
          credentials: 'include',
        })

        if (!res.ok) {
          const errorData = await res.text() // Get more info about the error
          throw new Error(
            `Error: ${res.status} ${res.statusText} - ${errorData}`
          )
        }

        const data = await res.json()
        return data
      } catch (error) {
        console.error('Fetch error:', error)
        throw error // Rethrow to propagate the error to react-query
      }
    },
  })

  if (
    sslLoadings ||
    authLoading ||
    commissionLoading ||
    currencyLoading ||
    shippingConfigurationLoading
  ) {
    return <LoaderOverlay />
  }

  return (
    <div>
      <div className='flex flex-wrap  gap-4 mt-8'>
        <button
          className={`bg-primaryColor hover:bg-blue-500 duration-200  text-white p-2 text-sm sm:text-base  font-medium  ${
            activeNavButton == 'authentication' &&
            'border-t-[4px]  border-blue-900'
          }`}
          onClick={() => handleNavButtonClick('authentication')}
        >
          Authentication
        </button>

        <button
          className={`bg-primaryColor hover:bg-blue-500 duration-200  text-white p-2  text-sm sm:text-base font-medium   ${
            activeNavButton == 'Payment Gateway Configuration' &&
            'border-t-[4px]  border-blue-900'
          }`}
          onClick={() => handleNavButtonClick('Payment Gateway Configuration')}
        >
          Payment Gateway Configuration
        </button>
        <button
          className={`bg-primaryColor hover:bg-blue-500 duration-200  text-white p-2 font-medium   text-sm sm:text-base  ${
            activeNavButton == 'Currency Configuration' &&
            'border-t-[4px]  border-blue-900'
          }`}
          onClick={() => handleNavButtonClick('Currency Configuration')}
        >
          Currency Symbol
        </button>
        <button
          className={`bg-primaryColor hover:bg-blue-500 duration-200  text-white p-2 font-medium   text-sm sm:text-base  ${
            activeNavButton == 'commission' && 'border-t-[4px]  border-blue-900'
          }`}
          onClick={() => handleNavButtonClick('commission')}
        >
          Commission
        </button>
        <button
          className={`bg-primaryColor hover:bg-blue-500 duration-200  text-white p-2 font-medium   text-sm sm:text-base  ${
            activeNavButton == 'emailCredential' &&
            'border-t-[4px]  border-blue-900'
          }`}
          onClick={() => handleNavButtonClick('emailCredential')}
        >
          OTP By Email Credential
        </button>
        <button
          className={`bg-primaryColor hover:bg-blue-500 duration-200  text-white p-2 font-medium   text-sm sm:text-base  ${
            activeNavButton == 'phoneCredential' &&
            'border-t-[4px]  border-blue-900'
          }`}
          onClick={() => handleNavButtonClick('phoneCredential')}
        >
          OTP By Phone Credential
        </button>
        <button
          className={`bg-primaryColor hover:bg-blue-500 duration-200  text-white p-2 font-medium   text-sm sm:text-base  ${
            activeNavButton == 'shippingConfiguration' &&
            'border-t-[4px]  border-blue-900'
          }`}
          onClick={() => handleNavButtonClick('shippingConfiguration')}
        >
          Shipping Configuration
        </button>
      </div>

      <div className='mt-6 min-w-[1150px]'>
        {activeNavButton == 'authentication' && (
          <Authentication
            refetch={refetch}
            initialAuthenticationData={getInitialAuthenticationData?.data[0]}
          />
        )}
        {activeNavButton == 'Payment Gateway Configuration' && (
          <PaymentGetWay
            refetch={paymentDataRefetch}
            getInitialPaymentData={getInitialPaymentData?.data[0]}
          />
        )}
        {activeNavButton == 'commission' && (
          <AddCommission
            refetch={commissionRefetch}
            getInitialCommissionData={getInitialCommissionData?.data[0]}
          />
        )}
        {activeNavButton == 'Currency Configuration' && (
          <CurrencySymbol
            refetch={currencyRefetch}
            getInitialCurrencyData={getInitialCurrencyData?.data[0]}
          />
        )}
        {activeNavButton == 'emailCredential' && (
          <EmailCredential
            refetch={refetch}
            initialAuthenticationData={getInitialAuthenticationData?.data[0]}
          />
        )}
        {activeNavButton == 'phoneCredential' && (
          <PhoneCredential
            refetch={refetch}
            initialAuthenticationData={getInitialAuthenticationData?.data[0]}
          />
        )}
        {activeNavButton == 'shippingConfiguration' && (
          <ShippingConFig
            refetch={shippingConfigurationRefetch}
            getShippingConfiguration={getShippingConfiguration?.data[0]}
          />
        )}
      </div>
    </div>
  )
}

export default SettingS
