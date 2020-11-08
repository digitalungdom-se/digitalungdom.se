import React, { useCallback } from 'react';
import { TextFieldProps, fieldToTextField } from 'formik-material-ui';

import MuiTextField from '@material-ui/core/TextField';
import debounce from 'lodash.debounce';

export interface DebouncedAPITextFieldProps extends TextFieldProps {
  debounceFunction: (value: string) => any;
  debounceMillisec: number;
  APIError: string | null;
}

function DebouncedAPITextField({
  debounceFunction,
  debounceMillisec,
  APIError,
  ...props
}: DebouncedAPITextFieldProps): React.ReactElement {
  const {
    form: { setFieldValue },
    field: { name },
  } = props;

  /**
   * See inspiration:
   * https://github.com/facebook/react/issues/1360#issuecomment-533847123
   */
  const debounceAPICheck = useCallback(
    debounce((username: string) => debounceFunction(username), debounceMillisec),
    [],
  );

  const onChange = useCallback(
    (event) => {
      const { value } = event.target;
      setFieldValue(name, value);
      debounceAPICheck(value);
    },
    [setFieldValue, debounceAPICheck, name],
  );

  const { error, helperText, ...textFieldProps } = fieldToTextField(props);

  /**
   * See inspiration from both formik-material-ui
   * https://stackworx.github.io/formik-material-ui/docs/guide/custom-component
   * and components/TranslatedTextField
   */

  return (
    <MuiTextField
      {...textFieldProps}
      error={Boolean(error || APIError)}
      helperText={APIError || helperText}
      onChange={onChange}
    />
  );
}

export default DebouncedAPITextField;
