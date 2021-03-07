import PropTypes from 'prop-types'
import Link from 'next/link'
import { Menu } from '@headlessui/react'

export default function NavMenuItem ({ text, link }) {
  return (
    <Menu.Item>
      {({ active }) => (
        <div className={`${
          active
            ? 'bg-gray-100 text-gray-900'
            : 'text-gray-700'
        }`}>
          <Link href={link}>
            <a className="flex justify-between px-4 py-2 text-sm leading-5 text-left">
              {text}
            </a>
          </Link>
        </div>
      )}
    </Menu.Item>
  )
}

NavMenuItem.propTypes = {
  text: PropTypes.string,
  link: PropTypes.string
}
