import { useSelector } from 'react-redux';
import { userState } from '../features/auth/user';
import { Link } from 'react-router-dom';

import { base_url } from '../utils/apiLinks';
import {
  EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

export default function Accommodation() {
  const userBio = useSelector(userState);
  const [apartmentList, setApartmentList] = useState([]);
  const [update, setUpdate] = useState();

  const deleteApartment = async (id) => {
    const bearer = userBio.token;
    try {
      await fetch(`${base_url}/lodge-connect/apartment/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }).then((response) => {
        response.json().then((obj) => {
          if (obj.success) {
            toast.success(obj.message);
            setUpdate(id);
          } else {
            toast.error(obj.message);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getApartment = async () => {
    const bearer = userBio.token;
    try {
      await fetch(`${base_url}/lodge-connect/apartment/`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${bearer}`,
        },
      }).then((response) => {
        response.json().then((obj) => {
          if (obj.success) {
            setApartmentList(obj.payload.apartments);
            // console.log(obj.payload.apartments);
          }
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApartment();
  }, []);

  return (
    <div>
      <ToastContainer />
      {apartmentList.map((item, index) => (
        <Disclosure key={index} as="div" className="mb-2">
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-md px-4 py-2 text-left text-sm font-medium text-brandText-500 shadow hover:bg-brand-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span className="text-md font-thin">{item.title}</span>
                <ChevronUpIcon
                  className={`${
                    open ? 'rotate-180 transform' : ''
                  } h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 mt-2 bg-[white] rounded-md shadow">
                <p className="text-brandText-100 text-sm">{item.description}</p>
                <p className="text-right">
                  <Link to={`/product/${item._id}`}>
                    <span className="text-xs cursor-pointer text-brandText-100 hover:text-brand-500">
                      View
                    </span>
                  </Link>

                  <span className="text-xs ">
                    <EllipsisVerticalIcon className="h-3 text-brandText-100 w-5 inline" />
                  </span>
                  <span
                    className="text-xs cursor-pointer text-brandText-100 hover:text-[red]"
                    onClick={() => deleteApartment(item._id)}
                  >
                    Delete
                  </span>
                </p>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  );
}
