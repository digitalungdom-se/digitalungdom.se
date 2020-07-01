import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import Grid from "@material-ui/core/Grid"
import MailIcon from '@material-ui/icons/Mail';
import React from 'react';

const Copyright = () => {
  return (
    <p style={{opacity: 0.5, color: "white", fontSize: 12}}>
      {'Copyright © '}
      Digital Ungdom 2018-{new Date().getFullYear()}
      {'.'}
    </p>
  );
}

const Link = ({href, icon, linkName}) => (
  <p style={{marginBottom: 6}}>
    <a
    target="_blank"
    rel="noopener noreferrer"
    href={href}
    className="topFooterLink"
    >
      {icon}
      {linkName}
    </a>
  </p>
)

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(4, 2),
      backgroundColor: theme.palette.primary.dark,
      borderTop: "solid 1px",
      borderTopColor: theme.palette.divider, 
      color: "white"
    },
  });

const Footer = ({ classes }: WithStyles<typeof styles>) => (
  <div className={classes.root}>
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <h3 style = {{marginBottom: 18}}>
          Om oss
        </h3>
        <p style={{marginBottom: 6}}>
          Digital Ungdom är ett ideellt ungdomsförbund med syfte att i Sverige utveckla och underhålla ungdomars intresse för och kunskaper om digital teknik och datavetenskap samt hur detta kan användas.
        </p>
      </Grid>
      <Grid item xs={4}>
        <h3 style = {{marginBottom: 18}}>
          Kontakt
        </h3>
        <Link href="" icon={<MailIcon/>}/>
      </Grid>
    </Grid>
    <Copyright />

  </div>
);

export default withStyles(styles)(Footer);
