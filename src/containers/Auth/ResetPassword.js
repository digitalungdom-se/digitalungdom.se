import React from "react"
import ResetPassword from '@components/Auth/ResetPassword'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from 'actions/auth'

function ResetPasswordContainer({ token }){

  const dispatch = useDispatch()
  const resettingPassword = useSelector(state => state.Auth.resettingPassword)
  const dispatchResetPassword = info => {dispatch(resetPassword(info)); console.log(info)}

  return(
    <ResetPassword
      dispatchResetPassword = {dispatchResetPassword}
      resettingPassword = {resettingPassword}
      token = {token}
    />
  )
}

export default ResetPasswordContainer
