import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { EditableProfileContentProps } from './ProfileContent';
import { Field } from 'formik';
import Grid from '@material-ui/core/Grid';
import React from 'react';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      '& + &': {
        marginTop: theme.spacing(2),
      },
    },
    grid: {
      padding: theme.spacing(2, 0),
    },
  }),
);

function EditableProfileContent({ bio, url, status }: EditableProfileContentProps): React.ReactElement {
  const classes = useStyles();
  return (
    <Grid className={classes.grid} spacing={4}>
      <Grid className={classes.field} item>
        <Field component={TextField} fullWidth label="Status" name="status" placeholder="Status" variant="outlined" />
      </Grid>
      <Grid className={classes.field} item>
        <Field
          className={classes.field}
          component={TextField}
          fullWidth
          label="Biografi" /* Translation needed */
          multiline
          name="bio"
          placeholder="Biografi" /* Translation needed */
          variant="outlined"
        />
      </Grid>
      <Grid className={classes.field} item>
        <Field
          className={classes.field}
          component={TextField}
          fullWidth
          label="Länk" /* Translation needed */
          name="url"
          placeholder="https://example.com"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}

export default EditableProfileContent;
