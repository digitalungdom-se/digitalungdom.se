import { AuthPage, displayAuthDialog, selectAuthDialog } from 'features/auth/authSlice';
import React, { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthDialog from 'features/auth/Dialog';
import VerifyEmailPage from 'features/auth/VerifyEmailPage';

const Login = React.lazy(() => import('features/auth/Login'));
const Register = React.lazy(() => import('features/auth/Register'));

export function useAuthDialog() {
  const dispatch = useDispatch();
  return (open: boolean | AuthPage, page?: AuthPage) => {
    if (typeof open === 'string') dispatch(displayAuthDialog({ open: true, page: open }));
    else dispatch(displayAuthDialog({ open }));
  };
}

export default function AuthDialogProvider(): React.ReactElement {
  const showAuthDialog = useAuthDialog();
  const dialog = useSelector(selectAuthDialog);
  return (
    <AuthDialog onClose={() => showAuthDialog(false)} open={dialog.open}>
      <Suspense fallback={'Loading'}>
        {dialog.page === 'LOGIN' && (
          <Login isDialog onSuccess={() => showAuthDialog(false)} redirect={(page) => showAuthDialog(page)} />
        )}
        {dialog.page === 'REGISTER' && (
          <Register
            isDialog
            onSuccess={() => showAuthDialog('VERIFY_EMAIL')}
            redirect={(page) => showAuthDialog(page)}
          />
        )}
        {dialog.page === 'VERIFY_EMAIL' && <VerifyEmailPage />}
      </Suspense>
    </AuthDialog>
  );
}
