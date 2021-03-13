import useSWR from 'swr'
import BounceLoader from 'react-spinners/BounceLoader'

import SubmissionCard from '../../components/SubmissionCard'

export const fetcher = (url) => fetch(url).then((r) => r.json())

export default function Submissions () {
  const { data } = useSWR('/api/user/submissions', fetcher)

  if (!data) {
    return <BounceLoader color="#ffffff" size={150} />
  }

  return (
    <div className="flex flex-col items-center pt-20 max-w-screen-md w-full z-20">
      {data.submissions.map((submission) => (
        <SubmissionCard key={submission._id} submission={submission} displayStatus={true} bgColour="bg-darkred"/>
      ))}
    </div>
  )
}
