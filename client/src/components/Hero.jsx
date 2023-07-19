import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import heroBg from '../assets/images/herobg.jpg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Hero() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchValue = event.target.searchValue.value;
    // console.log(searchValue)
    navigate('search', { state: searchValue })
  };
  return (
    <section className="bg-brand-200">
      <h1 className="text-center pt-20 capitalize lg:text-6xl md:text-4xl text-4xl font-bold text-brandText-500">
        We Help To Lease <br />& Rent You House
      </h1>
      <div className="flex justify-center pt-10">
        <form
          onSubmit={handleSubmit}
          className="flex justify-between w-[80vw] items-center lg:w-[50vw] bg-[white] h-14 pl-6 rounded-full"
        >
          <input
            type="text"
            name="searchValue"
            id=""
            className="transparent outline-none focus:ring-0  h-10 py-4 pl-4 w-[78%]"
            placeholder="Search Apartment..."
            // onChange={(event) => setSearchValue(event.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-brand-500 h-[80%] px-6 mr-2 rounded-full text-[white] font-bold"
          >
            <MagnifyingGlassIcon className="inline h-6 w-6 text-[white]" />{' '}
            <span className="hidden lg:inline">Search</span>
          </button>
        </form>
      </div>
      <div
        className="h-[30vh] sm:h-[40vh] md:h-[50vh] lg:h-[70vh] w-full my-8 bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
    </section>
  );
}
