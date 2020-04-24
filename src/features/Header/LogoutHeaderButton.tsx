import Button from '@material-ui/core/Button';
import React from 'react';
import axios from 'axios';
import { failAuthorize } from 'features/auth/authSlice';
import { useDispatch } from 'react-redux';

export default function LogoutHeaderButton(): React.ReactElement {
  const dispatch = useDispatch();
  return (
    <Button
      disableElevation
      onClick={() => {
        axios
          .delete('/api/user/logout')
          .then((res) => {
            if (res.data.type === 'fail') throw res;
            dispatch(failAuthorize());
          })
          .catch((err) => {
            console.error('Could not delete session, but deleted session locally');
            dispatch(failAuthorize());
          });
      }}
      variant="contained"
    >
      Logga ut
    </Button>
  );
}
