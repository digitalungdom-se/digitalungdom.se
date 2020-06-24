import Radio, { RadioProps } from '@material-ui/core/Radio';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { Color } from '@material-ui/core';
import React from 'react';
import clsx from 'clsx';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    checked: {},
    color: ({ color }: StyledRadioProps) => ({
      background: color[400],
      color: `${color[400]} !important`,
    }),
    icon: {
      '&$checked $layer': {
        transform: 'scale(1)',
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
          easing: theme.transitions.easing.easeOut,
        }),
      },
      borderRadius: 0,
      display: 'flex',
      height: '1em',
      position: 'relative',
      width: '1em',
    },
    layer: {
      border: '2px solid white',
      height: '1em',
      left: 0,
      position: 'absolute',
      transform: 'scale(0)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeIn,
      }),
      width: '1em',
    },
    root: ({ color }: StyledRadioProps) => ({
      '&:hover': {
        backgroundColor: fade(color[400], theme.palette.action.hoverOpacity),
      },
      borderRadius: 0,
      color: `${color[600]} !important`,
    }),
  }),
);

interface StyledRadioProps extends Omit<RadioProps, 'color'> {
  color: Color;
}

export default function StyledRadio({ color, ...props }: StyledRadioProps): React.ReactElement {
  const classes = useStyles({ color });
  return (
    <Radio
      checkedIcon={
        <div className={clsx(classes.icon, classes.color, { [classes.checked]: props.checked })}>
          <div className={classes.layer} />
        </div>
      }
      className={classes.root}
      color="default"
      icon={
        <div className={clsx(classes.icon, classes.color, { [classes.checked]: props.checked })}>
          <div className={clsx(classes.layer)} />
        </div>
      }
      {...props}
    />
  );
}
