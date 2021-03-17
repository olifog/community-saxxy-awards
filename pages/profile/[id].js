import PropTypes from 'prop-types'
import Image from 'next/image'
import { useRouter } from 'next/router'
import BounceLoader from 'react-spinners/BounceLoader'
import Flag from 'react-flagkit'
import { ObjectId } from 'bson'
import { NextSeo } from 'next-seo'

import dbConnect from '../../lib/dbConnect'
import User from '../../models/User'
import Submission from '../../models/Submission'
import SubmissionCard from '../../components/SubmissionCard'

export default function Profile ({ user, submissions }) {
  // eslint-disable-next-line semi
  const router = useRouter();

  return (
    <div className="flex flex-col items-center h-screen w-full max-w-screen-md overflow-hidden">
      {router.isFallback
        ? (
            <BounceLoader color="#ffffff" size={150} />
          )
        : (
            <>
              <NextSeo
                title={user.name}
                description={`${user.name}'s profile, ${submissions.length} submission${submissions.length === 1 ? '' : 's'} - Welcome to the first annual Community Saxxy Awards! This short film competition is by the TF2 community, for the TF2 community.`}
                openGraph={{
                  type: 'website',
                  url: `https://saxxys.com/profile/${user.steamid}`,
                  title: `${user.name} | Community Saxxy Awards`,
                  description: `${user.name}'s profile, ${submissions.length} submission${submissions.length === 1 ? '' : 's'} - Welcome to the first annual Community Saxxy Awards! This short film competition is by the TF2 community, for the TF2 community.`,
                  images: [
                    {
                      url: 'https://saxxys.com/embedimage.png',
                      width: 1200,
                      height: 628,
                      alt: `${user.name}'s profile- Community Saxxy Awards`
                    }
                  ]
                }}
              />
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
                {!submissions.length
                  ? (
                    <div className="transform -translate-y-6 border-dotted border-4 border-gray-300 rounded-lg text-gray-400 text-sm z-10 w-5/6 p-3">
                      No Submissions!
                    </div>
                    )
                  : (
                      submissions.map((submission) => (
                        <SubmissionCard key={submission.youtubeId} submission={submission} displayStatus={false} bgColour="bg-gray-800"/>
                      ))
                    )
                }
              </div>
            </>
          )
      }
    </div>
  )
}

export async function getStaticProps ({ params }) {
  await dbConnect()
  return await User.findOne({ steamid: params.id }).lean().then(async (user) => {
    if (!user) {
      return {
        notFound: true
      }
    }

    return await Submission.find({ ownerids: ObjectId(user._id) }, { ownerids: 0 }).lean().then((submissions) => {
      delete user._id
      return {
        props: {
          user: user,
          submissions: submissions.map((submission) => {
            submission._id = submission._id.toString()
            return submission
          })
        },
        revalidate: 60
      }
    })
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
  user: PropTypes.object,
  submissions: PropTypes.arrayOf(PropTypes.object)
}
