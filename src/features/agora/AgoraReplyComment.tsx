import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TextField } from 'formik-material-ui';
import { newCommentSuccess } from './agoraSlice';
import { selectMyProfile } from 'features/auth/authSlice';

export default function AgoraReplyComment({ replyTo }: { replyTo: string }) {
  const dispatch = useDispatch();
  const myProfile = useSelector(selectMyProfile);
  if (myProfile === null)
    return (
      <Alert severity="info" variant="outlined">
        <AlertTitle>Express yourself!</AlertTitle>
        <Box flexGrow={1}>You need to be logged in to make a comment.</Box>
        <Box>
          <Button color="primary" component={RouterLink} disableElevation to="/bli-medlem" variant="contained">
            Sign up
          </Button>
          <Button component={RouterLink} disableElevation to="/logga-in" variant="contained">
            Log in
          </Button>
        </Box>
      </Alert>
    );
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
