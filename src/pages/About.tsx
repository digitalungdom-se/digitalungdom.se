import Button from '@material-ui/core/Button';
import CenterWrapper from 'components/CenterWrapper';
import Grid from '@material-ui/core/Grid';
import MailIcon from '@material-ui/icons/Mail';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const About = () => (
  <div>
    <Grid container>
      <CenterWrapper>
        <Grid alignItems="center" container justify="center" spacing={6} style={{ paddingBottom: 20, paddingTop: 50 }}>
          <Grid item md={5} sm={6} xs={12}>
            <div>
              <img alt="" src={require('resources/images/about1.png')} style={{ width: '100%' }} />
            </div>
          </Grid>

          <Grid item md={5} sm={6} xs={10}>
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 'bold' }}>Vad är Digital Ungdom?</h3>
              <p style={{ fontSize: 15, textAlign: 'justify' }}>
                <Emoji emoji="💙" /> Digital Ungdom är ett nationellt allmännyttigt ideellt förbund i Sverige.
              </p>
              <p style={{ fontSize: 15, textAlign: 'justify' }}>
                <Emoji emoji="👩‍💻" /> Vårt syfte är att i Sverige utveckla och underhålla ungdomars intresse för och
                kunskaper om digital teknik och datavetenskap.
              </p>
              <p style={{ fontSize: 15, textAlign: 'justify' }}>
                <Emoji emoji="🏁" /> Vår vision är att skapa ett brett kontaktnät av ungdomar och därigenom aktivt bidra
                till att Sverige blir världsledande inom digital teknik och datavetenskap.
              </p>
            </div>
          </Grid>
        </Grid>
      </CenterWrapper>
    </Grid>

    <CenterWrapper>
      <Grid container justify="center" style={{ paddingTop: 20, width: '100%' }}>
        <h3 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30 }}>
          Förbundsstyrelsen <Emoji emoji="😍" />
        </h3>
      </Grid>
      <Grid container justify="space-around">
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
          bio="Tjena! Jag är 20 år gammal och studerar på Handelshögskolan i Stockholm! Jag har i nuläget pausat mina studier i Datateknik på KTH. Jag jobbar med front-end och är kassör."
          color="#e0555c"
          name="Douglas"
          role="Kassör"
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
    </CenterWrapper>
  </div>
);

const Emoji = (props: any) => {
  return (
    <span aria-label="emoji" role="img">
      {props.emoji}
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
  <Grid item style={{ width: 260, margin: '0 8px' }}>
    <div style={{ textAlign: 'center', width: '100%' }}>
      <div
        style={{
          width: 260,
          height: 260,
          margin: '0 auto',
          borderRadius: 10,
          backgroundColor: color,
          overflow: 'hidden',
        }}
      >
        <img alt={name} src={require('resources/images/portraits/' + name.toLowerCase() + '.png')} />
      </div>
      <Typography style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 2, marginTop: 10 }}>
        {name + ' ' + surname}
      </Typography>
      <Typography style={{ fontSize: 16, fontStyle: 'italic', marginBottom: 16 }}>{role}</Typography>
      <Typography style={{ fontSize: 14, marginBottom: 6, textAlign: 'left' }}>{bio}</Typography>

      <Typography style={{ fontSize: 12, textAlign: 'justify', marginBottom: 24 }}>
        <Button
          href={'mailto:' + name.toLowerCase() + '@digitalungdom.se'}
          startIcon={<MailIcon style={{ marginRight: 8 }} />}
        >
          {name.toLowerCase()}@digitalungdom.se
        </Button>
      </Typography>
    </div>
  </Grid>
);

export default About;
