import { Menu } from "@headlessui/react";
import Image from 'next/image';

export default function NavProfile({user, handleLogout}) {
  return (
    <div className="flex flex-col relative items-start">
      <Menu>
        <Menu.Button>
          <div className="h-14 w-14 relative">
            <Image
              src={user.photos[2].value}
              alt="User"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
        </Menu.Button>
        <Menu.Items className="absolute right-0 w-56 mt-10 -m-5 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg outline-none">
          <Menu.Item>
            {({ active }) => (
              <a onClick={handleLogout} className={`${
                active
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-700"
              } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}>
                Logout
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  );
}