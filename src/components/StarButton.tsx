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

export interface StarButtonProps {
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   */
  fontSize?: 'inherit' | 'default' | 'small' | 'large';
  confettiConfig?: ConfettiConfig;
}

export default function StarButton({ fontSize = 'large', confettiConfig }: StarButtonProps): React.ReactElement {
  const [clicked, setClick] = React.useState<boolean>(false);
  const handleClick = (): void => setClick(!clicked);
  const classes = useStyles({ clicked });
  return (
    <IconButton onClick={handleClick}>
      <Confetti active={clicked} config={confettiConfig} />
      <SvgIcon className={classes.star} component={StarIcon} fontSize={fontSize} />
    </IconButton>
  );
}
