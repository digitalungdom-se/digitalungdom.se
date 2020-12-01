import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { selectAuthenticated } from './authSlice';
import { setMe } from 'features/users/usersSlice';

interface AuthenticatedLayerProps {
  children: React.ReactElement;
}

export default function AuthenticatedLayer(props: AuthenticatedLayerProps): React.ReactElement {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectAuthenticated);
  useEffect(() => {
    if (isAuthenticated)
      axios.get('/user/@me').then((res) => {
        if (res.data.type === 'fail') throw res;
        dispatch(setMe(res.data));
      });
  }, [dispatch, isAuthenticated]);
  return props.children;
}
