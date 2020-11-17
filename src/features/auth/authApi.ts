import { ServerTokenResponse, TokenStorage } from 'utils/tokenInterceptor';

import Axios from 'axios';

export const loginWithCode = (email: string, loginCode: string, onSuccess: Function) =>
  Axios.post<ServerTokenResponse>(
    '/user/oauth/token',
    {
      grant_type: 'client_credentials',
    },
    {
      headers: { Authorization: `Email ${btoa(email + ':' + loginCode)}` },
    },
  ).then((res) => {
    TokenStorage.storeTokens(res.data);
    onSuccess();
  });
