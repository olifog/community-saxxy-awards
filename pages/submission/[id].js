import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import BounceLoader from 'react-spinners/BounceLoader'
import Image from 'next/image'
import Link from 'next/link'

import dbConnect from '../../lib/dbConnect'
import Submission from '../../models/Submission'
import User from '../../models/User'

export default function SubmissionPage ({ submission }) {
  // eslint-disable-next-line semi
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen w-full max-w-screen-md z-20">
      {router.isFallback
        ? (
            <BounceLoader color="#ffffff" size={150} />
          )
        : (
            <div className="flex flex-col items-center mt-28 w-5/6 pb-4 bg-gray-800 rounded-lg">
              <div className="relative w-full overflow-hidden aspect-ratio-16/9 shadow-2xl">
                <iframe
                  className="absolute h-full w-full left-0 top-0"
                  width="480"
                  height="270"
                  src={`https://www.youtube.com/embed/${submission.youtubeId}`}>
                </iframe>
              </div>
              <div className="text-white text-lg font-semibold pt-2 pb-4">
                {submission.name}
              </div>
              <div className="flex w-full divide-x divide-white">
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <span className="text-gray-300 px-8">
                    Creators
                  </span>
                  <div className="flex justify-center">
                    <div className="relative grid grid-cols-3 sm:grid-cols-6 gap-x-1">
                      {submission.owners.map((owner) => {
                        return (
                          <div key={owner.steamid} className="h-10 w-10 relative hover:opacity-80">
                            <Link href={`/profile/${owner.steamid}`}>
                              <a>
                                <Image
                                  src={owner.imageUrl}
                                  alt="User"
                                  layout="fill"
                                  objectFit="contain"
                                  className="rounded-full"
                                />
                              </a>
                            </Link>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row justify-center items-center space-x-2">
                  <div className="flex flex-row sm:flex-col space-x-0.5 space-y-0 sm:space-y-0.5 sm:space-x-0">
                    <button className="border-2 border-gray-100 rounded-l-xl rounded-t-none sm:rounded-t-xl sm:rounded-l-none">
                      <svg width="30" height="30">
                        <path d="M7 22 L15 8 L23 22" fill="none" strokeWidth="4" strokeLinecap="round" stroke="white" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="border-2 border-gray-100 rounded-r-xl rounded-b-none sm:rounded-b-xl sm:rounded-r-none">
                      <svg width="30" height="30">
                        <path d="M7 8 L15 22 L23 8" fill="none" strokeWidth="4" strokeLinecap="round" stroke="white" strokeLinejoin="round"/>
                      </svg>
                    </button>
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
            </div>
          )
      }
    </div>
  )
}

export async function getStaticProps ({ params }) {
  await dbConnect()

  try {
    return await Submission.findById(params.id, { _id: 0 }).lean().then(async (submission) => {
      if (!submission) {
        return {
          notFound: true
        }
      }

      const promises = submission.ownerids.map(async (ownerid) => {
        return User.findById(ownerid, { _id: 0 }).lean()
      })

      return await Promise.all(promises)
        .then(results => {
          submission.owners = results
          delete submission.ownerids

          return {
            props: {
              submission: submission
            },
            revalidate: 60
          }
        })
    })
  } catch (err) {
    if (err.name !== 'CastError') {
      console.log(err)
    }
    return {
      notFound: true
    }
  }
}

export async function getStaticPaths () {
  await dbConnect()
  return await Submission.find({}).exec()
    .then((submissions) => {
      const paths = submissions.map((submission) => ({
        params: { id: submission._id.toString() }
      }))
      return { paths, fallback: true }
    })
}

SubmissionPage.propTypes = {
  submission: PropTypes.object
}
