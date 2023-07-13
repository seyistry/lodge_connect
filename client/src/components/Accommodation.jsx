import { useSelector, useDispatch } from 'react-redux';
import { addUser, userState } from '../features/auth/user';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { base_url } from '../utils/apiLinks';
import { PlusCircleIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const schema = yup
  .object({
    image: yup
      .mixed()
      .test('required', 'Please select a image', (value) => {
        return value && value.length;
      })
      .required('image is required'),
    title: yup.string().min(6).required('title is required'),
    description: yup.string().min(10).required('description is required'),
    price: yup
      .number()
      .required('price is required!')
      .test(
        'Is positive?',
        'The Price must be greater than 0!',
        (value) => value > 0
      ),
    location: yup.string().min(3).required('Price is required'),
    bedrooms: yup
      .number()
      .required('bedroom is required!')
      .test(
        'Is positive?',
        'ERROR: The number must be greater than -1!',
        (value) => value > -1
      ),
    bathrooms: yup
      .number()
      .required('ERROR: The bathrooms is required!')
      .test(
        'Is positive?',
        'ERROR: The number must be greater than -1!',
        (value) => value > -1
      ),
  })
  .required();

export default function Accommodation() {
  const userBio = useSelector(userState);
  const [add, setAdd] = useState(false);
  return (
    <div>
      {add ? (
        <Form />
      ) : (
        <>
          <p>Accommodation List</p>
          <div className="flex justify-center">
            <button
              type="button"
              className="flex item-center border border-brand-500 px-6 py-2 rounded-full"
              onClick={() => setAdd(true)}
            >
              <PlusCircleIcon className="w-5 h-5 mr-2 text-brand-500" />
              <p className="text-sm font-bold text-brand-500">
                Add Accommodation
              </p>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

const Form = () => {
  const [submit, setSubmit] = useState(false);

  const userBio = useSelector(userState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      price: 0,
      bedrooms: 0,
      bathrooms: 0,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {
    setSubmit(() => true);
    try {
      const bearer = userBio.token;
      await fetch(`${base_url}/lodge-connect/apartment/`, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${bearer}`,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((obj) => {
          if (obj.success) {
            console.log(obj);
          } else {
            console.log(obj);
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

  console.log(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <input
          type="text"
          placeholder="title"
          {...register('title', {})}
          className="outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
        />
        {errors.title && (
          <p className="text-sm text-[red]">{errors.title?.message}</p>
        )}
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="description"
          {...register('description', {})}
          className="outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
        />
        {errors.description && (
          <p className="text-sm text-[red]">{errors.description?.message}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="price"
          {...register('price', {})}
          className="outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
        />
        {errors.price && (
          <p className="text-sm text-[red]">{errors.price?.message}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="location"
          {...register('location', {})}
          className="outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
        />
        {errors.location && (
          <p className="text-sm text-[red]">{errors.location?.message}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="bedrooms"
          {...register('bedrooms', {})}
          className="outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
        />
        {errors.bedrooms && (
          <p className="text-sm text-[red]">{errors.bedrooms?.message}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          type="number"
          placeholder="bathrooms"
          {...register('bathrooms', {})}
          className="outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
        />
        {errors.bathrooms && (
          <p className="text-sm text-[red]">{errors.bathrooms?.message}</p>
        )}
      </div>
      <div className="mb-4">
        <label
          className="flex mb-2 item-center justify-center shadow bg-brand-200 rounded-md text-sm font-medium py-2"
          htmlFor="add_image"
        >
          <PlusCircleIcon className="h-5 w-5" />
          <p className="pl-2">Add Image</p>
        </label>
        {errors.image && (
          <p className="text-sm text-[red]">{errors.image?.message}</p>
        )}
        <input
          {...register('image', {})}
          type="file"
          accept="image/*"
          multiple
          id="add_image"
          className='hidden'
        />
      </div>
      <div className="mt-5 flex justify-center">
        {/* <button
          type="submit"
          className=" bg-brand-500 rounded-full py-25px-5 font-bold text-[white]"
        >
          Add Now
        </button> */}
        <button
          disabled=""
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
              Uploading...
            </>
          ) : (
            'Add Now'
          )}
        </button>
      </div>
    </form>
  );
};
