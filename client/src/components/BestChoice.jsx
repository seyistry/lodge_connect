import { MinusIcon } from '@heroicons/react/24/outline';
import ProductCard from './cards/ProductCard';

export default function BestChoice() {
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
        <div className="grid x md:grid-cols-2 sm:grid-cols-1 lg:grid-cols-4 gap-5 pt-2">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </div>
    </div>
  );
}
