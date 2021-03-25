import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import BounceLoader from 'react-spinners/BounceLoader'

import withPrivateRoute from '../../../components/withPrivateRoute'

export const fetcher = (url) => fetch(url).then((r) => r.json())

const NewSubmission = () => {
  const router = useRouter()
  const { data } = useSWR('/api/user/videos', fetcher)

  if (!data) {
    return <BounceLoader color="#ffffff" size={150} />
  }

  if (!data.success) {
    router.push('/api/auth/google')
  }

  return (
    <>
      <NextSeo
        title="New Submission"
        noindex={true}
      />
    </>
  )
}

export default withPrivateRoute(NewSubmission)
