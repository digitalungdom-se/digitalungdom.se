import Button, { ButtonProps } from '@material-ui/core/Button';
import Confetti, { ConfettiConfig } from 'react-dom-confetti';

import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import StarIcon from '@material-ui/icons/Star';
import SvgIcon from '@material-ui/core/SvgIcon';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  star: {
    color: (props: { clicked: boolean }): string => (props.clicked ? 'gold' : 'inherit'),
  },
});

export interface StarButtonProps extends ButtonProps {
  className?: string;
  confettiConfig?: ConfettiConfig;
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   */
  fontSize?: 'inherit' | 'default' | 'small' | 'large';
}

export default function StarIconButton({
  className,
  confettiConfig,
  fontSize = 'large',
}: StarButtonProps): React.ReactElement {
  const [clicked, setClick] = React.useState<boolean>(false);
  const handleClick = (): void => setClick(!clicked);
  const classes = useStyles({ clicked });
  return (
    <IconButton className={className} onClick={handleClick}>
      <Confetti active={clicked} config={confettiConfig} />
      <SvgIcon className={classes.star} component={StarIcon} fontSize={fontSize} />
    </IconButton>
  );
}

export function StarButton({
  className,
  children,
  confettiConfig,
  fontSize = 'large',
}: StarButtonProps): React.ReactElement {
  const [clicked, setClick] = React.useState<boolean>(false);
  const handleClick = (): void => setClick(!clicked);
  const classes = useStyles({ clicked });
  return (
    <Button className={className} onClick={handleClick}>
      <Confetti active={clicked} config={confettiConfig} />
      <SvgIcon className={classes.star} component={StarIcon} fontSize={fontSize} />
      {children}
    </Button>
  );
}
