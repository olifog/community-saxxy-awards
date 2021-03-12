import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import BounceLoader from 'react-spinners/BounceLoader'

export const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Submissions () {
  const { data } = useSWR('/api/user/submissions', fetcher)

  if (!data) {
    return <BounceLoader color="#ffffff" size={150} />
  }

  return (
    <div className="flex flex-col items-center pt-20 max-w-screen-md w-full z-20">
      {data.submissions.map((submission) => (
        <div key={submission._id} className="relative h-48 sm:h-36 flex flex-col items-center sm:flex-row space-y-1 sm:space-x-8 sm:space-y-0 rounded-xl shadow-xl w-3/4 bg-darkred sm:py-4">
          <div className="w-48 h-28 relative">
            <Link href={`/submission/${submission._id}`}>
              <a>
                <Image
                  src={`https://i.ytimg.com/vi/${submission.youtubeId}/mqdefault.jpg`}
                  alt="User"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-b-xl rounded-r-none sm:rounded-r-xl sm:rounded-b-none hover:opacity-70"
                />
              </a>
            </Link>
          </div>
          <div className="flex flex-col sm:h-full sm:justify-between">
            <div>
              <Link href={`/submission/${submission._id}`}>
                <a className="text-white font-semibold text-md hover:text-gray-300">
                  {submission.name}
                </a>
              </Link>
              <div className="flex space-x-1 text-sm">
                <div className="text-gray-300">
                  {submission.category}
                </div>
                <span className="text-gray-500">
                  category
                </span>
              </div>
            </div>
            <div className="flex space-x-1 text-sm">
              <div className="text-gray-300">
                Status -
              </div>
              {submission.status === 'REVIEW'
                ? (
                    <span className="text-yellow-500">
                      Under review
                    </span>
                  )
                : (
                    <span className="text-green-600">
                      Entered!
                    </span>
                  )
              }
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
