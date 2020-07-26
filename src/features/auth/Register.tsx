import { createStyles, makeStyles } from '@material-ui/core/styles';
import withWidth, { WithWidthProps, isWidthUp } from '@material-ui/core/withWidth';

import AuthPageProps from './authPageProps';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import RegisterForm from './RegisterForm';

const useStyles = makeStyles(({ spacing, breakpoints, palette }) =>
  createStyles({
    root: {
      marginTop: spacing(4),
      padding: spacing(1, 4),
      [breakpoints.down('xs')]: {
        marginTop: 0,
      },
    },
  }),
);

export interface RegisterProps extends AuthPageProps, WithWidthProps {}

function Register({ isDialog = false, width = 'xs', redirect = (): void => {} }: RegisterProps): React.ReactElement {
  const styles = useStyles();
  const Wrapper = isDialog ? Container : isWidthUp('sm', width) ? Paper : Container;

  return (
    <Container component="main" disableGutters maxWidth={isDialog ? 'xs' : 'sm'}>
      <Wrapper className={styles.root}>
        <RegisterForm isDialog={isDialog} onSuccess={(): void => redirect('VERIFY_EMAIL')} redirect={redirect} />
      </Wrapper>
    </Container>
  );
}

export default withWidth()(Register);
