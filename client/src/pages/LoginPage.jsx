import './reg.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';

const schema = yup
  .object({
    email: yup.string().email().required('Valid email is required'),
    password: yup
      .string()
      .min(6)
      .required('password is required with minimum length of 6'),
  })
  .required();

export default function LoginPage() {
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
              Login
            </h2>
            <p className="mb-4 text-brandText-500">
              Create your account. It's free and only take a minute
            </p>

            {/* create the input forms */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email', {})}
                  className="border border-brandText-100 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-4"
                />
                {errors.email && (
                  <p className="text-sm text-[red]">
                    {errors.email?.message}
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

              <div className="mt-5 flex justify-center">
                <button
                  type="submit"
                  className=" bg-brand-500 rounded-full py-2 px-6 font-bold text-[white]"
                >
                  Login Now
                </button>
              </div>

              <p className="text-center text-sm mt-2 text-brandText-500 italic">
                Don't have an account yet?{' '}
                <Link to={'/register'}>
                  <span className="underline font-medium text-brandText-500 hover:text-brand-500 not-italic">
                    Register now
                  </span>
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
