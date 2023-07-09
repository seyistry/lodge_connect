import './reg.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

const schema = yup
  .object({
    verifyCode: yup.string().required('Verification code is required'),
  })
  .required();

export default function VerificationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);
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
                  {...register('verifyCode', {})}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.verifyCode && (
                  <p className="text-sm text-[red]">
                    {errors.verifyCode?.message}
                  </p>
                )}
              </div>

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className=" bg-brand-500 rounded-full py-2 px-6 font-bold text-[white]"
                >
                  Verify
                </button>
              </div>

              <p className="text-center text-sm mt-2 text-brandText-500 italic">
                make a request for a new code here{' '}
                <button
                  type="button"
                  className="underline font-medium text-brandText-500 hover:text-brand-500 not-italic"
                >
                  request new code
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
