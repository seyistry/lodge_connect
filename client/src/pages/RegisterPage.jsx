import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './reg.css';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const schema = yup
  .object({
    firstName: yup
      .string()
      .min(3)
      .required('First name is required with minimum length of 3'),
    lastName: yup
      .string()
      .min(3)
      .required('Last name is required with minimum length of 3'),
    email: yup.string().email().required('Valid email is required'),
    address: yup.string().min(6).required('Address is required'),
    password: yup
      .string()
      .min(6)
      .required('password is required with minimum length of 6'),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords do not match'),
  })
  .required();

const RegisterPage = () => {
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
    <div className="w-full min-h-screen flex items-center  bg-gradient-to-b from-gray-800 to-black">
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
              Register
            </h2>
            <p className="mb-4 text-brandText-500">
              Create your account. It's free and only take a minute
            </p>

            {/* create the input forms */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="First Name"
                  {...register('firstName', {})}
                  aria-invalid={errors.firstName ? 'true' : 'false'}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.firstName && (
                  <p className="text-sm text-[red]">
                    {errors.firstName?.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register('lastName', {})}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.lastName && (
                  <p className="text-sm text-[red]">
                    {errors.lastName?.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Email"
                  {...register('email', {})}
                  aria-invalid={errors.email ? 'true' : 'false'}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.email && (
                  <p className="text-sm text-[red]">{errors.email?.message}</p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Address"
                  {...register('address', {})}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.address && (
                  <p className="text-sm text-[red]">
                    {errors.address?.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Password"
                  {...register('password', {})}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.password && (
                  <p className="text-sm text-[red]">
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {})}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-[red]">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>

              <div className="mt-4">
                <input
                  type="checkbox"
                  placeholder="agreed"
                  {...register('agreed', { required: true })}
                />
                <span className="pl-2 text-brandText-500">
                  I accept the&nbsp;
                  <a href="#" className="text-purple-500 font-semibold">
                    Terms of Use
                  </a>
                  &nbsp;&&nbsp;
                  <a href="#" className="text-purple-500 font-semibold">
                    Privacy Policy
                  </a>
                </span>
              </div>
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="bg-brand-500 rounded-full py-2 px-6 font-bold text-[white]"
                >
                  Register Now
                </button>
              </div>
            </form>
            <p className="mt-2 text-center text-sm text-brandText-500 italic">
              Already registered?&nbsp;
              <Link to="/login">
                <span className="underline hover:text-brand-500 not-italic">
                  Login here
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
