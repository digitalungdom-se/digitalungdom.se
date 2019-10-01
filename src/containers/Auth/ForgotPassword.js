import React from "react"
import ForgotPassword from '@components/Auth/ForgotPassword'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from 'actions/auth'

function ForgotPasswordContainer(){

  const dispatch = useDispatch()
  const dispatchForgotPassword = info => {dispatch(forgotPassword(info.email))}
  const forgotPasswordEmailSent = useSelector(state => state.Auth.forgotPasswordEmailSent)

  return(
    <ForgotPassword
      sendForgottonPasswordMail = {dispatchForgotPassword}
      forgotPasswordEmailSent = {forgotPasswordEmailSent}
    />
  )
}

export default ForgotPasswordContainer
