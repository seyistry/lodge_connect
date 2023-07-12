import { useState } from 'react';
import { Tab } from '@headlessui/react';
import Header from '../components/Header';
import Profile from '../components/Profile';
import Booking from '../components/Booking';
import Accommodation from '../components/Accommodation';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Tabs = {
  0: <Profile />,
  1: <Booking />,
  2: <Accommodation />,
};

export default function Example() {
  let [categories] = useState(['My Profile', 'My Booking', 'My Accommodation']);
  return (
    <>
      <Header />
      <div className="flex justify-center">
        <div className="w-full max-w-md px-2 py-8 sm:px-0">
          <Tab.Group>
            <Tab.List className="flex space-x-1 rounded-full bg-brand-200 p-1">
              {Object.keys(categories).map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-full py-2.5 text-sm font-medium leading-5 ',
                      'ring-[white] ring-opacity-60 ring-offset-2 ring-offset-brand-500 focus:outline-none ',
                      selected
                        ? 'bg-[white] shadow text-brand-500'
                        : 'text-brandText-500 hover:bg-white/[0.12] hover:text-white '
                    )
                  }
                >
                  {categories[category]}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="mt-2">
              {Object.keys(Tabs).map((item) => (
                <Tab.Panel
                  key={item}
                  className={classNames(
                    'rounded-xl p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                >
                  {Tabs[item]}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </>
  );
}
