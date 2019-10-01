import React from "react"
import ForgotPassword from '@components/Auth/ForgotPassword'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from 'actions/auth'

function ForgotPasswordContainer(){

  const dispatch = useDispatch()
  const dispatchForgotPassword = info => {dispatch(forgotPassword(info.email))}

  return(
    <ForgotPassword
      sendForgottonPasswordMail = {dispatchForgotPassword}
    />
  )
}

export default ForgotPasswordContainer
