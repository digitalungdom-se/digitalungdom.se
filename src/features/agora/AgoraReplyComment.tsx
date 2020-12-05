import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Axios from 'axios';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import React from 'react';
import { TextField } from 'formik-material-ui';
import UnauthenticatedHeaderButtons from 'features/Header/UnauthenticatedHeaderButtons';
import { newCommentSuccess } from './agoraSlice';
import { selectMyProfile } from 'features/users/usersSlice';

export default function AgoraReplyComment({
  replyTo,
  setReplying = () => {},
}: {
  replyTo: string;
  setReplying?: (b: boolean) => void;
}) {
  const dispatch = useDispatch();
  const myProfile = useSelector(selectMyProfile);
  if (myProfile === null)
    return (
      <Alert severity="info" variant="outlined">
        <AlertTitle>{'Utryck dig själv!' /* Translation needed */}</AlertTitle>
        <Box flexGrow={1}>{'Du måste vara inloggad för att göra ett inlägg.' /* Translation needed */}</Box>
        <Box>
          <UnauthenticatedHeaderButtons />
        </Box>
      </Alert>
    );
  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={(values, { setSubmitting, setValues }) => {
        if (values.body.length < 1) return setSubmitting(false);
        Axios.post(`/agoragram/${replyTo}/comment`, {
          body: values.body,
          replyTo,
          type: 'COMMENT',
        })
          .then((res) => {
            dispatch(
              newCommentSuccess({
                ...res.data,
                ...values,
                author: myProfile,
                children: [],
                replyTo,
                stars: 0,
                type: 'COMMENT',
                isNew: true,
              }),
            );
            setValues({
              body: '',
            });
            setSubmitting(false);
            setReplying(false);
          })
          .catch(console.error);
      }}
      validationSchema={Yup.object({
        body: Yup.string().max(10000),
      })}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field
            component={TextField}
            fullWidth
            label="Text" /* Translation needed */
            margin="normal"
            multiline
            name="body"
            rows={4}
            variant="outlined"
          />
          <Button color="primary" disabled={isSubmitting} disableElevation type="submit" variant="contained">
            {'Publicera' /* Translation needed */}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
