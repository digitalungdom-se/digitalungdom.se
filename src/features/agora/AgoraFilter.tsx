import Button, { ButtonProps } from '@material-ui/core/Button';
import { LinkProps, Link as RouterLink } from 'react-router-dom';
import { Theme, withStyles } from '@material-ui/core/styles';

import React from 'react';

const StyledButton = withStyles((theme: Theme) => ({
  root: {
    '& + &': {
      marginLeft: theme.spacing(1),
    },
  },
}))((props: LinkProps & ButtonProps) => <Button {...props} />);

export interface AgoraFilterProps {
  hypagora?: string | undefined;
  sort: string | undefined;
  path?: string | undefined;
}

export default function AgoraFilter({
  path = '/',
  hypagora = 'general',
  sort = 'new',
}: AgoraFilterProps): React.ReactElement {
  return (
    <>
      <StyledButton
        color={sort === 'new' ? 'primary' : 'default'}
        component={RouterLink}
        disableElevation
        to={`${path}/${hypagora}/new`}
        variant="contained"
      >
        New
      </StyledButton>

      <StyledButton
        color={sort === 'top' ? 'primary' : 'default'}
        component={RouterLink}
        disableElevation
        to={`${path}/${hypagora}/top`}
        variant="contained"
      >
        Top
      </StyledButton>
    </>
  );
}
