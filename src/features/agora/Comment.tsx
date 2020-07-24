import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Moment from 'react-moment';
import React from 'react';
import ReplyIcon from '@material-ui/icons/Reply';
import ReportIcon from '@material-ui/icons/Report';
import { Link as RouterLink } from 'react-router-dom';
import StarButton from 'components/StarButton';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

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
      background: theme.palette.divider,
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
    textGridFolded: {
      marginTop: theme.spacing(1.3),
    },
  }),
);

export interface CommentProps {
  children?: React.ReactNode;
  folded?: boolean;
  author: React.ReactNode;
  text: string;
  time: Date;
}

function Comment({ children, folded = false, author, text, time }: CommentProps): React.ReactElement {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<boolean>(folded);

  const handleExpanded = (): void => {
    setExpanded(!expanded);
  };

  return (
    <Grid alignItems="stretch" container>
      <Grid alignItems="stretch" item>
        {expanded === false ? (
          <>
            <StarButton
              confettiConfig={{
                elementCount: 15,
                startVelocity: 20,
              }}
              fontSize="small"
            />
            <ButtonBase className={classes.divider} onClick={handleExpanded}>
              <Divider flexItem orientation="vertical" />
            </ButtonBase>
          </>
        ) : (
          <IconButton onClick={handleExpanded}>
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        )}
      </Grid>
      <Grid className={clsx(classes.textGrid, { [classes.textGridFolded]: folded })} item>
        <Grid item>
          <ul className={classes.list}>
            <li>{author}</li>
            <li>
              <Moment fromNow>{time}</Moment>
            </li>
          </ul>
        </Grid>
        <Collapse in={!expanded} timeout="auto" unmountOnExit>
          <Grid>
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
        </Collapse>
      </Grid>
    </Grid>
  );
}

export default Comment;
