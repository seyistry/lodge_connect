import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './reg.css';
import { Link } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { base_url } from '../utils/apiLinks';
import { ToastContainer, toast } from 'react-toastify';

const schema = yup
  .object({
    first_name: yup
      .string()
      .min(3)
      .required('First name is required with minimum length of 3'),
    last_name: yup
      .string()
      .min(3)
      .required('Last name is required with minimum length of 3'),
    email: yup.string().email().required('Valid email is required'),
    phone_number: yup.string().matches(/^(\+\d{1,3}[- ]?)?\d{13}$/, {
      message: 'Please enter valid phone number. Add your country code extension example 234**********',
      excludeEmptyString: false,
    }),
    password: yup
      .string()
      .min(6)
      .required('password is required with minimum length of 6'),
    confirm_password: yup
      .string()
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords do not match'),
    agreed: yup
      .boolean()
      .oneOf([true], 'click you accept the terms and conditions'),
  })
  .required();

const RegisterPage = () => {
  let [isOpen, setIsOpen] = useState(false);
  const [submit, setSubmit] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setSubmit(() => true);
    try {
      await fetch(`${base_url}/lodge-connect/user/register`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        response.json().then((data) => {
          if (data.message === 'User created successfully') {
            setIsOpen(true);
            setSubmit(() => false);
          } else {
            console.log('error');
            toast.error(data.error.message);
            setSubmit(() => false);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }

    // let data = await response.text();
    console.log(data);
  };
  // console.log(errors);

  return (
    <div className="w-full min-h-screen flex items-center  bg-gradient-to-b from-gray-800 to-black">
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-[white] w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-brandText-500"
                  >
                    Registration successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-brandText-500">
                      We've sent an OTP to your email.
                    </p>
                  </div>

                  <div className="mt-4">
                    <Link to="/verify">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-full border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-brand-500 hover:bg-brand-500 hover:text-[white] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeModal}
                      >
                        Verify Email
                      </button>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
            <dialog open>This is an open dialog window</dialog>
          </div>
        </Dialog>
      </Transition>
      <ToastContainer />
      <div className="container mx-auto">
        <div className="bg-white rounded-xl shadow-lg flex flex-col lg:flex-row w-10/12 lg:w-8/12 mx-auto overflow:hidden">
          {/* style the left image */}
          <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center bg-regback">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
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
                  {...register('first_name', {})}
                  aria-invalid={errors.first_name ? 'true' : 'false'}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.first_name && (
                  <p className="text-sm text-[red]">
                    {errors.first_name?.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Last Name"
                  {...register('last_name', {})}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.last_name && (
                  <p className="text-sm text-[red]">
                    {errors.last_name?.message}
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
                  type="tel"
                  placeholder="Phone Number"
                  {...register('phone_number', {})}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.phone_number && (
                  <p className="text-sm text-[red]">
                    {errors.phone_number?.message}
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
                  {...register('confirm_password', {})}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.confirm_password && (
                  <p className="text-sm text-[red]">
                    {errors.confirm_password?.message}
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
                {errors.agreed && (
                  <p className="text-sm text-[red]">{errors.agreed?.message}</p>
                )}
              </div>
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="bg-brand-500 rounded-full py-2 px-6 font-bold text-[white]"
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
                      Registering...
                    </>
                  ) : (
                    'Register Now'
                  )}
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
