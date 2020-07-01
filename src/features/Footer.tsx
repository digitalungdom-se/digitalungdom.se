import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import MailIcon from '@material-ui/icons/Mail';
import React from 'react';
import { StyleRules } from '@material-ui/styles/withStyles';

const Copyright = (): React.ReactElement => {
  return (
    <p
      style={{
        color: 'white',
        fontSize: 12,
        opacity: 0.5,
      }}
    >
      {'Copyright © '}
      Digital Ungdom 2018-{new Date().getFullYear()}
      {'.'}
    </p>
  );
};

interface LinkProps {
  href: string;
  icon: React.ReactElement;
  linkName: string;
}

const Link = ({ href, icon, linkName }: LinkProps): React.ReactElement => (
  <p style={{ marginBottom: 6 }}>
    <a className="topFooterLink" href={href} rel="noopener noreferrer" target="_blank">
      {icon}
      {linkName}
    </a>
  </p>
);

const styles = (theme: Theme): StyleRules =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
      borderTop: 'solid 1px',
      borderTopColor: theme.palette.divider,
      color: 'white',
      padding: theme.spacing(4, 2),
    },
  });

const Footer = ({ classes }: WithStyles<typeof styles>): React.ReactElement => (
  <div className={classes.root}>
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <h3 style={{ marginBottom: 18 }}>Om oss</h3>
        <p style={{ marginBottom: 6 }}>
          Digital Ungdom är ett ideellt ungdomsförbund med syfte att i Sverige utveckla och underhålla ungdomars
          intresse för och kunskaper om digital teknik och datavetenskap samt hur detta kan användas.
        </p>
      </Grid>
      <Grid item xs={4}>
        <h3 style={{ marginBottom: 18 }}>Kontakt</h3>
        <Link href="" icon={<MailIcon />} linkName="styrelse@digitalungdom.se" />
      </Grid>
    </Grid>
    <Copyright />
  </div>
);

export default withStyles(styles)(Footer);
