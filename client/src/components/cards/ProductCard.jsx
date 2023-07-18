import { Link, useNavigate } from 'react-router-dom';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import {
  addlikes,
  likesState,
  removelikes,
} from '../../features/property/favorite';
import { userState } from '../../features/auth/user';

export default function ProductCard({ item }) {
  console.log(item);
  const dispatch = useDispatch();
  const liked = useSelector(likesState);
  const userAuth = useSelector(userState);
  const navigate = useNavigate();

  function handleFavorite() {
    if (userAuth)
      if (!Object.keys(liked).includes(`${item._id}`)) {
        dispatch(addlikes({ [item._id]: item }));
      } else {
        dispatch(removelikes(`${item._id}`));
      }
    else {
      navigate('/login');
    }
  }
  return (
    <div className="h-[320px] rounded-lg bg-[white] overflow-hidden">
      <div className="h-[60%] overflow-hidden">
        <HeartIcon
          className="cursor-pointer absolute h-8 w-8 m-2"
          style={{
            color: Object.keys(liked).includes(`${item._id}`)
              ? '#EA4F65'
              : 'white',
          }}
          onClick={handleFavorite}
        />
        <img
          src={item.image}
          alt="house image"
          className="h-[100%] w-[100%] object-cover hover:object-contain"
        />
      </div>
      <div className="flex flex-col h-[40%] justify-between px-5 py-2">
        <p className="text-brandText-500 text-sm font-semibold">{item.title}</p>
        <div className="flex gap-2">
          <p className="text-brandText-100 font-semibold text-xs ">
            <span className="text-brand-500">{item.bedrooms}</span> beds
          </p>
          <p className="text-brandText-100 font-semibold text-xs ">
            <span className="text-brand-500">{item.bathrooms}</span> baths
          </p>
          {/* <p className="text-brandText-100 font-semibold text-xs ">
            <span className="text-brand-500">800</span> Sq.ft
          </p>
          <p className="text-brandText-100 font-semibold text-xs ">
            <span className="text-brand-500">2</span> parking
          </p> */}
        </div>
        <p className="text-brand-500 font-semibold text-md">{`₦${item.price}`}</p>
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
          <Link to={`/products/${item._id}`}>
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
