const products = ['Buy', 'Sell', 'Rent'];
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
export default function Hero() {
  return (
    <section className="bg-brand-200">
      <h1 className="text-center pt-20 capitalize text-6xl font-bold text-brandText-500">
        We Help To Buy, Sell <br />& Rent You House
      </h1>
      <div className="flex justify-center pt-10">
        {products.map((item, index) => (
          <button
            key={index}
            className={`${
              index === 0 ? 'bg-brand-500 text-[white]' : 'text-brandText-500'
            } px-8 py-2 bg-[white]  rounded-full font-medium text-sm mx-2 hover:bg-brand-500 hover:text-[white]`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="flex justify-center pt-10">
        <div className="flex justify-between items-center w-[50vw] bg-[white] h-14 pl-6 rounded-full">
          <input
            type="text"
            name=""
            id=""
            className="transparent outline-none focus:ring-0  h-10 py-4 pl-4 w-[70%]"
            placeholder="Search by Address, City, Street, ZIP"
          />
          <button
            type="button"
            className="bg-brand-500 h-[80%] px-6 mr-2 rounded-full text-[white] font-bold"
          >
            <MagnifyingGlassIcon className="inline h-6 w-6 text-[white]" />{' '}
            Search
          </button>
        </div>
      </div>
      <div className="h-[70vh] my-8 bg-center bg-hero-bottom" />
    </section>
  );
}
