import { Button, Typography } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Moment from 'react-moment';
import React from 'react';
import ReplyIcon from '@material-ui/icons/Reply';
import ReportIcon from '@material-ui/icons/Report';
import { Link as RouterLink } from 'react-router-dom';
import StarButton from 'components/StarButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    action: {
      '& + &': {
        marginLeft: theme.spacing(1),
      },
      '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5),
      },
      '&:hover, &:focus': {
        color: theme.palette.text.primary,
      },
      color: theme.palette.text.secondary,
      padding: 0,
    },
    divider: {
      '& hr': {
        height: '100%',
        width: 5,
      },
      '&:focus': {
        background: theme.palette.action.focus,
        transition: theme.transitions.create('background', {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeInOut,
        }),
      },
      display: 'block',
      height: `calc(100% - ${theme.spacing(6)}px)`,
      margin: '0 auto',
      transition: theme.transitions.create('background', {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeInOut,
      }),
    },
    list: {
      '& > li': {
        display: 'inline-block',
      },
      '& li + li': {
        marginLeft: theme.spacing(1),
      },
      listStyleType: 'none',
      margin: 0,
      padding: 0,
    },
    root: {},
    text: {
      whiteSpace: 'pre-wrap',
    },
    textGrid: {
      marginTop: theme.spacing(1),
    },
  }),
);

export interface CommentProps {
  name: string;
  text: string;
  time: Date;
  username: string;
  children?: React.ReactNode;
}

function Comment({ name, text, time, username, children }: CommentProps): React.ReactElement {
  const classes = useStyles();

  return (
    <Grid alignItems="stretch" container>
      <Grid alignItems="stretch" item>
        <StarButton
          confettiConfig={{
            elementCount: 15,
            startVelocity: 20,
          }}
          fontSize="small"
        />
        <ButtonBase className={classes.divider}>
          <Divider flexItem orientation="vertical" />
        </ButtonBase>
      </Grid>
      <Grid className={classes.textGrid} item>
        <Grid item>
          <ul className={classes.list}>
            <li>
              <Link component={RouterLink} to={`/@${username}`}>
                {name}
              </Link>
            </li>
            <li>
              <Moment fromNow>{time}</Moment>
            </li>
          </ul>
        </Grid>
        <Typography className={classes.text}>{text}</Typography>
        <div>
          <Button className={classes.action} size="small">
            <ReplyIcon fontSize="inherit" />
            Reply
          </Button>
          <Button className={classes.action} size="small">
            <ReportIcon fontSize="inherit" />
            Report
          </Button>
        </div>
        {children}
      </Grid>
    </Grid>
  );
}

export default Comment;
