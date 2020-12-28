import React, { useEffect, useRef, useState } from 'react';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import clsx from 'clsx';

const styles = (theme: Theme) =>
  createStyles({
    '@keyframes maxHeightChanges': {
      '0%': {
        maxHeight: 300,
      },
      '100%': {
        maxHeight: '100vh',
      },
    },
    before: {
      alignItems: 'flex-end',
      background: `linear-gradient(transparent 150px, ${theme.palette.background.paper})`,
      bottom: 0,
      display: 'flex',
      height: '100%',
      left: 0,
      pointerEvents: 'none',
      position: 'absolute',
      width: '100%',
    },
    button: {
      display: 'block',
      margin: '0 auto',
      marginBottom: theme.spacing(2),
      pointerEvents: 'all',
    },
    root: {
      maxHeight: 300,
      overflow: 'hidden',
      position: 'relative',
    },
    // eslint-disable-next-line sort-keys
    overflowRoot: {
      animation: `$maxHeightChanges ${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeOut}`,
      maxHeight: 'none',
      overflow: 'none',
    },
  });

export interface FadeOutTextProps extends WithStyles<typeof styles> {
  children?: React.ReactNode;
  readMoreText?: string;
}

interface CalcHeightComponentProps {
  setHeight: React.Dispatch<React.SetStateAction<number>>;
  children?: React.ReactNode;
}

const CalcHeightComponent = ({ setHeight, children }: CalcHeightComponentProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current !== null) setHeight(ref.current.clientHeight);
  });
  return <div ref={ref}>{children}</div>;
};

const FadeOutText = ({ children, classes, readMoreText = 'Visa mer' /* Translation needed */ }: FadeOutTextProps) => {
  const [height, setHeight] = useState<number>(0);
  const [showAll, setShowAll] = useState<boolean>(false);

  const fadeOut = height > 200 && showAll === false;

  return (
    <div className={clsx(classes.root, { [classes.overflowRoot]: fadeOut === false })}>
      <CalcHeightComponent setHeight={setHeight}>{children}</CalcHeightComponent>
      {fadeOut && (
        <div className={classes.before}>
          <Button className={classes.button} onClick={() => setShowAll(true)} variant="contained">
            {readMoreText}
          </Button>
        </div>
      )}
    </div>
  );
};

export default withStyles(styles)(FadeOutText);
