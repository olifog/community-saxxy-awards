import { Menu } from '@headlessui/react'
import Image from 'next/image'
import PropTypes from 'prop-types'

import NavMenuItem from './NavMenuItem'

export default function NavProfile ({ user, handleLogout }) {
  return (
    <div className="flex flex-col relative items-start">
      <Menu>
        <Menu.Button>
          <div className="h-14 w-14 relative">
            <Image
              src={user.imageUrl}
              alt="User"
              layout="fill"
              objectFit="contain"
              className="rounded-full"
            />
          </div>
        </Menu.Button>
        <Menu.Items className="absolute right-0 w-56 mt-16 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
          <div className="px-4 py-3">
            <p className="text-sm leading-5 text-gray-400">
              Signed in as
              <span className="text-gray-600"> {user.name}</span>
            </p>
          </div>
          <div>
            <NavMenuItem
              text="Profile"
              link={`/profile/${user.steamid}`}
            />
            <NavMenuItem
              text="My Submissions"
              link="/user/submissions"
            />
          </div>
          <div>
            <Menu.Item>
              {({ active }) => (
                <a onClick={handleLogout} className={`${
                  active
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left cursor-pointer`}>
                  Logout
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
    </div>
  )
}

NavProfile.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func
}
