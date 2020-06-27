import { CardActionArea, CardContent } from '@material-ui/core';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CommentIcon from '@material-ui/icons/Comment';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Moment from 'react-moment';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import ReportIcon from '@material-ui/icons/Report';
import { Link as RouterLink } from 'react-router-dom';
import ShareIcon from '@material-ui/icons/Share';
import { StarButton } from 'components/StarButton';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    action: {
      '& .MuiSvgIcon-root + span': {
        marginLeft: theme.spacing(0.5),
      },
      '&:hover, &:focus': {
        color: theme.palette.text.primary,
      },
      color: theme.palette.text.secondary,
    },
    actions: {
      paddingTop: 0,
    },
    avatar: {
      margin: theme.spacing(0, 1),
    },
    content: {},
    contentWithLink: {
      marginLeft: theme.spacing(7),
      paddingTop: 0,
    },
    header: {
      paddingBottom: 0,
    },
    root: {
      padding: theme.spacing(2),
    },
    starButton: {
      fontSize: theme.spacing(4),
    },
    textGrid: {
      height: '100%',
      paddingLeft: theme.spacing(2),
    },
  }),
);

export interface PostProps {
  starAmmount?: number;
  commentAmmount?: number;
  children?: React.ReactNode;
  name: string;
  body?: string;
  time: Date;
  username: string;
  title: string;
  type?: 'text' | 'link';
}

function Post({ body, commentAmmount = 0, starAmmount = 0, title, type = 'text' }: PostProps): React.ReactElement {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Grid container>
        <Grid item>
          <Avatar className={classes.avatar} />
        </Grid>
        <Grid item>
          <Grid
            alignItems="flex-start"
            className={classes.textGrid}
            container
            direction="column"
            justify="space-between"
          >
            <Grid item>
              <Typography component="h2" variant="h6">
                {title}
              </Typography>
              {type === 'text' ? (
                <Typography>{body}</Typography>
              ) : (
                <Link component={RouterLink} to={body}>
                  {body}
                </Link>
              )}
            </Grid>
            <Grid className={classes.actions} item>
              <StarButton
                className={classes.action}
                confettiConfig={{
                  elementCount: 15,
                  startVelocity: 20,
                }}
                fontSize="small"
              >
                <span>{starAmmount}</span>
              </StarButton>
              <Button className={classes.action}>
                <CommentIcon fontSize="small" />
                <span>{commentAmmount}</span>
              </Button>
              <Button className={classes.action} size="small">
                <ShareIcon />
              </Button>
              <Button className={classes.action} size="small">
                <ReportIcon />
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export function CardPost({
  body,
  commentAmmount = 0,
  name,
  starAmmount = 0,
  time,
  title,
  type = 'text',
  username,
}: PostProps): React.ReactElement {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        className={classes.header}
        subheader={
          <Typography component="h2" variant="h6">
            {title}
          </Typography>
        }
        title={
          <Grid container direction="row" justify="space-between">
            <Grid>
              <Link component={RouterLink} to={`/@${username}`}>
                {name}
              </Link>
            </Grid>
            <Grid>
              <Moment fromNow>{time}</Moment>
            </Grid>
          </Grid>
        }
      />
      <CardContent className={clsx(classes.content, { [classes.contentWithLink]: type === 'link' })}>
        <Typography variant="body1">
          {type === 'link' ? (
            <Link component={RouterLink} to={body}>
              {body}
            </Link>
          ) : (
            body
          )}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <StarButton
          className={classes.action}
          confettiConfig={{
            elementCount: 15,
            startVelocity: 20,
          }}
          fontSize="default"
        >
          <span>{starAmmount}</span>
        </StarButton>
        <Button className={classes.action}>
          <CommentIcon />
          <span>{commentAmmount}</span>
        </Button>
        <IconButton className={classes.action}>
          <ShareIcon />
        </IconButton>
        <IconButton className={classes.action}>
          <ReportIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default Post;
