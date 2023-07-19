import ServicesCard from './cards/ServicesCard';

const services = [
  {
    title: 'Buy Properties',
    description: 'Lorem ipsum dolor sit amet consectetur',
  },
  {
    title: 'Lease  Properties',
    description: 'Lorem ipsum dolor sit amet consectetur',
  },
  {
    title: 'Rent Properties',
    description: 'Lorem ipsum dolor sit amet consectetur',
  },
];

export default function Services() {
  return (
    <>
      <h2 className="text-center text-brandText-500 text-md md:text-xl lg:text-3xl font-bold px-[30%]">
        What Services <span className="text-brand-500">Lodge Connect</span>{' '}
        Provide That Help People
      </h2>
      <p className="text-center px-[20%] text-xs md:text-sm text-brandText-100 mt-5 leading-5 font-semibold">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
        voluptatem dicta nisi nihil et quaerat vitae eligendi repudiandae,
        porro, maiores tenetur numquam quae culpa corrupti dolore odit atque
        omnis.
      </p>
      <div className="mt-10 bg-gradient-to-b from-brand-100 to-[#F4F7F6]">
        <div className="flex flex-col items-center gap-10 mx-auto max-w-7xl sm:flex-row md:flex-row lg:flex-row lg:justify-around px-4 sm:px-6 lg:px-8">
          {services.map((item, index) => (
            <ServicesCard key={index} {...item} index={index} />
          ))}
        </div>
      </div>
    </>
  );
}
