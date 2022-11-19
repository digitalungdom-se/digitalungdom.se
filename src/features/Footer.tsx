import Button, { ButtonProps } from '@material-ui/core/Button';
import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import { Icon } from '@iconify/react';
import React from 'react';
import { StyleRules } from '@material-ui/styles/withStyles';
import Typography from '@material-ui/core/Typography';

interface LinkProps {
  href: string;
  icon: React.ReactElement;
  linkName: string;
}

const styles = (theme: Theme): StyleRules =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
      borderTopColor: theme.palette.divider,
      color: theme.palette.primary.contrastText,
      marginTop: theme.spacing(2),
      padding: theme.spacing(3, 2),
    },
  });

type FooterProps = WithStyles<typeof styles>;

const LinkWithIcon = (props: ButtonProps) => (
  <Typography style={{ textAlign: 'justify' }}>
    <Button
      component="a"
      href={props.href}
      rel="noopener noreferrer"
      startIcon={props.startIcon}
      style={{ color: 'inherit' }}
      target="_blank"
    >
      {props.children}
    </Button>
  </Typography>
);

const Footer = ({ classes }: FooterProps): React.ReactElement => (
  <Grid className={classes.root} container justify="center">
    <Grid container md={9} sm={12} spacing={4} xs={12}>
      <Grid item sm={4} xs={12}>
        <h3>Om oss</h3>
        <p style={{ marginBottom: 6 }}>
          Digital Ungdom är ett ideellt ungdomsförbund med syfte att i Sverige utveckla och underhålla ungdomars
          intresse för och kunskaper om digital teknik och datavetenskap samt hur detta kan användas.
        </p>
      </Grid>
      <Grid item xs={6}>
        <h3>Kontakt</h3>
        <Grid container>
          <Grid item sm={6} xs={12}>
            <LinkWithIcon
              href="https://discord.gg/9bJehW8beu"
              startIcon={<Icon icon="simple-icons:discord" style={{ marginRight: 8 }} />}
            >
              Discord
            </LinkWithIcon>
            <LinkWithIcon
              href="https://github.com/digitalungdom-se"
              startIcon={<Icon icon="simple-icons:github" style={{ marginRight: 8 }} />}
            >
              GitHub
            </LinkWithIcon>
            <LinkWithIcon
              href="https://twitter.com/digital_ungdom"
              startIcon={<Icon icon="simple-icons:twitter" style={{ marginRight: 8 }} />}
            >
              Twitter
            </LinkWithIcon>
            <LinkWithIcon
              href="mailto:styrelse@digitalungdom.se"
              startIcon={<Icon icon="ic:round-mail-outline" style={{ marginRight: 8 }} />}
            >
              styrelse@digitalungdom.se
            </LinkWithIcon>
          </Grid>
          <Grid item xs={6}>
            <LinkWithIcon
              href="https://instagram.com/digital_ungdom"
              startIcon={<Icon icon="simple-icons:instagram" style={{ marginRight: 8 }} />}
            >
              Instagram
            </LinkWithIcon>
            <LinkWithIcon
              href="https://facebook.com/DigitalUngdomSE"
              startIcon={<Icon icon="simple-icons:facebook" style={{ marginRight: 8 }} />}
            >
              Facebook
            </LinkWithIcon>
            <LinkWithIcon
              href="https://www.linkedin.com/company/digitalungdom/"
              startIcon={<Icon icon="simple-icons:linkedin" style={{ marginRight: 8 }} />}
            >
              LinkedIn
            </LinkWithIcon>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <a href="/stadgar.pdf" style={{ marginRight: '1rem' }}>
          Stadgar
        </a>
        <span>
          {'Copyright © '}
          Digital Ungdom 2018-{new Date().getFullYear()}
          {'.'}
        </span>
      </Grid>
    </Grid>
  </Grid>
);

export default withStyles(styles)(Footer);
