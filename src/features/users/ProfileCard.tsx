import * as Yup from 'yup';

import { Button, CardContent, Link, Typography } from '@material-ui/core';
import { Form, Formik, FormikHelpers } from 'formik';
import ProfileContent, { ProfileContentProps } from './ProfileContent';
import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import EditableProfileContent from './EditableProfileContent';
import { Link as RouterLink } from 'react-router-dom';

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
      minWidth: theme.spacing(34),
      padding: theme.spacing(0, 2, 6, 2),
    },
    header: (props: StyleProps) => ({
      backgroundColor: props.backgroundColor,
      height: theme.spacing(8),
    }),
    root: {
      minWidth: theme.spacing(30),
    },
  }),
);

export interface ProfileState {
  bio: string | undefined;
  link: string | undefined;
  status: string | undefined;
}

export const ProfileValidationSchema = Yup.object({
  bio: Yup.string(),
  link: Yup.string().url(),
  status: Yup.string(),
});

interface ProfileProps extends ProfileContentProps {
  firstName: string;
  isOwner?: boolean;
  joinDate: Date;
  lastName: string;
  onSubmit?: (values: ProfileState, formikHelpers: FormikHelpers<ProfileState>) => void | Promise<any>;
  username: string;
}

export function ProfileCard({
  bio,
  firstName,
  isOwner,
  joinDate,
  lastName,
  link,
  onSubmit = console.log,
  status,
  username,
}: ProfileProps): React.ReactElement {
  const [editing, setEditing] = useState<boolean>(false);
  const classes = useStyles({ backgroundColor: '#1e6ee8' });

  return (
    <Card className={classes.root}>
      <CardHeader className={classes.header} />
      <CardContent className={classes.content}>
        <Avatar className={classes.avatar} />
        <Typography component="h2" variant="h6">
          {firstName + ' ' + lastName}
        </Typography>
        <Link component={RouterLink} to={`/@${username}`} variant="subtitle1">{`@${username}`}</Link>
        {!editing && <ProfileContent bio={bio} joinDate={joinDate} link={link} status={status} />}
        <Formik
          initialValues={{
            bio,
            link,
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
              {editing && <EditableProfileContent bio={bio} link={link} status={status} />}
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
      </CardContent>
    </Card>
  );
}

export default function ConnectedProfile(): React.ReactElement {
  // console.log(data);
  return <div />;
  // return <ProfileCard firstName="Douglas" joinDate={new Date()} lastName="Bengtsson" username="Nautman" />;
}
