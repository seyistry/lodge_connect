import { useSelector, useDispatch } from 'react-redux';
import { addUser, userState } from '../features/auth/user';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { base_url } from '../utils/apiLinks';
import { useState } from 'react';

const userSchema = yup
  .object({
    first_name: yup.string().min(3).required('First Name is required'),
    last_name: yup.string().min(3).required('Last Name is required'),
    phone_number: yup.string().matches(/^(\+\d{1,3}[- ]?)?\d{13}$/, {
      message: 'Please enter valid phone number.',
      excludeEmptyString: false,
    }),
  })
  .required();

const passwordSchema = yup
  .object({
    old_password: yup
      .string()
      .min(6)
      .required('password is required with minimum length of 6'),
    new_password: yup
      .string()
      .min(6)
      .required('password is required with minimum length of 6'),
    confirm_password: yup
      .string()
      .required()
      .oneOf([yup.ref('new_password'), null], 'Passwords do not match'),
  })
  .required();

export default function Profile() {
  const userBio = useSelector(userState);
  const fullname = userBio.user.fullName.split(' ');
  const dispatch = useDispatch();
  const [updateProfile, setUpdateProfile] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      first_name: fullname[0],
      last_name: fullname[1],
      phone_number: userBio.user.phone,
    },
    resolver: yupResolver(userSchema),
  });

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
  } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const onSubmitProfileUpdate = async (data) => {
    setUpdateProfile(true);
    try {
      const bearer = userBio.token;
      await fetch(`${base_url}/lodge-connect/user/profile`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${bearer}`,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((obj) => {
          if (obj.success) {
            dispatch(
              addUser({
                ...userBio,
                user: {
                  ...userBio.user,
                  fullName: `${data.first_name} ${data.last_name}`,
                  phone: data.phone_number,
                },
              })
            );
            setUpdateProfile(false);
          } else {
            console.log('error');
            setUpdateProfile(false);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }

    // let data = await response.text();
    console.log(data);
  };
  const onSubmitPasswordUpdate = async (data) => {
    setUpdatePassword(true);
    try {
      const bearer = userBio.token;
      await fetch(`${base_url}/lodge-connect/user/change-password`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${bearer}`,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((obj) => {
          if (obj.success) {
            console.log('Success');
            setUpdatePassword(false);
          } else {
            console.log('error');
            setUpdatePassword(false);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitProfileUpdate)}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="First Name"
            {...register('first_name', {})}
            className="border border-brand-200 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
          />
          {errors.first_name && (
            <p className="text-sm text-[red]">{errors.first_name?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Last Name"
            {...register('last_name', {})}
            className="border border-brand-200 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
          />
          {errors.last_name && (
            <p className="text-sm text-[red]">{errors.last_name?.message}</p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Phone Number"
            {...register('phone_number', {})}
            className="border border-brand-200 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
          />
          {errors.phone_number && (
            <p className="text-sm text-[red]">{errors.phone_number?.message}</p>
          )}
        </div>

        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            className=" bg-brand-500 rounded-full py-2 px-6 font-bold text-[white]"
          >
            {updateProfile ? (
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
                Updating...
              </>
            ) : (
              'Update Profile'
            )}
          </button>
        </div>
      </form>

      <form onSubmit={handleSubmit2(onSubmitPasswordUpdate)}>
        <div className="mt-4 mb-4">
          <input
            type="password"
            placeholder="Old Password"
            {...register2('old_password', {})}
            className="border border-brand-200 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
          />
          {errors2.old_password && (
            <p className="text-sm text-[red]">
              {errors2.old_password?.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="New Password"
            {...register2('new_password', {})}
            className="border border-brand-200 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
          />
          {errors2.new_password && (
            <p className="text-sm text-[red]">
              {errors2.new_password?.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Conform New Password"
            {...register2('confirm_password', {})}
            className="border border-brand-200 outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
          />
          {errors2.confirm_password && (
            <p className="text-sm text-[red]">
              {errors2.confirm_password?.message}
            </p>
          )}
        </div>

        <div className="mt-5 flex justify-center">
          <button
            type="submit"
            className=" bg-brand-500 rounded-full py-2 px-6 font-bold text-[white]"
          >
            {updatePassword ? (
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
                Updating..
              </>
            ) : (
              'Change Password'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
