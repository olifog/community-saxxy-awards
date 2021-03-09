import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import BounceLoader from 'react-spinners/BounceLoader'

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
              <div className="flex w-full text-gray-300 text-center divide-x divide-white">
                <div className="flex-1">Creators</div>
                <div className="flex-1">Category</div>
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
