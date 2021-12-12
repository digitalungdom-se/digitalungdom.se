import { Theme, WithStyles, createStyles, withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import CenterWrapper from 'components/CenterWrapper';
import Grid from '@material-ui/core/Grid';
import MailIcon from '@material-ui/icons/Mail';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const styles = ({ spacing }: Theme) =>
  createStyles({
    aboutOrganisation: {
      '& p': {
        margin: spacing(2, 0),
      },
      padding: spacing(6) / 2,
      paddingBottom: spacing(4),
      paddingTop: spacing(6),
    },
    profiles: {
      '& h5': {
        fontWeight: 'bold',
        marginBottom: spacing(3),
        textAlign: 'center',
      },
      marginTop: spacing(3),
      padding: spacing(2) / 2,
    },
  });

export type AboutProps = WithStyles<typeof styles>;

const About = withStyles(styles)(({ classes }: AboutProps) => (
  <div>
    <Grid container>
      <CenterWrapper className={classes.aboutOrganisation}>
        <Grid alignItems="center" container justify="center" spacing={6}>
          <Grid item md={5} sm={6} xs={12}>
            <img alt="" src={require('resources/images/about1.png')} style={{ width: '100%' }} />
          </Grid>
          <Grid item md={5} sm={6} xs={10}>
            <Typography style={{ fontWeight: 'bold' }} variant="h5">
              Vad är Digital Ungdom?
            </Typography>
            <Typography paragraph>
              <Emoji emoji="💙" /> Digital Ungdom är ett nationellt allmännyttigt ideellt förbund i Sverige.
            </Typography>
            <Typography paragraph>
              <Emoji emoji="👩‍💻" /> Vårt syfte är att i Sverige utveckla och underhålla ungdomars intresse för och
              kunskaper om digital teknik och datavetenskap.
            </Typography>
            <Typography paragraph>
              <Emoji emoji="🏁" /> Vår vision är att skapa ett brett kontaktnät av ungdomar och därigenom aktivt bidra
              till att Sverige blir världsledande inom digital teknik och datavetenskap.
            </Typography>
          </Grid>
        </Grid>
      </CenterWrapper>
    </Grid>
    <CenterWrapper className={classes.profiles}>
      <Typography variant="h5">
        Förbundsstyrelsen <Emoji emoji="😍" />
      </Typography>
      <Grid container justify="space-around" spacing={2}>
        <Profile
          bio="Hej! Jag heter Simon Sondén och jobbar bland annat med arkitekturen och algoritmerna bakom våra projekt. För övrigt älskar jag att bygga robotar."
          color="#bacf9b"
          name="Simon"
          role="Ordförande"
          surname="Sondén"
        />
        <Profile
          bio="Hej! Jag heter Kelvin Szolnoky och jobbar framförallt med Digital Ungdoms back-end men självfallet även med andra styrelseuppgifter."
          color="#13c2c2"
          name="Kelvin"
          role="Vice ordförande"
          surname="Szolnoky"
        />
        <Profile
          bio="Yo! Mitt namn är Charles och jag håller huvudsakligen på med front-end och design. På min fritid gillar jag att programmera spel och måla."
          color="lightGreen"
          name="Charles"
          role="Vice ordförande"
          surname="Maddock"
        />
        <Profile
          bio="Tjena! Jag är 21 år gammal och studerar på Handelshögskolan i Stockholm och Datateknik på KTH! Jag jobbar med front-end och."
          color="#e0555c"
          name="Douglas"
          role="Styrelseledamot"
          surname="Bengtsson"
        />
        <Profile
          bio="Hej! Mitt namn är Karl och jag håller på med både front- och backend i Digital Ungdom. På min fritid gillar jag att segla!"
          color="#6e73d4"
          name="Karl"
          role="Styrelseledamot"
          surname="Sellergren"
        />
      </Grid>
      <Profile
          bio="Hej! Jag arbetar som systemtekniker i flottan. Mitt digitaltekniska intresse är främst inom cybersäkerhet."
          color="#19297C"
          name="Justin"
          role="Styrelseledamot"
          surname="Gallant"
        />
    </CenterWrapper>
  </div>
));

const Emoji = ({ emoji }: { emoji: string }) => {
  return (
    <span aria-label="emoji" role="img">
      {emoji}
    </span>
  );
};

interface ProfileProps {
  name: string;
  surname: string;
  bio: string;
  role: string;
  color: string;
}

const Profile = ({ name, surname, bio, role, color }: ProfileProps) => (
  <Grid item lg={2} md={4} sm={5} xs={8}>
    <div
      style={{
        backgroundColor: color,
        borderRadius: 10,
        overflow: 'hidden',
        width: '100%',
      }}
    >
      <img
        alt={name}
        src={require('resources/images/portraits/' + name.toLowerCase() + '.png')}
        style={{ marginBottom: -8, width: '100%' }}
      />
    </div>
    <Typography style={{ fontWeight: 'bold', marginBottom: 2, marginTop: 10 }} variant="subtitle1">
      {name + ' ' + surname}
    </Typography>
    <Typography style={{ fontStyle: 'italic', marginBottom: 16 }} variant="subtitle1">
      {role}
    </Typography>
    <Typography style={{ marginBottom: 6, textAlign: 'left' }} variant="body2">
      {bio}
    </Typography>
    <Typography style={{ marginBottom: 24, textAlign: 'justify' }} variant="body2">
      <Button href={'mailto:' + name.toLowerCase() + '@digitalungdom.se'} startIcon={<MailIcon />}>
        {name.toLowerCase()}@digitalungdom.se
      </Button>
    </Typography>
  </Grid>
);

export default About;
