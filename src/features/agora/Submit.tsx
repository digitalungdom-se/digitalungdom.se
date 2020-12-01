import * as Yup from 'yup';

import { Field, Form, Formik } from 'formik';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import ChipInput from 'material-ui-chip-input';
import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import { TextField } from 'formik-material-ui';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    button: {
      marginTop: theme.spacing(2),
    },
    error: {
      color: theme.palette.error.main,
    },
  }),
);

export default function Submit(): React.ReactElement {
  const classes = useStyles();
  const { push } = useHistory();
  return (
    <Container maxWidth="md">
      <Card className={classes.root}>
        <Typography component="h2" variant="h6">
          Submit
        </Typography>
        <Formik
          initialValues={{
            body: '',
            tags: [],
            title: '',
            type: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            Axios.post('/agoragram', {
              ...values,
              hypagora: 'GENERAL',
            }).then((res) => {
              push(`/agora/general/${res.data.shortID}`);
            });
          }}
          validationSchema={Yup.object({
            body: Yup.string().when('type', {
              is: 'LINK',
              then: Yup.string().required(),
            }),
            tags: Yup.array().of(Yup.string().min(3).max(24)).max(5),
            title: Yup.string().min(3).max(100).required(),
            type: Yup.string().required(),
          })}
        >
          {({ values, setFieldValue, isSubmitting, errors }): React.ReactNode => (
            <Form>
              <Field component={TextField} fullWidth label="Type" margin="normal" name="type" select variant="outlined">
                <MenuItem value="TEXT">Text</MenuItem>
                <MenuItem value="LINK">Link</MenuItem>
              </Field>
              <Field component={TextField} fullWidth label="Title" margin="normal" name="title" variant="outlined" />
              <Field
                component={TextField}
                fullWidth
                label="Body"
                margin="normal"
                multiline={values.type === 'text'}
                name="body"
                rows={4}
                variant="outlined"
              />
              <Field
                component={ChipInput}
                disabled={isSubmitting}
                FormHelperTextProps={{
                  className: classes.error,
                }}
                fullWidth
                helperText={errors.tags}
                label="Tags"
                margin="normal"
                name="tags"
                onChange={(values: string[]): void => setFieldValue('tags', values)}
                onDelete={(chip: string, index: number): void => {
                  const chips = values.tags;
                  chips.splice(index, 1);
                  setFieldValue('tags', chips);
                }}
                value={values.tags}
                variant="outlined"
              />
              <Button
                className={classes.button}
                color="primary"
                disabled={isSubmitting}
                disableElevation
                type="submit"
                variant="contained"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}
