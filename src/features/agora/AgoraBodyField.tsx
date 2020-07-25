import { Field, Form, Formik, FormikHelpers } from 'formik';

import { Button } from '@material-ui/core';
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

export default function AgoraBodyField({ body, cancelEdit, handleEdit }: AgoraBodyFieldProps) {
  const initialValues: BodyEditState = { body };
  return (
    <Formik initialValues={initialValues} onSubmit={handleEdit || console.log}>
      {() => (
        <Form>
          <Field component={TextField} fullWidth multiline name="body" rows={5} />
          <Button type="submit">Save</Button>
          <Button onClick={cancelEdit}>Cancel</Button>
        </Form>
      )}
    </Formik>
  );
}
