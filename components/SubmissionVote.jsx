import PropTypes from 'prop-types'
import useSWR from 'swr'

export const fetcher = (url) => fetch(url).then((r) => r.json())

export default function SubmissionVote ({ submission }) {
  const { data, mutate } = useSWR(`/api/vote/${submission._id}`, fetcher)

  async function handleClick (value) {
    mutate(value)
  }

  return (
    <div className="flex flex-row sm:flex-col space-x-0.5 space-y-0 sm:space-y-0.5 sm:space-x-0">
      <button onClick={(e) => handleClick(1, e)} className={`border-2 border-gray-100 rounded-l-xl rounded-t-none sm:rounded-t-xl sm:rounded-l-none ${data.vote > 0 ? 'bg-green-800' : ''}`}>
        <svg width="30" height="30">
          <path d="M7 22 L15 8 L23 22" fill="none" strokeWidth="4" strokeLinecap="round" stroke="white" strokeLinejoin="round"/>
        </svg>
      </button>
      <button onClick={(e) => handleClick(-1, e)} className={`border-2 border-gray-100 rounded-r-xl rounded-b-none sm:rounded-b-xl sm:rounded-r-none ${data.vote < 0 ? 'bg-yellow-700' : ''}`}>
        <svg width="30" height="30">
          <path d="M7 8 L15 22 L23 8" fill="none" strokeWidth="4" strokeLinecap="round" stroke="white" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  )
}

SubmissionVote.propTypes = {
  submission: PropTypes.object
}
