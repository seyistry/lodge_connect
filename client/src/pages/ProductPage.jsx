import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCarousel from '../components/cards/ProductCarousel';
import { useEffect, useState } from 'react';
import { base_url } from '../utils/apiLinks';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { userState } from '../features/auth/user';
import { MinusIcon } from '@heroicons/react/24/outline';
import { useLocation } from 'react-router-dom';
import Loading from '../components/Loading';
import { Link } from 'react-router-dom';

const schema = yup
  .object({
    comment: yup.string().min(3).required('Review Message is required'),
    rating: yup.string().required('Rating is required'),
  })
  .required();

export default function ProductPage() {
  const userBio = useSelector(userState);
  const location = useLocation();
  const navigate = useNavigate();
  // console.log(userBio)
  const { id } = useParams();
  const [loaded, setLoaded] = useState([]);
  const [request, setRequest] = useState(false);
  const [submitReview, setSubmitReview] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const getApartment = async () => {
    try {
      await fetch(`${base_url}/lodge-connect/apartment/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        response.json().then((obj) => {
          if (obj.success) {
            setLoaded(obj.payload.apartment);
            // console.log(obj.payload.apartment);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const postReview = async (data) => {
    // console.log(userBio);
    if (userBio === null) {
      console.log(location.pathname);
      navigate('/login', { state: { path: location.pathname } });
      // console.log('waiting');
      return;
    }
    const bearer = userBio.token;
    setSubmitReview(() => true);
    try {
      await fetch(`${base_url}/lodge-connect/apartment/${id}/reviews`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${bearer}`,
          'Content-Type': 'application/json',
        },
      }).then((response) => {
        response.json().then((obj) => {
          if (obj.success) {
            toast.success(obj.message);
            setSubmitReview(() => false);
            setRequest(!request);
            reset({
              comment: '',
              rating: 0,
            });
          } else {
            toast.error(obj.error.message);
            setSubmitReview(() => false);
          }
        });
      });
    } catch (error) {
      setSubmitReview(() => false);
      toast.error(error);
      console.error(error);
    }
  };

  useEffect(() => {
    getApartment();
    // console.log('Testing');
  }, [request]);

  return (
    <>
      {loaded.length === 0 ? (
        <Loading />
      ) : (
        <>
          <Header />
          <div className="bg-brand-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
              <div className="grid grid-cols-full lg:grid-cols-4 gap-5">
                <div className="col-span-3 bg-[white]">
                  <ProductCarousel image={loaded.image} />
                  <div className="px-5 p-5">
                    <p className="text-brandText-500 font-semibold text-2xl">
                      {loaded.title}
                    </p>
                    <div className="flex gap-2 py-2">
                      <p className="text-brandText-100 font-semibold text-xs ">
                        <span className="text-brand-500">
                          {loaded.bedrooms}
                        </span>{' '}
                        beds
                      </p>
                      <p className="text-brandText-100 font-semibold text-xs ">
                        <span className="text-brand-500">
                          {loaded.bathrooms}
                        </span>{' '}
                        baths
                      </p>
                      {/* <p className="text-brandText-100 font-semibold text-xs ">
                    <span className="text-brand-500">800</span> Sq.ft
                  </p>
                  <p className="text-brandText-100 font-semibold text-xs ">
                    <span className="text-brand-500">2</span> parking
                  </p> */}
                    </div>
                    <p className="text-brandText-100 text-xs font-medium">
                      {loaded.description}
                    </p>
                  </div>
                </div>
                <div className="flex col-span-3 lg:col-auto flex-col md:flex-row lg:flex-col gap-5">
                  {userBio?.user?.userId === loaded.owner ? (
                    <div className="bg-[white] p-5 flex flex-col">
                      <p className="font-semibold text-2xl text-brandText-500">
                        {`₦${loaded.price}`}
                      </p>
                      <Link to={`/edit/${id}`} state={{ ...loaded }}>
                        <button
                          type="submit"
                          className="w-full border-2 border-brand-500 text-brand-500 font-bold rounded-full py-2 mt-2 hover:bg-brand-500 hover:text-[white]"
                        >
                          Edit
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="bg-[white] p-5 flex flex-col">
                      <p className="font-semibold text-2xl text-brandText-500">
                        {`₦${loaded.price}`}
                      </p>
                      <Link to={`/payment/${id}`} state={{ ...loaded }}>
                        <button
                          type="submit"
                          className="w-full border-2 border-brand-500 text-brand-500 font-bold rounded-full py-2 mt-2 hover:bg-brand-500 hover:text-[white]"
                        >
                          Rent
                        </button>
                      </Link>
                    </div>
                  )}

                  <div className="bg-[white] py-5 px-8 flex flex-col">
                    <p className="text text-center text-brandText-500 font-semibold text-lg">
                      Safety tips
                    </p>
                    <ul className="list-disc">
                      <li className="text-sm text-brandText-500">
                        Don't pay inspection fees
                      </li>
                      <li className="text-sm text-brandText-500">
                        If possible, take friends along for viewing
                      </li>
                      <li className="text-sm text-brandText-500">
                        Check everything carefully to make sure it's what you
                        need
                      </li>
                      <li className="text-sm text-brandText-500">
                        Don't pay in advance if you can't move in immediately
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pb-5 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
            <div className="px-5 pb-5">
              {userBio?.user?.userId === loaded.owner ? (
                <>{console.log}</>
              ) : (
                <div className="max-w-2xl mx-auto">
                  <form onSubmit={handleSubmit(postReview)}>
                    <label
                      htmlFor="message"
                      className="block mb-2 text-sm font-bold text-BrandText-500"
                    >
                      Review Apartment
                    </label>
                    <textarea
                      {...register('comment')}
                      id="message"
                      rows="4"
                      className="block p-2.5 w-full text-sm border-none shadow online-none rounded-lg"
                      placeholder="Add review..."
                    />
                    <div className="mt-2 flex justify-between items-center ">
                      <div>
                        <label
                          htmlFor="rate"
                          className="text-xs mr-2 text-brandText-500"
                        >
                          Rate
                        </label>
                        <select
                          id="rate"
                          {...register('rating')}
                          className="w-20 p-2 bg-[white] border rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                        {errors.rating && (
                          <p className="text-sm text-[red]">
                            {errors.rating?.message}
                          </p>
                        )}
                      </div>
                      <button
                        type="submit"
                        className="text-[white] font-bold bg-brand-500 text-sm px-6 py-2 rounded-full"
                      >
                        {submitReview ? (
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
                            Submitting...
                          </>
                        ) : (
                          'Submit Now'
                        )}
                      </button>
                    </div>
                  </form>
                  <ToastContainer />
                </div>
              )}
            </div>
            <div className="px-5 pb-5">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                <div className="flex item-center">
                  <MinusIcon className="w-6 text-brand-500" />
                  <p className="text-brandText-500 font-semibold text-m px-3">
                    {loaded.reviews.length > 0 ? 'Reviews' : 'No Reviews'}
                  </p>
                </div>
              </div>
              {loaded.reviews.map((data, index) => (
                <div
                  key={index}
                  className="max-w-2xl mx-auto mt-4 flex justify-center"
                >
                  <div className="w-full bg-[white] px-2 pt-2">
                    {data.comment}
                    <hr className="text-[#dad8d8] mt-6 text-center" />
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-brandText-500">
                        {data.user.first_name} {data.user.last_name}
                      </p>
                      <p className="text-xs text-brandText-500">
                        Rating{' '}
                        <span className="pl-2 font-bond text-lg text-brand-500">
                          {data.rating}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
}
