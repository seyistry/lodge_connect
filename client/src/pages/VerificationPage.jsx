import './reg.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from '../utils/apiLinks';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const schema = yup
  .object({
    otp: yup.string().required('Verification code is required'),
  })
  .required();

export default function VerificationPage() {
  const [submit, setSubmit] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setSubmit(() => true);
    try {
      await fetch(`${base_url}/lodge-connect/user/resend-otp`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        response.json().then((data) => {
          if (data.success) {
            navigate('/resend-otp');
          } else {
            setSubmit(() => false);
            toast.error(data.error.message);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }

    // let data = await response.text();
    // console.log(data);
  };

  // console.log(errors);

  return (
    <div className="w-full h-[100vh] flex items-center bg-gradient-to-b from-gray-800 to-black">
      <ToastContainer />
      <div className="container mx-auto">
        <div className="bg-white rounded-xl shadow-lg flex flex-col lg:flex-row w-10/12 lg:w-8/12 mx-auto overflow:hidden">
          {/* style the left image */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-regback">
            <img src={logo} alt="logo" />
            <div className="mt-5">
              <p className="text-brandText-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                suspendisse aliquam varius rutrum purus maecenas ac{' '}
                <a href="#" className="text-purple-500 font-semibold">
                  Learn more
                </a>
              </p>
            </div>
          </div>
          <div className=" w-full lg:w-1/2 py-12 px-10 ">
            <h2 className="font-bold text-2xl mb-4 text-brandText-500">
              Verify your email address
            </h2>
            <p className="mb-4 text-brandText-500">
              Your verification code has been sent to your email address.
            </p>

            {/* create the input forms */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="verification code"
                  {...register('otp', {})}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.otp && (
                  <p className="text-sm text-[red]">{errors.otp?.message}</p>
                )}
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className=" bg-brand-500 rounded-full py-2 px-6 font-bold text-[white]"
                >
                  {submit ? (
                    <>
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        ></path>
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="#1C1D36"
                        ></path>
                      </svg>
                      Verifying...
                    </>
                  ) : (
                    'Verify email'
                  )}
                </button>
              </div>

              <p className="text-center text-sm mt-2 text-brandText-500 italic">
                make a request for a new code here{' '}
                <Link to="/resend-otp">
                  <button
                    type="button"
                    className="underline font-medium text-brandText-500 hover:text-brand-500 not-italic"
                  >
                    request new code
                  </button>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
