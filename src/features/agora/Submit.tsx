import { Field, Form, Formik } from 'formik';
import { Grid, MenuItem, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import React from 'react';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
    },
  }),
);

export default function Submit(): React.ReactElement {
  const classes = useStyles();
  return (
    <Container maxWidth="md">
      <Card className={classes.root}>
        <Typography component="h2" variant="h6">
          Submit
        </Typography>
        <Formik
          initialValues={{
            body: '',
            title: '',
            type: '',
          }}
          onSubmit={console.log}
        >
          {() => (
            <Form>
              <Field component={TextField} fullWidth label="Type" margin="normal" name="type" select variant="outlined">
                <MenuItem value="text">Text</MenuItem>
                <MenuItem value="link">Link</MenuItem>
              </Field>
              <Field component={TextField} fullWidth label="Title" margin="normal" name="title" variant="outlined" />
              <Field
                component={TextField}
                fullWidth
                label="Body"
                margin="normal"
                multiline
                name="body"
                variant="outlined"
              />
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}
