import { MinusIcon } from '@heroicons/react/24/outline';
import ProductCard from './cards/ProductCard';
import { addlikes, likesState } from '../features/property/favorite';
import { useDispatch, useSelector } from 'react-redux';
import { base_url } from '../utils/apiLinks';
import { userState } from '../features/auth/user';
import { useEffect, useState } from 'react';

export default function Favorite() {
  const dispatch = useDispatch();
  const liked = useSelector(likesState);
  const userBio = useSelector(userState);
  // console.log(liked);
  const [loaded, setLoaded] = useState([]);

  const getLikes = async () => {
    const bearer = userBio.token;
    try {
      await fetch(`${base_url}/lodge-connect/favorite/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }).then((response) => {
        response.json().then((obj) => {
          if (obj.success) {
            setLoaded(obj.payload.favorites);
            // console.log(obj.payload.favorites)
            const toObj = obj.payload.favorites.reduce(
              (obj, item) => ({ ...obj, [item.apartment._id]: item }),
              {}
            );
            // console.log(toObj);
            // console.log(obj.payload.favorites);
            dispatch(addlikes(toObj));
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLikes();
  }, []);
  return (
    <>
      {loaded ? (
        Object.keys(liked).length > 0 ? (
          <div className="" id="likes">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
              <div className="flex item-center pt-10">
                <MinusIcon className="w-6 text-brand-500" />
                <p className="text-brandText-500 font-semibold text-m px-3">
                  Favorite
                </p>
              </div>
              <p className="text-brandText-500 font-bold text-2xl pt-2">
                Liked Residences
              </p>
              <div className="grid x md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-5 pt-2">
                {Object.keys(liked).map((item) => {
                  // console.log(liked[item])
                  return (
                    <ProductCard
                      key={item._id}
                      item={liked[item]}
                      id={liked[item].apartment._id}
                      image={liked[item].apartment.image}
                      price={liked[item].apartment.price}
                      bedrooms={liked[item].apartment.bedrooms}
                      bathrooms={liked[item].apartment.bathrooms}
                      title={liked[item].apartment.title}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-[65vh] flex justify-center items-center">
            <p className="font-bold text-lg text-brand-500">No Likes</p>
          </div>
        )
      ) : (
        <div>loading...</div>
      )}
    </>
  );
}
