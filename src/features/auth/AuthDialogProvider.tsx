import { AuthPage, displayAuthDialog, selectAuthDialog } from 'features/auth/authSlice';
import React, { Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AuthDialog from 'features/auth/Dialog';
import Loading from 'components/Loading';
import VerifyEmailPage from 'features/auth/VerifyEmailPage';

const Login = React.lazy(() => import('features/auth/Login'));
const Register = React.lazy(() => import('features/auth/Register'));

export function useAuthDialog() {
  const dispatch = useDispatch();
  return (open: boolean | AuthPage, page?: AuthPage | string, email?: string) => {
    if (typeof open === 'string')
      dispatch(
        displayAuthDialog({
          email: page,
          open: true,
          page: open,
        }),
      );
    else dispatch(displayAuthDialog({ open }));
  };
}

export default function AuthDialogProvider(): React.ReactElement {
  const showAuthDialog = useAuthDialog();
  const dialog = useSelector(selectAuthDialog);
  return (
    <AuthDialog onClose={() => showAuthDialog(false)} open={dialog !== undefined && dialog?.open}>
      <Suspense fallback={<Loading />}>
        {dialog.page === 'LOGIN' && (
          <Login
            isDialog
            onSuccess={(email) => showAuthDialog('VERIFY_EMAIL', email)}
            redirect={(page, email) => showAuthDialog(page, email)}
          />
        )}
        {dialog.page === 'REGISTER' && (
          <Register
            isDialog
            onSuccess={(email) => showAuthDialog('VERIFY_EMAIL', email)}
            redirect={(page, email) => showAuthDialog(page, email)}
          />
        )}
        {dialog.page === 'VERIFY_EMAIL' && (
          <VerifyEmailPage email={dialog.email} onSuccess={() => showAuthDialog(false)} />
        )}
      </Suspense>
    </AuthDialog>
  );
}
