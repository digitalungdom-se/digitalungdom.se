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
          label="Biography"
          multiline
          name="bio"
          placeholder="Biography"
          variant="outlined"
        />
      </Grid>
      <Grid className={classes.field} item>
        <Field
          className={classes.field}
          component={TextField}
          fullWidth
          label="Link"
          name="url"
          placeholder="https://example.com"
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
}

export default EditableProfileContent;
