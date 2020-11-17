import { Details } from './userTypes';
import Link from '@material-ui/core/Link';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

interface UserLinkProps {
  details?: Details;
}

function UserLink(props: UserLinkProps): React.ReactElement {
  if (props === null) return <span>deleted</span>;
  return (
    <Link component={RouterLink} to={`/@${props.details?.username}`}>
      {props.details?.firstName + ' ' + props.details?.lastName}
    </Link>
  );
}

export default UserLink;
