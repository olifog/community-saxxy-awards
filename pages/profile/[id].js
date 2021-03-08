import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import BounceLoader from 'react-spinners/BounceLoader'

import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'

export default function Profile ({ user }) {
  // eslint-disable-next-line semi
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center h-screen">
      {router.isFallback
        ? (
            <BounceLoader color="#ffffff" size={150} />
          )
        : (
            <div className="text-white text-lg z-10">
              {user.name}
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
