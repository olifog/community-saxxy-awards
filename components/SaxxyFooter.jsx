import Link from 'next/link'

export default function SaxxyFooter () {
  return (
    <footer className="absolute bottom-0 flex items-center divide-x-2 text-gray-400 text-sm z-30 w-full max-w-screen-md p-4 justify-between bg-gradient-to-tr from-gray-900 to-gray-700">
      <div className="flex flex-1 flex-col items-start w-full">
        <Link href="/terms"><a className="hover:text-gray-500">Terms and Conditions</a></Link>
        <Link href="/privacypolicy"><a className="hover:text-gray-500">Privacy Policy</a></Link>
        <Link href="/usepolicy"><a className="hover:text-gray-500">Acceptable Use Policy</a></Link>
      </div>
      <div className="flex-1 text-center">
        <p className="pb-2">Made with 🥪 by <a className="text-gray-50 hover:text-gray-200" href="https://olifog.me">Moose</a></p>
        <p>© 2021 Community Saxxy Awards</p>
        <a href="https://steampowered.com" className="hover:text-gray-500">Powered by Steam</a>
      </div>
    </footer>
  )
}
