import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CommentIcon from '@material-ui/icons/Comment';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Moment from 'react-moment';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import ReportIcon from '@material-ui/icons/Report';
import { Link as RouterLink } from 'react-router-dom';
import ShareIcon from '@material-ui/icons/Share';
import Skeleton from '@material-ui/lab/Skeleton';
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
    paper: {
      padding: theme.spacing(2),
    },
    root: {
      marginTop: theme.spacing(2),
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
  author?: React.ReactNode;
  stars?: number;
  commentAmount?: number;
  children?: React.ReactNode;
  name?: string;
  body?: string;
  time: Date;
  username?: string;
  title: string;
  type?: 'TEXT' | 'LINK';
  loading?: boolean;
  isStarred?: boolean;
  link?: string;
  handleStarring?: () => void;
}

function Post({
  body = '',
  commentAmount = 0,
  stars = 0,
  title,
  type = 'TEXT',
  link = '',
}: PostProps): React.ReactElement {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
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
              <Link component={RouterLink} to={link}>
                {title}
              </Link>
              {type === 'TEXT' ? (
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
                <span>{stars}</span>
              </StarButton>
              <Button className={classes.action}>
                <CommentIcon fontSize="small" />
                <span>{commentAmount}</span>
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
  author,
  body = '',
  commentAmount = 0,
  loading = false,
  name,
  stars = 0,
  time,
  title,
  type = 'TEXT',
  username,
  isStarred = false,
  link = '',
  children,
  handleStarring = () => {},
}: PostProps): React.ReactElement {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          !loading ? (
            <Avatar />
          ) : (
            <Skeleton variant="circle">
              <Avatar />
            </Skeleton>
          )
        }
        className={classes.header}
        subheader={
          !loading ? (
            <Typography component={RouterLink} style={{ wordWrap: 'break-word' }} to={link} variant="h6">
              {title}
            </Typography>
          ) : (
            <Skeleton variant="text" />
          )
        }
        title={
          !loading ? (
            <Grid container direction="row" justify="space-between">
              <Grid>
                {author ? (
                  author
                ) : (
                  <Link component={RouterLink} to={`/@${username}`}>
                    {name}
                  </Link>
                )}
              </Grid>
              <Grid>
                <Moment fromNow>{time}</Moment>
              </Grid>
            </Grid>
          ) : (
            <Skeleton variant="text" />
          )
        }
      />
      <CardContent className={clsx(classes.content, { [classes.contentWithLink]: type === 'LINK' })}>
        {!loading ? (
          type === 'LINK' ? (
            <Link href={body} style={{ wordBreak: 'break-all' }}>
              {body}
            </Link>
          ) : (
            <Typography style={{ wordWrap: 'break-word' }} variant="body1">
              {body}
            </Typography>
          )
        ) : (
          <Skeleton height={60} variant="rect" />
        )}
      </CardContent>
      {!loading && (
        <CardActions className={classes.actions}>
          <StarButton
            className={classes.action}
            confettiConfig={{
              elementCount: 15,
              startVelocity: 20,
            }}
            fontSize="default"
            handleStarring={handleStarring}
            isStarred={isStarred}
          >
            <span>{stars}</span>
          </StarButton>
          <Button className={classes.action}>
            <CommentIcon />
            <span>{commentAmount}</span>
          </Button>
          <IconButton className={classes.action}>
            <ShareIcon />
          </IconButton>
          <IconButton className={classes.action}>
            <ReportIcon />
          </IconButton>
        </CardActions>
      )}
      <Divider />
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
}

export default Post;
