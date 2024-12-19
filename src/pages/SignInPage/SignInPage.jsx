import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../utils/baseURL'
import MiniSpinner from '../../shared/MiniSpinner/MiniSpinner'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'
import 'react-phone-number-input/style.css'
import PhoneInput, {
  formatPhoneNumber,
  isPossiblePhoneNumber,
  isValidPhoneNumber,
} from 'react-phone-number-input'

const SignInPage = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [user_phone, setUserPhone] = useState()

  const location = useLocation()
  const form = location?.state?.from?.pathname || '/'
  const navigate = useNavigate()
  const handleSignIn = async (data) => {
    setLoading(true)

    if (user_phone) {
      const formatPhoneNumberValueCheck = formatPhoneNumber(user_phone)
      const isPossiblePhoneNumberValueCheck = isPossiblePhoneNumber(user_phone)
      const isValidPhoneNumberValueCheck = isValidPhoneNumber(user_phone)
      if (formatPhoneNumberValueCheck == false) {
        toast.error('Mobile number not valid !', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setLoading(false)
        return
      }
      if (isPossiblePhoneNumberValueCheck == false) {
        toast.error('Mobile number not valid !', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setLoading(false)
        return
      }
      if (isValidPhoneNumberValueCheck == false) {
        toast.error('Mobile number not valid !', {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setLoading(false)
        return
      }
    }

    if (!data?.user_email && !user_phone) {
      toast.error('Email Or Phone is required !', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      setLoading(false)
      return
    }

    const sendData = {
      login_credentials: data?.user_email ? data?.user_email : user_phone,
      user_password: data?.user_password,
    }
    try {
      const response = await fetch(`${BASE_URL}/admin_reg_log/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Moved out of the headers
        body: JSON.stringify(sendData),
      })

      const result = await response.json()

      if (result?.statusCode == 200 && result?.success == true) {
        toast.success(
          result?.message ? result?.message : 'Login successfully',
          {
            autoClose: 1000,
          }
        )
        navigate(form, { replace: true })
        window.location.reload()
        reset()

        setLoading(false)
      } else {
        toast.error(result?.message || 'Something went wrong', {
          autoClose: 1000,
        })
      }
    } catch (error) {
      toast.error('Network error or server is down', {
        autoClose: 1000,
      })
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex justify-center items-center md:min-h-screen py-7'>
      <div className='w-full mx-3 md:w-[400px] px-3 md:px-10 pt-5 pb-14 border rounded bg-slate-100 shadow-md'>
        <h2 className='text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2'>
          Login
        </h2>

        <form onSubmit={handleSubmit(handleSignIn)} className='space-y-4'>
          <div className='form-control w-full border border-slate-300  py-4 px-2 rounded-md'>
            <div>
              <label htmlFor='user_phone'>Phone</label>
              <PhoneInput
                className='mt-2 w-full rounded-md border-white-light bg-white px-2 py-2  text-black ps-4 placeholder:text-white-dark text-xl custom-input'
                placeholder='Enter phone number'
                id='user_phone'
                value={user_phone}
                defaultCountry='BD'
                international
                countryCallingCodeEditable={false}
                onChange={setUserPhone}
                error={
                  user_phone
                    ? !isValidPhoneNumber(user_phone) && 'Invalid phone number'
                    : 'Phone number required'
                }
              />
            </div>
            <div className='flex items-center justify-between gap-4 my-2'>
              <hr className='w-40' />
              <p>OR</p>
              <hr className='w-40' />
            </div>
            <div className='mt-2'>
              <label htmlFor='user_email' className='label'>
                <span className='label-text'>Email</span>
              </label>
              <input
                id='user_email'
                type='email'
                placeholder='login with email or phone number'
                className='border rounded px-3 py-2 w-full'
                {...register('user_email')}
              />
              {errors.user_email && (
                <p className='text-red-600'> {errors?.user_email?.message}</p>
              )}
            </div>
          </div>
          <div className='relative'>
            <label
              htmlFor='user_password'
              className='block text-xs font-medium text-gray-700 mt-2'
            >
              Password
            </label>

            <input
              {...register('user_password', {
                required: 'User Password is required',
              })}
              type={showPassword ? 'text' : 'password'} // Dynamic type based on state
              id='user_password'
              className='mt-2 w-full rounded-md border-gray-200 shadow-sm sm:text-sm p-2 border-2'
            />
            {errors.user_password && (
              <p className='text-red-600'>{errors.user_password?.message}</p>
            )}

            {/* Eye icon for toggling password visibility */}
            <div
              className='absolute top-9 right-3 cursor-pointer'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaRegEye size={20} />
              ) : (
                <FaRegEyeSlash size={20} />
              )}
            </div>
          </div>

          <button
            className='px-10 py-2 text-textColor bg-primaryColor w-full opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out rounded-full'
            type='submit'
          >
            {loading ? <MiniSpinner /> : 'Login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignInPage
