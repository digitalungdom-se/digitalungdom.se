import Axios from 'axios';
import DebouncedAPITextField from 'components/DebouncedAPITextField';
import React from 'react';
import { TextFieldProps } from 'formik-material-ui';

export interface CheckUsernameTextFieldProps extends TextFieldProps {
  initialUsername: string;
}

function CheckUsernameTextField({ initialUsername, ...props }: CheckUsernameTextFieldProps): React.ReactElement {
  const [APIError, setAPIError] = React.useState<null | 'USERNAME_TAKEN'>(null);

  const checkUsernameAvailability = (username: string) => {
    // if username is falsy, don't check
    if (Boolean(username) === false) return;
    // if it is the initial username given in the form, set it as available
    if (username === initialUsername) return setAPIError(null);
    else {
      Axios.get('/api/user/validate/username', { params: { username } })
        .then((res) => {
          if (res.data.username === false) setAPIError('USERNAME_TAKEN');
          else setAPIError(null);
        })
        .catch(() => {
          // TODO: Implement catch case?
        });
    }
  };
  return (
    <DebouncedAPITextField
      {...props}
      APIError={APIError}
      debounceFunction={checkUsernameAvailability}
      debounceMillisec={300}
    />
  );
}

export default CheckUsernameTextField;
