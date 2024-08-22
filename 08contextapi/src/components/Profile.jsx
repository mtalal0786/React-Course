import React,{useContext} from 'react'
import UserContext from '../context/UserContext'
function Profile() {
    const {user} = useContext(UserContext)

    if (!user) return <div>Please Login</div>

  return (
    <>
  <div>Wellcome to {user.username}</div>
  <div>Passsword: {user.password}</div>
  </>
)
}

export default Profile