import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { userState } from '../features/auth/user';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { base_url } from '../utils/apiLinks';
import { ToastContainer, toast } from 'react-toastify';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

const schema = yup
  .object({
    image: yup
      .mixed()
      .test('image', 'Please select a image', (value) => value && value.length)
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

export default function PostForm() {
  const [submit, setSubmit] = useState(false);
  const [add, setAdd] = useState(false);
  const [file, setFile] = useState([]);
  const handleChange = (e) => {
    const fileInput = e.target.files;
    const listing = [];
    for (const file of fileInput) {
      listing.push(file.name);
    }
    setFile(listing);
  };

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
    // const formData = serialize(data, { indices: false, dotsForObjectNotation: false, });
    // console.log(formData);
    let formData = new FormData();
    formData.append('description', data.description);
    formData.append('title', data.title);
    formData.append('price', data.price);
    formData.append('location', data.location);
    formData.append('bedrooms', data.bedrooms);
    formData.append('bathrooms', data.bathrooms);
    formData.append('image', data.image[0]);
    console.log(formData);
    try {
      const bearer = userBio.token;
      await fetch(`${base_url}/lodge-connect/apartment/`, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }).then((response) => {
        response.json().then((obj) => {
          if (obj.success) {
            toast.success(obj.message);
            setSubmit(() => false);
            setAdd(false);
          } else {
            console.log(obj);
            setSubmit(() => false);
            toast.error(obj.error.message);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }

    // let data = await response.text();
    // console.log(data);
  };

  console.log(errors);

  return (
    <div>
      <ToastContainer />
      {add ? (
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 pt-10">
          <p className="text-center text-brandText-500 font-bold text-lg">
            Post New Apartment
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label
                className="rounded-md text-sm font-medium ml-2 text-brandText-500"
                htmlFor="title"
              >
                Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="title"
                {...register('title', {})}
                className="outline-none shadow py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
              />
              {errors.title && (
                <p className="text-sm text-[red]">{errors.title?.message}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                className="rounded-md text-sm font-medium ml-2 text-brandText-500"
                htmlFor="desc"
              >
                Description
              </label>
              <textarea
                id="desc"
                type="text"
                placeholder="description"
                {...register('description', {})}
                rows="4"
                className="block p-2.5 w-full shadow outline-none border-none text-sm rounded-sm focus:outline-brand-500 focus:outline-2"
              />
              {errors.description && (
                <p className="text-sm text-[red]">
                  {errors.description?.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="rounded-md text-sm font-medium ml-2 text-brandText-500"
                htmlFor="price"
              >
                Price
              </label>
              <input
                id="price"
                type="number"
                placeholder="price"
                {...register('price', {})}
                className="shadow outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
              />
              {errors.price && (
                <p className="text-sm text-[red]">{errors.price?.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="rounded-md text-sm font-medium ml-2 text-brandText-500"
                htmlFor="loc"
              >
                Location
              </label>
              <input
                id="loc"
                type="text"
                placeholder="location"
                {...register('location', {})}
                className="shadow outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
              />
              {errors.location && (
                <p className="text-sm text-[red]">{errors.location?.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="rounded-md text-sm font-medium ml-2 text-brandText-500"
                htmlFor="bed"
              >
                Bedrooms
              </label>
              <input
                id="bed"
                type="number"
                placeholder="bedrooms"
                {...register('bedrooms', {})}
                className="shadow outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
              />
              {errors.bedrooms && (
                <p className="text-sm text-[red]">{errors.bedrooms?.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="rounded-md text-sm font-medium ml-2 text-brandText-500"
                htmlFor="bath"
              >
                Bathrooms
              </label>
              <input
                id="bath"
                type="number"
                placeholder="bathrooms"
                {...register('bathrooms', {})}
                className="shadow outline-none py-1 px-2 w-full rounded-sm focus:border-brand-500 focus:border-2"
              />
              {errors.bathrooms && (
                <p className="text-sm text-[red]">
                  {errors.bathrooms?.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              {/* <label
			className="flex mb-2 item-center justify-center shadow bg-brand-200 rounded-md text-sm font-medium py-2"
			htmlFor="image"
		  >
			<PlusCircleIcon className="h-5 w-5" />
			<p className="pl-2">Add Image</p>
		  </label> */}
              <input
                {...register('image', {})}
                type="file"
                accept="image/*"
                // multiple
                id="image"
                name="image"
                // className="hidden"
                // onChange={handleChange}
              />
              {file.length === 0 && errors.image && (
                <p className="text-sm text-[red]">{errors.image?.message}</p>
              )}
              {file.map((name, index) => (
                <p key={index} className="text-xs italic text-brand-500">
                  {name}
                </p>
              ))}
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
        </div>
      ) : (
        <div className="h-[75vh] flex justify-center items-center">
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
        </div>
      )}
    </div>
  );
}
