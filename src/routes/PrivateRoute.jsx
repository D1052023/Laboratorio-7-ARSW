import { Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {

  const token = localStorage.getItem('token')

  if (!token || token === "null" || token === "undefined") {
    return <Navigate to="/login" replace />
  }

  return children
}