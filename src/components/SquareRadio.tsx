import Radio, { RadioProps } from '@material-ui/core/Radio';
import React, { useEffect, useRef } from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

import { ButtonBaseActions } from '@material-ui/core/ButtonBase';
import { Color } from '@material-ui/core';
import clsx from 'clsx';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@keyframes borderGoesWhite': {
      '0%': {
        borderColor: 'white',
      },
      '80%': {
        borderColor: 'white',
      },
      '100%': {
        // UNCOMMENT WHEN DISABLING SHADOW:
        // borderColor: theme.palette.action.active,
      },
    },
    checked: {},
    color: ({ color }: SquareRadioProps) => ({
      background: color[400],
      color: `${color[400]} !important`,
    }),
    icon: {
      '&$checked $layer': {
        animation: `$borderGoesWhite ${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeOut}`,
        // DO COMMENT WHEN DISABLING SHADOW:
        boxShadow: theme.shadows[1],
        // UNCOMMENT WHEN DISABLING SHADOW:
        // borderColor: theme.palette.action.active,
        transform: 'scale(1)',
        transition: theme.transitions.create(['transform', 'borderColor'], {
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
      border: '3px solid',
      borderColor: 'white',
      height: 'calc(1em + 6px)',
      left: -3,
      position: 'absolute',
      top: -3,
      transform: 'scale(0)',
      transition: theme.transitions.create(['transform', 'borderColor'], {
        duration: theme.transitions.duration.shortest,
        easing: theme.transitions.easing.easeIn,
      }),
      width: 'calc(1em + 6px)',
    },
    root: ({ color }: SquareRadioProps) => ({
      '&:hover': {
        backgroundColor: fade(color[400], theme.palette.action.hoverOpacity),
      },
      borderRadius: 0,
      color: `${color[600]} !important`,
    }),
  }),
);

export interface SquareRadioProps extends Omit<RadioProps, 'color'> {
  color: Color;
  isFocused?: boolean;
}

export default function SquareRadio({ color, isFocused = false, ...props }: SquareRadioProps): React.ReactElement {
  /**
   * Source for programmatically setting focus and ripple
   * https://github.com/mui-org/material-ui/issues/13761
   */
  const inputRef = useRef<HTMLInputElement>(null);
  const actionRef = useRef<ButtonBaseActions>(null);

  useEffect(() => {
    if (isFocused && inputRef.current !== null && actionRef.current !== null) {
      inputRef.current.focus();
      actionRef.current.focusVisible();
    }
  }, [isFocused]);

  const classes = useStyles({ color });
  return (
    <Radio
      action={actionRef}
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
      inputRef={inputRef}
      {...props}
    />
  );
}
