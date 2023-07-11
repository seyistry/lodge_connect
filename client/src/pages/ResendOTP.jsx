import './reg.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { base_url } from '../utils/apiLinks';

const schema = yup
  .object({
    email: yup.string().email().required('Valid email is required'),
  })
  .required();

export default function ResendOTP() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await fetch(`${base_url}/lodge-connect/user/verify-email`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        response.json().then((data) => {
          navigate('/verify');
        });
      });
    } catch (error) {
      console.error(error);
    }

    // let data = await response.text();
    console.log(data);
  };

  console.log(errors);

  return (
    <div className="w-full h-[100vh] flex items-center bg-gradient-to-b from-gray-800 to-black">
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
                  {...register('email', {})}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.email && (
                  <p className="text-sm text-[red]">{errors.email?.message}</p>
                )}
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className=" bg-brand-500 rounded-full py-2 px-6 font-bold text-[white]"
                >
                  Request OTP
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
