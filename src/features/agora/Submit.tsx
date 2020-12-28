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
    <Container maxWidth="sm">
      <Card className={classes.root}>
        <Typography component="h2" variant="h6">
          {'Gör ett inlägg på Agora' /* Translation needed */}
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
            })
              .then((res) => {
                push(`/agora/p/${res.data.shortID}`);
              })
              .catch(console.error);
          }}
          validationSchema={Yup.object({
            body: Yup.string().when('type', {
              is: 'LINK',
              then: Yup.string().required('Obligatoriskt') /* Translation needed */,
            }),
            tags: Yup.array()
              .of(Yup.string().min(3, 'Tag måste vara minst 3 karaktärer.').max(24, 'Tag får max vara 24 karaktärer.'))
              .max(5, 'Max 5 taggar') /* Translation needed */,
            title: Yup.string()
              .min(3, 'Minst 3 karaktärer')
              .max(100, 'Max 100 karaktärer')
              .required('Obligatoriskt') /* Translation needed */,
            type: Yup.string().required('Obligatoriskt') /* Translation needed */,
          })}
        >
          {({ values, setFieldValue, isSubmitting, errors }): React.ReactNode => (
            <Form>
              <Field
                component={TextField}
                fullWidth
                label="Typ"
                /* Translation needed */ margin="normal"
                name="type"
                select
                variant="outlined"
              >
                <MenuItem value="TEXT">Text</MenuItem>
                <MenuItem value="LINK">{'Länk' /* Translation needed */}</MenuItem>
              </Field>
              <Field
                component={TextField}
                fullWidth
                label="Titel"
                /* Translation needed */ margin="normal"
                name="title"
                variant="outlined"
              />
              <Field
                component={TextField}
                fullWidth
                label={values.type === 'TEXT' ? 'Text' : 'Länk'} /* Translation needed */
                margin="normal"
                multiline={values.type === 'TEXT'}
                name="body"
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
                label="Taggar" /* Translation needed */
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
                {'Publicera' /* Translation needed */}
              </Button>
            </Form>
          )}
        </Formik>
      </Card>
    </Container>
  );
}
