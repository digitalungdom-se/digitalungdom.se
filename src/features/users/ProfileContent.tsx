import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Chip from '@material-ui/core/Chip';
import Link from '@material-ui/core/Link';
import LinkIcon from '@material-ui/icons/Link';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bio: {
      margin: theme.spacing(1, 0, 0, 2),
      whiteSpace: 'pre-wrap',
    },
    chip: {
      '& + &': {
        marginTop: theme.spacing(1),
      },
    },
    list: {
      listStyle: 'none',
      padding: 0,
    },
    status: {
      display: 'inline-block',
      marginLeft: theme.spacing(1),
    },
  }),
);

export interface EditableProfileContentProps {
  bio?: string;
  url?: string;
  status?: string;
}

export interface ProfileContentProps extends EditableProfileContentProps {
  joinDate: Date;
}

function ProfileContent({ bio, url, joinDate, status }: ProfileContentProps): React.ReactElement {
  const classes = useStyles();
  return (
    <>
      {status && (
        <Typography className={classes.status} variant="subtitle2">
          – {status}
        </Typography>
      )}
      <Typography className={classes.bio} variant="body2">
        {bio}
      </Typography>
      <ul className={classes.list}>
        {url && (
          <li className={classes.chip}>
            <Chip
              aria-label="Biography url"
              avatar={<LinkIcon />}
              clickable
              component={Link}
              href={url}
              label={url}
              size="small"
            />
          </li>
        )}
        {joinDate && (
          <li className={classes.chip}>
            <Chip
              aria-label="Member join date"
              avatar={<AccessTimeIcon />}
              label={`Medlem sedan ${joinDate.toLocaleDateString()}`}
              size="small"
            />
          </li>
        )}
      </ul>
    </>
  );
}

export default ProfileContent;
