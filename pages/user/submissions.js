import useSWR from 'swr'
import Image from 'next/image'
import Link from 'next/link'
import BounceLoader from 'react-spinners/BounceLoader'

export const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Submissions () {
  const { data } = useSWR('/api/submissions', fetcher)

  if (!data) {
    return <BounceLoader color="#ffffff" size={150} />
  }

  return (
    <div className="flex flex-col items-center pt-20 max-w-screen-md w-full z-20">
      {data.submissions.map((submission) => (
        <div key={submission._id} className="flex rounded-xl shadown-xl w-3/4 bg-darkred px-4 py-4">
          <div className="w-48 h-28 relative">
            <Link href={`/submission/${submission._id}`}>
              <a>
                <Image
                  src={`https://i.ytimg.com/vi/${submission.youtubeId}/mqdefault.jpg`}
                  alt="User"
                  layout="fill"
                  objectFit="contain"
                  className="rounded-xl"
                />
              </a>
            </Link>
          </div>
          <div>
            <div className="text-white font-semibold">
              {submission.name}
            </div>
            <div className="flex space-x-1">
              <div className="text-gray-200">
                {submission.category}
              </div>
              <span className="text-gray-400">
                category
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
