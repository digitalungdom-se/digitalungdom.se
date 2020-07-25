import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import AgoraBodyField from './AgoraBodyField';
import { AgoraBodyFieldProps } from './AgoraBodyField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Moment from 'react-moment';
import RenderMarkdown from 'components/RenderMarkdown';
import ReportIcon from '@material-ui/icons/Report';
import { Link as RouterLink } from 'react-router-dom';
import ShareIcon from '@material-ui/icons/Share';
import Skeleton from '@material-ui/lab/Skeleton';
import { StarButton } from 'components/StarButton';
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
    titleElements: {
      '& > div + div': {
        marginLeft: theme.spacing(1),
      },
    },
  }),
);

export interface PostProps extends Omit<AgoraBodyFieldProps, 'body'> {
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
  handleDelete?: () => void;
  isAuthor?: boolean;
}

export default function Post({
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
  isAuthor = false,
  handleStarring = () => {},
  handleEdit = () => {},
  handleDelete = () => {},
}: PostProps): React.ReactElement {
  const classes = useStyles();

  const [isEditing, setEditing] = useState<boolean>(false);

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
            <Link color="textPrimary" component={RouterLink} style={{ wordWrap: 'break-word' }} to={link} variant="h6">
              {title}
            </Link>
          ) : (
            <Skeleton variant="text" />
          )
        }
        title={
          !loading ? (
            <Grid className={classes.titleElements} container direction="row" justify="space-between">
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
      {Boolean(body || loading) && (
        <CardContent
          className={clsx(classes.content, {
            [classes.contentWithLink]: type === 'LINK',
          })}
        >
          {!loading ? (
            type === 'LINK' ? (
              <Link href={body} style={{ wordBreak: 'break-all' }}>
                {body}
              </Link>
            ) : isEditing ? (
              <AgoraBodyField
                body={body}
                cancelEdit={() => setEditing(false)}
                handleEdit={(values, { setSubmitting, ...args }) => {
                  handleEdit(values, {
                    ...args,
                    setSubmitting: (bool: boolean) => {
                      setEditing(bool);
                      setSubmitting(bool);
                    },
                  });
                }}
              />
            ) : (
              <RenderMarkdown source={body} />
            )
          ) : (
            <Skeleton height={60} variant="rect" />
          )}
        </CardContent>
      )}
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
          {isAuthor && (
            <>
              <IconButton
                className={classes.action}
                onClick={() => {
                  setEditing(!isEditing);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton className={classes.action} onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </>
          )}
        </CardActions>
      )}
      <Divider />
      {children && <CardContent>{children}</CardContent>}
    </Card>
  );
}
