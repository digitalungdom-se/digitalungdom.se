import React, { useState } from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import withWidth, { WithWidthProps, isWidthUp } from '@material-ui/core/withWidth';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import RegisterForm from './RegisterForm';
import VerifyEmailPage from './VerifyEmailPage';

interface Props extends WithWidthProps {
  onSuccess: () => void;
  isDialog?: boolean;
  redirect?: () => void;
}

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

function Register({ onSuccess, isDialog = false, width = 'xs', redirect = () => {} }: Props): React.ReactElement {
  const styles = useStyles();
  const [showVerifyEmailPage, setVerifyEmailPage] = useState(true);
  const Wrapper = isDialog ? Container : isWidthUp('sm', width) ? Paper : Container;

  return (
    <Container component="main" disableGutters maxWidth={isDialog ? 'xs' : 'sm'}>
      <Wrapper className={styles.root}>
        {showVerifyEmailPage ? (
          <VerifyEmailPage />
        ) : (
          <RegisterForm isDialog={isDialog} onSuccess={(): void => setVerifyEmailPage(true)} redirect={redirect} />
        )}
      </Wrapper>
    </Container>
  );
}

export default withWidth()(Register);
