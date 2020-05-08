import * as React from 'react';

import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@material-ui/core/TextField';

import { FieldProps } from 'formik';
import { fieldToTextField } from 'formik-material-ui';
import { useTranslation } from 'react-i18next';

export interface TextFieldProps extends FieldProps, Omit<MuiTextFieldProps, 'name' | 'value' | 'error'> {}

export function TranslatedTextField({ children, ...props }: TextFieldProps): JSX.Element {
  const { helperText, ...textFieldProps } = fieldToTextField(props);
  const { t } = useTranslation();
  return (
    <MuiTextField {...textFieldProps} helperText={typeof helperText === 'string' ? t(helperText) : helperText}>
      {children}
    </MuiTextField>
  );
}

TranslatedTextField.displayName = 'TranslatedFormikMaterialUITextField';
