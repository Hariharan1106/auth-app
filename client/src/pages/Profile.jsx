import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getDefaultRouteByRole } from '../utils/auth'

export default function Profile() {
  const navigate = useNavigate()
  const { userRole } = useSelector((state) => state.user)

  useEffect(() => {
    const dashboardPath = getDefaultRouteByRole(userRole)
    navigate(`${dashboardPath}/profile`)
  }, [navigate, userRole])

  return null
}
