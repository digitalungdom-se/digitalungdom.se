import Link from '@material-ui/core/Link';
import React from 'react';
import { RootState } from 'app/store';
import { Link as RouterLink } from 'react-router-dom';
import { selectUserById } from './usersSlice';
import { useSelector } from 'react-redux';

function UserLink({ id = 'deleted' }: { id?: string }): React.ReactElement {
  const user = useSelector((state: RootState) => selectUserById(state, id));
  if (user === undefined) return <span>deleted</span>;
  else
    return (
      <Link component={RouterLink} to={`/@${user.details.username}`}>
        {user.details.name}
      </Link>
    );
}

export default UserLink;
