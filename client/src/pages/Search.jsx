import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { MagnifyingGlassIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useLocation } from 'react-router-dom';
import { base_url } from '../utils/apiLinks';
import ProductCard from '../components/cards/ProductCard';

export default function Search() {
  const { state } = useLocation();
  const [value, setValue] = useState(state);
  const [loaded, setLoaded] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setValue(() => e.target.value);
    }, 3000);
  };

  const getSearchedApartments = async () => {
    try {
      await fetch(`${base_url}/lodge-connect/apartment/all?query=${value}`, {
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
    getSearchedApartments();
  }, [value]);
  return (
    <>
      <Header />
      <div className="flex justify-center pt-5">
        <div className="flex shadow justify-between w-[80vw] items-center lg:w-[50vw] bg-[white] h-14 pl-6 rounded-full">
          <input
            type="text"
            name="searchValue"
            id=""
            className="transparent outline-none focus:ring-0  h-10 py-4 pl-4 w-[70%]"
            placeholder="Search Apartment..."
            defaultValue={value}
            onChange={handleChange}
          />
        </div>
      </div>
      {loaded.length === 0 ? (
        <div className="h-[60vh] flex items-center justify-center">
          <p className="animate-bounce text-brandText-100 font-bold text-2xl">No result</p>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="flex item-center pt-10">
            <MinusIcon className="w-6 text-brand-500" />
            <p className="text-brandText-500 font-semibold text-m px-3">
              Result
            </p>
          </div>
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
      )}

      <Footer />
    </>
  );
}
