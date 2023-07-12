import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser, userState } from '../features/auth/user';
import { NavHashLink } from 'react-router-hash-link';

const navigation = [
  { name: 'Rent', href: '#', current: true },
  { name: 'Lease ', href: '#', current: false },
];

const user = {
  imageUrl: 'https://i.pravatar.cc/300',
};

export default function Header() {
  const userBio = useSelector(userState);
  const dispatch = useDispatch();
  return (
    <>
      <div className="min-h-full">
        <Disclosure as="nav" className="bg-brand-200">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <Link to="/">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-auto"
                          src={logo}
                          alt="Lodge Connect"
                        />
                      </div>
                    </Link>

                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <span
                            key={item.name}
                            className="text-brandText-500 hover:bg-brand-500 hover:text-[white] rounded-3xl px-6 py-2 text-sm font-medium"
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {userBio === null ? (
                        <div>
                          <Link to="/login">
                            <button className="text-white rounded-md px-3 py-2 text-sm font-medium">
                              Log in
                            </button>
                          </Link>
                          <Link to="/signup">
                            <button className="transparent border-2 rounded-3xl border-brand-500 text-brand-500 px-3 py-2 text-sm font-medium">
                              Sign up
                            </button>
                          </Link>
                        </div>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="rounded-full bg-gray-800 p-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                          >
                            <span className="sr-only">View notifications</span>
                            <BellIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                          {/* Profile dropdown */}
                          <Menu as="div" className="relative ml-3">
                            <div>
                              <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="sr-only">Open user menu</span>
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={user.imageUrl}
                                  alt=""
                                />
                              </Menu.Button>
                            </div>
                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute bg-brand-100 right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <Menu.Item>
                                  <Link to="/account">
                                    <span className="block px-4 py-2 text-sm text-BrandText-500 hover:text-brand-500">
                                      Profile
                                    </span>
                                  </Link>
                                </Menu.Item>
                                <Menu.Item>
                                  <NavHashLink to="/#likes">
                                    <span className="block px-4 py-2 text-sm text-BrandText-500 hover:text-brand-500">
                                      Likes
                                    </span>
                                  </NavHashLink>
                                </Menu.Item>
                                <Menu.Item>
                                  <Link to="/account">
                                    <span
                                      onClick={() => dispatch(removeUser())}
                                      className="block px-4 py-2 text-sm text-[red]/70 text-BrandText-500 hover:text-brand-500"
                                    >
                                      Sign Out
                                    </span>
                                  </Link>
                                </Menu.Item>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      ) : (
                        <Bars3Icon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      className="block text-brandText-500 rounded-md px-3 py-2 text-base font-medium"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                  {userBio === null ? (
                    <div className="flex items-center">
                      <Link to="/login">
                        <button className="text-white rounded-md py-2 px-6 text-base font-medium">
                          Log in
                        </button>
                      </Link>
                      <Link to="/signup">
                        <button className="transparent border-2 rounded-3xl border-brand-500 text-brand-500 px-5 py-2 text-sm font-medium">
                          Sign in
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="">
                      <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.imageUrl}
                            alt=""
                          />
                        </div>

                        <div className="ml-3">
                          <div className="text-base font-medium leading-none text-brandText-500">
                            {userBio.user.fullName}
                          </div>
                          <div className="text-sm font-medium leading-none text-brandText-500">
                            {userBio.user.email}
                          </div>
                        </div>
                        <button
                          type="button"
                          className="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-3 space-y-1 px-2">
                        <Link to="/account">
                          <Disclosure.Button
                            as="a"
                            className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-brandText-500 hover:text-brand-500"
                          >
                            Profile
                          </Disclosure.Button>
                        </Link>

                        <NavHashLink to="/#likes">
                          <Disclosure.Button
                            as="a"
                            className="block cursor-pointer rounded-md px-3 py-2 text-base font-medium text-brandText-500 hover:text-brand-500"
                          >
                            Likes
                          </Disclosure.Button>
                        </NavHashLink>

                        <Disclosure.Button
                          as="a"
                          onClick={() => dispatch(removeUser())}
                          className="block cursor-pointer text-[red]/70 rounded-md px-3 py-2 text-base font-medium text-brandText-500 hover:text-brand-500"
                        >
                          Sign Out
                        </Disclosure.Button>
                      </div>
                    </div>
                  )}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </>
  );
}
