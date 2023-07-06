import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCarousel from '../components/cards/ProductCarousel';

export default function ProductPage() {
  return (
    <>
      <Header />
      <div className="bg-brand-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
          <div className="grid grid-cols-4 gap-5">
            <div className="col-span-3 bg-[white]">
              <ProductCarousel />
              <div className="px-5 pb-5">
                <p className="text-brandText-500 font-semibold text-2xl">Lorem ipsum dolor sit amet.</p>
                <div className="flex gap-2 py-2">
                  <p className="text-brandText-100 font-semibold text-xs ">
                    <span className="text-brand-500">2</span> beds
                  </p>
                  <p className="text-brandText-100 font-semibold text-xs ">
                    <span className="text-brand-500">2</span> baths
                  </p>
                  <p className="text-brandText-100 font-semibold text-xs ">
                    <span className="text-brand-500">800</span> Sq.ft
                  </p>
                  <p className="text-brandText-100 font-semibold text-xs ">
                    <span className="text-brand-500">2</span> parking
                  </p>
                </div>
                <p className="text-brandText-100 text-xs font-medium">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione aut ad assumenda iste sed eum tenetur, quasi beatae!
                  Explicabo adipisci aliquid iusto ab, quis modi facilis! Quas
                  sapiente omnis facere.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="bg-[white] p-5 flex flex-col">
                <p className="font-semibold text-2xl text-brandText-500">
                  ₦5,000,000.00
                </p>
                <button
                  type="submit"
                  className="border-2 border-brand-500 text-brand-500 font-bold rounded-full py-2 mt-2 hover:bg-brand-500 hover:text-[white]"
                >
                  Rent
                </button>
              </div>
              <div className="bg-[white] p-5 flex flex-col">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={
                        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                      }
                      alt=""
                    />
                  </div>
                  <p className="pl-2 font-bold text-l text-brandText-500">
                    John Doe
                  </p>
                </div>
                <button
                  type="submit"
                  className="border-2 border-brand-500 text-brand-500 font-bold rounded-full py-2 mt-2 hover:bg-brand-500 hover:text-[white]"
                >
                  Start chat
                </button>
              </div>
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
                    Check everything carefully to make sure it's what you need
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

      <Footer />
    </>
  );
}
