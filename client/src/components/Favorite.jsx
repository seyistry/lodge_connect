import { MinusIcon } from '@heroicons/react/24/outline';
import ProductCard from './cards/ProductCard';
import { likesState } from '../features/property/favorite';
import { useSelector } from 'react-redux';

export default function Favorite() {
  const liked = useSelector(likesState);

  return (
    <>
      {Object.keys(liked).length > 0 ? (
        <div className="bg-[#F4F7F6]" id="likes">
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
              {Object.keys(liked).map((item) => (
                <ProductCard key={item} item={liked[item]} id={item} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
