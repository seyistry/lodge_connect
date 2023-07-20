import logo from '../assets/images/favicon-32x32.png';
export default function Footer() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
      <hr className="mt-20 text-[#d4d4d4]" />
      <div className="my-5 flex justify-between items-center">
        <div className="flex">
          <p className="text-brandText-100 text-sm font-medium">
            <span className="text-brand-500 text-xs font-bold">
              &copy;2023 Lodge Connect.
            </span>{' '}
            All rights reserved.
          </p>
        </div>
        <div className="flex items-center">
          <p className="text-brandText-100 text-sm font-medium">
            Privacy Policy
          </p>
          <p className="text-brandText-100 text-sm font-medium pl-5">
            Terms & Conditions
          </p>
          <img src={logo} alt="logo" className='ml-2 h-6 w-6' />
        </div>
      </div>
    </div>
  );
}
