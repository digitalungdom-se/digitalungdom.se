import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Theme, withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import React from 'react';
import { TextField } from 'formik-material-ui';

export interface BodyEditState {
  body: string;
}

export interface AgoraBodyFieldProps {
  body: string;
  handleEdit?: (values: BodyEditState, formikHelpers: FormikHelpers<BodyEditState>) => void | Promise<any>;
  cancelEdit?: () => any;
}

const StyledButton = withStyles((theme: Theme) => ({
  root: {
    margin: theme.spacing(2, 0, 1, 0),
    '& + &': {
      marginLeft: theme.spacing(2),
    },
  },
}))(Button);

export default function AgoraBodyField({ body, cancelEdit, handleEdit }: AgoraBodyFieldProps) {
  const initialValues: BodyEditState = { body };
  return (
    <Formik initialValues={initialValues} onSubmit={handleEdit || console.log}>
      {() => (
        <Form>
          <Field component={TextField} fullWidth multiline name="body" rows={5} variant="outlined" />
          <StyledButton color="primary" disableElevation type="submit" variant="contained">
            Save
          </StyledButton>
          <StyledButton disableElevation onClick={cancelEdit} variant="contained">
            Cancel
          </StyledButton>
        </Form>
      )}
    </Formik>
  );
}
