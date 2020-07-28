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
  icon?: boolean;
  className?: string;
  confettiConfig?: ConfettiConfig;
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   */
  fontSize?: 'inherit' | 'default' | 'small' | 'large';
  isStarred?: boolean;
  handleStarring?: () => boolean;
}

interface UsedButtonProps extends Pick<ButtonProps, 'className' | 'onClick' | 'children'> {
  icon: boolean;
}

const UsedButton = ({ icon, ...props }: UsedButtonProps) => {
  if (icon) return <IconButton {...props} />;
  else return <Button {...props} />;
};

export default function StarButton({
  className,
  children,
  confettiConfig,
  fontSize = 'large',
  isStarred = false,
  icon = false,
  handleStarring = () => true,
}: StarButtonProps): React.ReactElement {
  const [clicked, setClick] = React.useState<boolean>(isStarred);
  const handleClick = (): void => {
    if (handleStarring() === false) return;
    setClick(!clicked);
  };
  const classes = useStyles({ clicked });
  return (
    <UsedButton className={className} icon={icon} onClick={handleClick}>
      <Confetti active={clicked} config={confettiConfig} />
      <SvgIcon className={classes.star} component={StarIcon} fontSize={fontSize} />
      {children}
    </UsedButton>
  );
}
