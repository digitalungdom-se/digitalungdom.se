import Axios from 'axios';
import DebouncedAPITextField from 'components/DebouncedAPITextField';
import React from 'react';
import { TextFieldProps } from 'formik-material-ui';

export interface CheckEmailTextFieldProps extends TextFieldProps {
  initialEmail: string;
}

function CheckEmailTextField(props: CheckEmailTextFieldProps): React.ReactElement {
  const [APIError, setAPIError] = React.useState<null | 'EMAIL_TAKEN'>(null);

  const checkEmailAvailability = (email: string) => {
    // if email is falsy, don't check
    if (Boolean(email) === false) return;
    // if it is the initial email given in the form, set it as available
    if (email === props.initialEmail) return setAPIError(null);
    else {
      Axios.get('/api/user/validate/email', { params: { email } })
        .then((res) => {
          if (res.data.email === false) setAPIError('EMAIL_TAKEN');
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
      debounceFunction={checkEmailAvailability}
      debounceMillisec={300}
    />
  );
}

export default CheckEmailTextField;
