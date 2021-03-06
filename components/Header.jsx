import Link from 'next/link'
import Image from 'next/image'

import NavLink from './NavLink'
import NavDropdown from './NavDropdown'
import NavProfile from './NavProfile'

import { useUser } from '../hooks/useUser'

export default function Header () {
  const [user, { mutate }] = useUser()

  async function handleLogout () {
    await fetch('/api/logout')
    mutate({ user: null })
  }

  return (
    <header className="flex fixed justify-center w-screen bg-darkred z-50">
      <div className="flex max-w-screen-md w-full justify-between items-center py-2 px-4">
        <div className="flex justify-start items-center space-x-8">
          <div className="">
            <Link href="/">
              <a>
                <Image
                  src="/icon.png"
                  alt="Community Saxxy Awards icon"
                  height={50}
                  width={50}
                  layout="intrinsic"
                />
              </a>
            </Link>
          </div>
          <div className="sm:hidden">
            <NavDropdown />
          </div>
          <nav className="hidden sm:flex space-x-10">
            <NavLink
              link="/rules"
              text="Rules"
            />
            <NavLink
              link="/enter"
              text="Enter"
            />
            <NavLink
              link="/vote"
              text="Vote"
              disabled={true}
            />
          </nav>
        </div>
        {user
          ? (
              <NavProfile
                user={user}
                handleLogout={handleLogout}
              />
            )
          : (
              <Link href="/api/login">
                <a className="flex">
                  <div className="h-14 w-20 relative">
                    <Image
                      src="/steam.png"
                      alt="Steam login button"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </a>
              </Link>
            )
        }
      </div>
    </header>
  )
}
