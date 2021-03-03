import Link from 'next/link';
import Image from 'next/image';

import NavLink from '../components/NavLink';
import NavDropdown from '../components/NavDropdown';

export default function Header() {
  return (
    <header className="flex fixed justify-center w-screen bg-darkred z-50">
      <div className="flex max-w-screen-md w-full justify-between items-center py-2 px-4">
        <div className="flex justify-start items-center space-x-8">
          <div className="">
            <Link href="/">
              <a className="h-6 sm:h-8 w-auto">
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
        <div className="justify-self-end rounded-full bg-white h-12 w-12"></div>
      </div>
    </header>
  )
}