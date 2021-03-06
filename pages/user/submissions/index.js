import useSWR from 'swr'
import BounceLoader from 'react-spinners/BounceLoader'
import Link from 'next/link'
import { NextSeo } from 'next-seo'

import SubmissionCard from '../../../components/SubmissionCard'
import withPrivateRoute from '../../../components/withPrivateRoute'

export const fetcher = (url) => fetch(url).then((r) => r.json())

const Submissions = () => {
  const { data } = useSWR('/api/user/submissions', fetcher)

  if (!data) {
    return <BounceLoader color="#ffffff" size={150} />
  }

  return (
    <>
      <NextSeo
        title="Submissions"
        noindex={true}
      />
      <div className="flex flex-col items-center pt-20 max-w-screen-md w-full z-20 space-y-4">
        {data.submissions.map((submission) => (
          <SubmissionCard key={submission._id} submission={submission} displayStatus={true} bgColour="bg-darkred"/>
        ))}
        <Link href="/user/submissions/new">
          <a className="w-1/2 py-2 text-center border-dashed border-opacity-30 border-4 border-gray-300 rounded-lg text-gray-400 text-sm bg-gray-700 bg-opacity-0 hover:bg-opacity-10">
            New Submission
          </a>
        </Link>
      </div>
    </>
  )
}

export default withPrivateRoute(Submissions)
