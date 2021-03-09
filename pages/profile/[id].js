import PropTypes from 'prop-types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import BounceLoader from 'react-spinners/BounceLoader'
import Flag from 'react-flagkit'

import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'

export default function Profile ({ user }) {
  // eslint-disable-next-line semi
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen w-full max-w-screen-md">
      {router.isFallback
        ? (
            <BounceLoader color="#ffffff" size={150} />
          )
        : (
            <div className="flex flex-col items-center transform translate-y-1/4 h-full w-full">
              <div className="absolute transform skew-y-6 bg-gray-100 h-full w-full z-2"></div>
              <div className="flex flex-col items-center transform -translate-y-24 space-y-1">
                <div className="h-40 w-40 relative z-3">
                  <a href={user.profileUrl}>
                    <Image
                      src={user.imageUrl}
                      alt="User"
                      layout="fill"
                      objectFit="contain"
                      className="rounded-full shadow-sm"
                    />
                  </a>
                </div>
                <div className="z-10 space-x-1">
                  <a href={user.profileUrl}>
                    <span className="inline-block text-gray-800 text-2xl font-semibold hover:text-gray-600">
                      {user.name}
                    </span>
                  </a>
                  <span className="inline-block">
                    <Flag country={user.countryCode} size={26} />
                  </span>
                </div>
              </div>
              <div className="transform -translate-y-6 border-dotted border-4 border-gray-300 rounded-lg text-gray-400 text-sm z-10 w-5/6 p-3">
                No Submissions!
              </div>
            </div>
          )
      }
    </div>
  )
}

export async function getStaticProps ({ params }) {
  await dbConnect()
  return await User.findOne({ steamid: params.id }, { _id: 0 }).lean().then((user) => {
    if (!user) {
      return {
        notFound: true
      }
    }

    return {
      props: {
        user: user
      },
      revalidate: 60
    }
  })
}

export async function getStaticPaths () {
  await dbConnect()
  return await User.find({}).exec()
    .then((users) => {
      const paths = users.map((user) => ({
        params: { id: user.steamid.toString() }
      }))
      return { paths, fallback: true }
    })
}

Profile.propTypes = {
  user: PropTypes.object
}
