import { useUser } from '../hooks/useUser'
import { useRouter } from 'next/router'

const withPrivateRoute = (PassedComponent) => {
  const WrappedComponent = (props) => {
    const [user] = useUser()
    const router = useRouter()

    if (!user && typeof window !== 'undefined') {
      router.push('/api/auth/steam/login')
    }
    return <PassedComponent {...props} />
  }
  return WrappedComponent
}

export default withPrivateRoute
