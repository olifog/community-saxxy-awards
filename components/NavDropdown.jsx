import { Menu } from '@headlessui/react'
import Link from 'next/link'

export default function NavDropdown () {
  return (
    <div className="flex flex-col relative items-start">
      <Menu>
        <Menu.Button>
          <svg className="h-8 w-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="white">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </Menu.Button>
        <Menu.Items className="absolute left-0 w-56 mt-10 -m-5 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link href="/rules">
                <a className={`${
                  active
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}>
                  Rules
                </a>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link href="/enter">
                <a className={`${
                  active
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700'
                } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}>
                  Enter
                </a>
              </Link>
            )}
          </Menu.Item>
          <Menu.Item
            as="span"
            disabled
            className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
          >
            Vote
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </div>
  )
}
