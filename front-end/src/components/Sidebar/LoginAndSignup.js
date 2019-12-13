import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'


const LoginAndSignup = props => {
  const [ isLoginPage, setIsLoginPage ] = useState(true)
  
  const toggleRegister = () => {
    if(isLoginPage)
      setIsLoginPage(false)

    else
      setIsLoginPage(true)
  }

  return <div>
    {
      isLoginPage 
      ?
      <Login toggleRegister={toggleRegister} />
      :
      <Signup toggleRegister={toggleRegister} />
    }

  </div>
}

export default LoginAndSignup