import * as Yup from 'yup';

import { Form, Formik, FormikHelpers } from 'formik';
import ProfileContent, { ProfileContentProps } from './ProfileContent';
import React, { useState } from 'react';
import { Theme, createStyles, makeStyles, useTheme } from '@material-ui/core/styles';

import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import EditableProfileContent from './EditableProfileContent';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import ProfileAvatar from './ProfileAvatar';
import { Link as RouterLink } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import UploadProfilePicture from './UploadProfilePicture';

interface StyleProps {
  backgroundColor: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      height: theme.spacing(8),
      marginTop: theme.spacing(-4),
      width: theme.spacing(8),
    },
    content: {
      padding: theme.spacing(0, 2, 6, 2),
    },
    header: (props: StyleProps) => ({
      backgroundColor: props.backgroundColor,
      height: theme.spacing(8),
    }),
    uploadPicture: {
      marginTop: theme.spacing(1),
    },
  }),
);

export interface ProfileState {
  bio: string | undefined;
  url: string | undefined;
  status: string | undefined;
}

export const ProfileValidationSchema = Yup.object({
  bio: Yup.string(),
  url: Yup.string().url(),
  status: Yup.string(),
});

interface ProfileProps extends ProfileContentProps {
  firstName: string;
  isOwner?: boolean;
  joinDate: Date;
  lastName: string;
  onSubmit?: (values: ProfileState, formikHelpers: FormikHelpers<ProfileState>) => void | Promise<any>;
  username: string;
  userID?: string;
}

export function ProfileCard({
  bio,
  firstName,
  isOwner,
  joinDate,
  lastName,
  url,
  onSubmit = console.log,
  status,
  username,
  userID,
}: ProfileProps): React.ReactElement {
  const [editing, setEditing] = useState<boolean>(false);
  const classes = useStyles({ backgroundColor: '#1e6ee8' });
  const theme = useTheme();

  return (
    <Card>
      <CardHeader className={classes.header} />
      <CardContent className={classes.content}>
        <ProfileAvatar className={classes.avatar} userID={userID} width={theme.spacing(8)} />
        <Typography component="h2" variant="h6">
          {firstName + ' ' + lastName}
        </Typography>
        <Link component={RouterLink} to={`/@${username}`} variant="subtitle1">{`@${username}`}</Link>
        {!editing && <ProfileContent bio={bio} joinDate={joinDate} status={status} url={url} />}
        <Formik
          initialValues={{
            bio,
            url,
            status,
          }}
          onSubmit={(values, { setSubmitting, ...args }): void => {
            onSubmit(values, {
              setSubmitting: (bool: boolean) => {
                setSubmitting(bool);
                setEditing(bool);
              },
              ...args,
            });
          }}
          validationSchema={ProfileValidationSchema}
        >
          {({ isSubmitting, submitForm }): React.ReactElement => (
            <Form>
              {editing && <EditableProfileContent bio={bio} status={status} url={url} />}
              {isOwner && (
                <Button
                  disabled={isSubmitting}
                  disableElevation
                  fullWidth
                  onClick={(): void => {
                    if (editing === false) setEditing(true);
                    else submitForm();
                  }}
                  variant="contained"
                >
                  {editing ? 'Save information' : 'Edit information'}
                </Button>
              )}
            </Form>
          )}
        </Formik>
        {isOwner && (
          <Grid className={classes.uploadPicture} item>
            <UploadProfilePicture
              onSubmit={(blob) => {
                const data = new FormData();
                const file = new File([blob], 'profilePicture.png');
                data.append('profilePicture', file);
                return Axios.post('/user/@me/profile_picture', data, {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                  },
                })
                  .then((res) => console.log(res))
                  .catch((err) => console.error(err));
              }}
            />
          </Grid>
        )}
      </CardContent>
    </Card>
  );
}

export default function ConnectedProfile(): React.ReactElement {
  // console.log(data);
  return <div />;
  // return <ProfileCard firstName="Douglas" joinDate={new Date()} lastName="Bengtsson" username="Nautman" />;
}
