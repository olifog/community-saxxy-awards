import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="relative bg-darkred">
      <div className="flex max-w-screen-md mx-auto justify-between items-center py-2 px-4">
        <div className="flex justify-start items-center space-x-16">
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
            {/* menu button here */}
          </div>
          <nav className="hidden sm:flex space-x-10">
            <Link href="/rules">
              <a className="text-lg font-medium text-white hover:text-gray-400">
                Rules
              </a>
            </Link>
            <Link href="/enter">
              <a className="text-lg font-medium text-white hover:text-gray-400">
                Enter
              </a>
            </Link>
            <Link href="/vote">
            <a className="text-lg font-medium text-gray-600 disabled">
              Vote
            </a>
            </Link>
          </nav>
        </div>
        <div className="justify-self-end rounded-full bg-white h-12 w-12"></div>
      </div>
    </header>
  )
}