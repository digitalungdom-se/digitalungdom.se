import Confetti from 'react-dom-confetti';
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

export default function StarButton() {
  const [clicked, setClick] = React.useState<boolean>(false);
  const handleClick = (): void => setClick(!clicked);
  const classes = useStyles({ clicked });
  return (
    <IconButton onClick={handleClick}>
      <Confetti active={clicked} />
      <SvgIcon className={classes.star} component={StarIcon} fontSize="large" />
    </IconButton>
  );
}
