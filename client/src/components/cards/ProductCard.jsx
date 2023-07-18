import { Link, useNavigate } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  addlikes,
  likesState,
  removelikes,
} from '../../features/property/favorite';
import { userState } from '../../features/auth/user';
import { base_url } from '../../utils/apiLinks';
import { ToastContainer, toast } from 'react-toastify';

export default function ProductCard({
  item,
  price,
  id,
  image,
  bedrooms,
  bathrooms,
  title,
}) {
  // console.log(item);
  const dispatch = useDispatch();
  const liked = useSelector(likesState);
  const userAuth = useSelector(userState);
  const navigate = useNavigate();
  // console.log(liked);

  const addLikes = async () => {
    const bearer = userAuth.token;
    // console.log(item);
    try {
      await fetch(`${base_url}/lodge-connect/favorite/${item._id}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }).then((response) => {
        response.json().then((obj) => {
          if (obj.success) {
            toast.success(obj.message);
          } else {
            toast.error(obj.error.message);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const removeLikes = async () => {
    const bearer = userAuth.token;
    // console.log(item);
    try {
      await fetch(`${base_url}/lodge-connect/favorite/${item._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }).then((response) => {
        response.json().then((obj) => {
          if (obj.success) {
            toast.success(obj.message);
          } else {
            toast.error(obj.error.message);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  function handleFavorite() {
    if (userAuth)
      if (!Object.keys(liked).includes(id)) {
        dispatch(addlikes({ [id]: { _id: id, apartment: item } }));
        addLikes();
      } else {
        dispatch(removelikes(id));
        removeLikes();
      }
    else {
      navigate('/login');
    }
  }
  return (
    <div className="h-[320px] shadow rounded-lg bg-[white] overflow-hidden">
      <ToastContainer />
      <div className="h-[60%] overflow-hidden">
        <HeartIcon
          className="cursor-pointer absolute h-8 w-8 m-2"
          style={{
            color: Object.keys(liked).includes(id) ? '#EA4F65' : 'white',
          }}
          onClick={handleFavorite}
        />
        <img
          src={image}
          alt="house image"
          className="h-[100%] w-[100%] object-cover hover:object-contain"
        />
      </div>
      <div className="flex flex-col h-[40%] justify-between px-5 py-2">
        <p className="text-brandText-500 text-sm font-semibold">{title}</p>
        <div className="flex gap-2">
          <p className="text-brandText-100 font-semibold text-xs ">
            <span className="text-brand-500">{bedrooms}</span> beds
          </p>
          <p className="text-brandText-100 font-semibold text-xs ">
            <span className="text-brand-500">{bathrooms}</span> baths
          </p>
          {/* <p className="text-brandText-100 font-semibold text-xs ">
            <span className="text-brand-500">800</span> Sq.ft
          </p>
          <p className="text-brandText-100 font-semibold text-xs ">
            <span className="text-brand-500">2</span> parking
          </p> */}
        </div>
        <p className="text-brand-500 font-semibold text-md">{`₦${price}`}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-7 w-7 rounded-full"
                src={
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                }
                alt=""
              />
            </div>
            <p className="pl-2 text-brandText-100 text-xs font-medium">
              John Doe
            </p>
          </div>
          <Link to={`/product/${id}`}>
            <button
              type="button"
              className="font-bold text-[10px] text-brandText-500 bg-[#F2F2F2] px-6 py-2 rounded-full hover:bg-brand-500 hover:text-[white]"
            >
              Contact Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
