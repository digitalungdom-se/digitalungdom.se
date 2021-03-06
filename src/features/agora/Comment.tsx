import React, { useState } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { blue, green, orange, purple, red, yellow } from '@material-ui/core/colors';

import AgoraBodyField from './AgoraBodyField';
import { AgoragramComponentProps } from './agoraTypes';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Collapse from '@material-ui/core/Collapse';
import DeleteIcon from '@material-ui/icons/Delete';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Moment from 'react-moment';
import RenderMarkdown from 'components/RenderMarkdown';
import ReplyIcon from '@material-ui/icons/Reply';
import StarButton from 'components/StarButton';
import clsx from 'clsx';
import { fade } from '@material-ui/core/styles/colorManipulator';

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
      background: theme.palette.action.hover,
      '& hr': {
        height: '100%',
        width: 5,
      },
      '&:focus': {
        background: theme.palette.action.selected,
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
    dividerLevel: ({ level }: { level: number; isNew: boolean }) => ({
      background: [red['A100'], orange['A100'], yellow['A100'], green['A100'], blue['A100'], purple['A100']][level % 6],
    }),
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
    root: ({ isNew }: { level: number; isNew: boolean }) => ({
      backgroundColor: isNew ? fade(theme.palette.info.main, 0.07) : 'none',
    }),
    textGrid: {
      marginTop: theme.spacing(1),
    },
    textGridFolded: {
      marginTop: theme.spacing(1.3),
    },
  }),
);

export interface CommentProps extends Omit<AgoragramComponentProps, 'title' | 'commentAmount' | 'type'> {
  folded?: boolean;
  replyField?: (setReplying: (b: boolean) => void) => JSX.Element;
  handleDelete?: () => any;
  level?: number;
  isNew?: boolean;
}

function Comment({
  children,
  folded = false,
  author,
  body,
  time,
  replyField,
  isAuthor,
  handleEdit = () => {},
  handleDelete = () => {},
  handleStarring = () => true,
  handleReport = () => {},
  level = 0,
  loading,
  starred,
  isNew = false,
  stars,
  modified,
}: CommentProps): React.ReactElement {
  const classes = useStyles({
    isNew,
    level,
  });
  const [expanded, setExpanded] = React.useState<boolean>(folded);
  const [showReplyField, setReplyField] = React.useState<boolean>(false);

  const handleExpanded = (): void => {
    setExpanded(!expanded);
  };

  const handleReplyField = (): void => {
    setReplyField(!showReplyField);
  };

  const [isEditing, setEditing] = useState<boolean>(false);
  if (loading) return <span />;

  return (
    <Box alignItems="stretch" className={classes.root} display="flex">
      <Box alignItems="stretch">
        {expanded === false ? (
          <>
            <StarButton
              confettiConfig={{
                elementCount: 15,
                startVelocity: 20,
              }}
              fontSize="small"
              handleStarring={handleStarring}
              icon
              isStarred={starred}
            />
            <ButtonBase className={clsx(classes.divider, classes.dividerLevel)} onClick={handleExpanded}>
              <Divider flexItem orientation="vertical" />
            </ButtonBase>
          </>
        ) : (
          <IconButton onClick={handleExpanded}>
            <ExpandMoreIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
      <Box className={clsx(classes.textGrid, { [classes.textGridFolded]: folded })} flexGrow={1}>
        <Grid item>
          <ul className={classes.list}>
            <li>{author}</li>
            <li>{`${stars} stjärnor` /* Translation needed */}</li>
            <li>
              <span title={`Posted: ${time}. ${modified ? 'Modified: ' + modified : ''}`}>
                <Moment fromNow>{time}</Moment>
                {modified && '*'}
              </span>
            </li>
          </ul>
        </Grid>
        <Collapse in={!expanded} timeout="auto" unmountOnExit>
          <Grid>
            {isEditing && body !== undefined ? (
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
            )}
            <div>
              <Button className={classes.action} onClick={handleReplyField} size="small">
                <ReplyIcon fontSize="inherit" />
                {'Svara' /* Translation needed */}
              </Button>
              {isAuthor && (
                <>
                  <Button className={classes.action} onClick={() => setEditing(true)} size="small">
                    <EditIcon fontSize="inherit" />
                    {'Redigera' /* Translation needed */}
                  </Button>
                  <Button className={classes.action} onClick={handleDelete} size="small">
                    <DeleteIcon fontSize="inherit" />
                    {'Radera' /* Translation needed */}
                  </Button>
                </>
              )}
            </div>
            {showReplyField && replyField !== undefined && replyField((b: boolean) => setReplyField(b))}
            {children}
          </Grid>
        </Collapse>
      </Box>
    </Box>
  );
}

export default Comment;
