import { ServerTokenResponse, TokenStorage } from 'utils/tokenInterceptor';

import Axios from 'axios';

export const loginWithCode = (loginCode: string, email: string, onSuccess: Function) =>
  Axios.post<ServerTokenResponse>(
    '/user/oauth/token',
    {
      grant_type: 'client_credentials',
    },
    {
      headers: { authorization: `Email ${btoa(email + ':' + loginCode)}` },
    },
  ).then((res) => {
    TokenStorage.storeTokens(res.data);
    onSuccess();
  });
