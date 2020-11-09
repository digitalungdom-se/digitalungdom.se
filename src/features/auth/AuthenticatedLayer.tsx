import React, { useEffect } from 'react';
import { authorize, failAuthorize } from './authSlice';

import axios from 'axios';
import { setMe } from 'features/users/usersSlice';
import { useDispatch } from 'react-redux';

export default function AuthenticatedLayer(props: { children: React.ReactElement }): React.ReactElement {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get('/api/user/auth')
      .then((res) => {
        if (res.data.type === 'fail') throw res;
        dispatch(authorize(res.data));
        dispatch(setMe(res.data));
      })
      .catch((err) => {
        dispatch(failAuthorize());
      });
  }, [dispatch]);
  return props.children;
}
