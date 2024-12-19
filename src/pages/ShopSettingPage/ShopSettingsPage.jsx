
import { IoSettings } from 'react-icons/io5';
import ShopSetting from '../../components/ShopSettings/ShopSetting';
import { LoaderOverlay } from './../../components/common/loader/LoderOverley';
import { BASE_URL } from './../../utils/baseURL';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from './../../context/AuthProvider';

const ShopSettingsPage = () => {
 const { user } = useContext(AuthContext)

 const {
   data: shopSettingData,
   isLoading,
   refetch,
 } = useQuery({
   queryKey: [
     `/api/v1/seller_shop_setting/${
       user?.panel_owner_id ? user?.panel_owner_id : user?._id
     }`,
   ],
   queryFn: async () => {
     const res = await fetch(
       `${BASE_URL}/seller_shop_setting/${
         user?.panel_owner_id ? user?.panel_owner_id : user?._id
       }`,
       {
         credentials: 'include',
       }
     )
     const data = await res.json()
     return data
   },
 })
 if (isLoading) {
   return <LoaderOverlay />
 }
  return (
    <div>
      <div className='flex justify-between  items-center mt-6 bg-white rounded-lg py-4 px-4 shadow'>
        <h1 className='text-2xl'>Shop Setting</h1>
        <div>
          <IoSettings size={35} />{' '}
        </div>
      </div>
      <div className='my-6'>
        <ShopSetting
           refetch={refetch}
           shopSettingData={shopSettingData?.data}
           user={user}
        />
      </div>
    </div>
  )
}

export default ShopSettingsPage
