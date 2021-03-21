import { NextSeo } from 'next-seo'

import withPrivateRoute from '../../../components/withPrivateRoute'

const NewSubmission = () => {
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
