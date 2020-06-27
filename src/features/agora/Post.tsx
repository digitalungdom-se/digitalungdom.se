import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CommentIcon from '@material-ui/icons/Comment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import ReportIcon from '@material-ui/icons/Report';
import ShareIcon from '@material-ui/icons/Share';
import { StarButton } from 'components/StarButton';
import Typography from '@material-ui/core/Typography';

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
    actions: {
      marginTop: theme.spacing(1),
    },
    avatar: {
      // height: theme.spacing(4),
      margin: theme.spacing(0, 1),
      // width: theme.spacing(4),
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
}

function Post({ body, commentAmmount = 0, starAmmount = 0, title }: PostProps): React.ReactElement {
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
              <Typography>{body}</Typography>
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
                {starAmmount}
              </StarButton>
              <Button className={classes.action}>
                <CommentIcon fontSize="small" />
                {commentAmmount}
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

export default Post;
