import { MinusIcon } from '@heroicons/react/24/outline';
import ProductCard from './cards/ProductCard';
import { base_url } from '../utils/apiLinks';
import { useEffect, useState } from 'react';
import { userState } from '../features/auth/user';
import { useDispatch, useSelector } from 'react-redux';
import { addlikes } from '../features/property/favorite';

export default function BestChoice() {
  const [loaded, setLoaded] = useState([]);
  const userBio = useSelector(userState);
  const dispatch = useDispatch();

  const getLikes = async () => {
    const bearer = userBio?.token;
    if (bearer) {
      try {
        await fetch(`${base_url}/lodge-connect/favorite/`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${bearer}`,
          },
        }).then((response) => {
          response.json().then((obj) => {
            if (obj.success) {
              // console.log(obj.payload.favorites);
              if (obj.payload.favorites?.apartment) {
                const toObj = obj.payload.favorites.reduce(
                  (obj, item) => ({ ...obj, [item.apartment._id]: item }),
                  {}
                );
                // console.log(toObj);
                // console.log(obj.payload.favorites);
                dispatch(addlikes(toObj));
              }
            }
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getAllApartments = async () => {
    try {
      await fetch(`${base_url}/lodge-connect/apartment/all`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        response.json().then((obj) => {
          if (obj.success) {
            setLoaded(obj.payload.apartments);
            // console.log(obj.payload.apartments);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllApartments();
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#F4F7F6] to-brand-100 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="flex item-center pt-10">
          <MinusIcon className="w-6 text-brand-500" />
          <p className="text-brandText-500 font-semibold text-m px-3">
            Best Choice
          </p>
        </div>
        <p className="text-brandText-500 font-bold text-2xl pt-2">
          Popular Residences
        </p>
        <div className="grid md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-5 pt-2">
          {loaded.map((item, index) => (
            <ProductCard
              key={index}
              item={item}
              id={item._id}
              image={item.image}
              price={item.price}
              bedrooms={item.bedrooms}
              bathrooms={item.bathrooms}
              title={item.title}
              owner={item.owner}
              location={item.location}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
