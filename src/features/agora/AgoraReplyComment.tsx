import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import Axios from 'axios';
import Button from '@material-ui/core/Button';
import React from 'react';
import { TextField } from 'formik-material-ui';
import { newCommentSuccess } from './agoraSlice';
import { selectMyProfile } from 'features/auth/authSlice';

export default function AgoraReplyComment({ replyTo }: { replyTo: string }) {
  const dispatch = useDispatch();
  const myProfile = useSelector(selectMyProfile);
  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={(values, { setSubmitting, setValues }) => {
        Axios.post('/api/agora/agorize/comment', {
          body: values.body,
          replyTo,
          type: 'COMMENT',
        }).then((res) => {
          dispatch(
            newCommentSuccess({
              ...res.data.agoragram,
              ...values,
              author: myProfile._id,
              children: [],
              replyTo,
              stars: 0,
              type: 'COMMENT',
            }),
          );
          setValues({
            body: '',
          });
          setSubmitting(false);
        });
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            fullWidth
            label="Body"
            margin="normal"
            multiline
            name="body"
            rows={4}
            variant="outlined"
          />
          <Button color="primary" disabled={isSubmitting} disableElevation type="submit" variant="contained">
            Publish
          </Button>
        </Form>
      )}
    </Formik>
  );
}
