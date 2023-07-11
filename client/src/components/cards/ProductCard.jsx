export default function ProductCard() {
  return (
    <div className="h-[320px] rounded-lg bg-[white] overflow-hidden">
      <div className="h-[60%] overflow-hidden">
        <img
          src="https://unsplash.com/photos/2gDwlIim3Uw/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8M3x8bW9kZXJuJTIwaG91c2V8ZW58MHx8fHwxNjg4Mzg0ODM3fDA&force=true&w=640"
          alt="house image"
        />
      </div>
      <div className="flex flex-col h-[40%] justify-between px-5 py-2">
        <p className="text-brandText-500 text-sm font-semibold">
          Preston Rd. Inglewood, New york
        </p>
        <div className="flex gap-2">
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
        <p className="text-brand-500 font-semibold text-md">₦5,000,000.00</p>
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
          <button
            type="button"
            className="font-bold text-[10px] text-brandText-500 bg-[#F2F2F2] px-6 py-2 rounded-full hover:bg-brand-500 hover:text-[white]"
          >
            Contact Now
          </button>
        </div>
      </div>
    </div>
  );
}
