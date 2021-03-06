import { NextSeo } from 'next-seo'

export default function Custom404 () {
  return (
    <>
      <NextSeo title="404" />
      <div className="flex flex-col justify-center h-screen">
        <div className="text-white text-lg z-10">
          404 |
          <span className="text-gray-400"> Page not found, sorry!</span>
        </div>
      </div>
    </>
  )
}
