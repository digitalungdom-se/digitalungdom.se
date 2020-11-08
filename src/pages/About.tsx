import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MailIcon from '@material-ui/icons/Mail';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const CenterWrapper: React.FC = ({ children }) => (
  <Grid container justify="center">
    <Grid justify="center" xs={10}>
      {children}
    </Grid>
  </Grid>
);

interface ProfileProps {
  name: string;
  surname: string;
  bio: string;
  role: string;
  color: string;
}

const Profile = ({ name, surname, bio, role, color }: ProfileProps) => (
  <Grid item md={3} xs={12}>
    <div style={{ margin: 'auto', textAlign: 'center', width: '100%', maxWidth: 400, padding: '0 24px' }}>
      <div style={{ margin: '0 auto', borderRadius: 10, backgroundColor: color }}>
        <img
          alt={name}
          src={require('resources/images/portraits/' + name.toLowerCase() + '.png')}
          style={{ width: '100%', borderRadius: 10 }}
        />
      </div>
      <Typography style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 2, marginTop: 10 }}>
        {name + ' ' + surname}
      </Typography>
      <Typography style={{ fontSize: 16, fontStyle: 'italic', marginBottom: 16 }}>{role}</Typography>
      <Typography style={{ fontSize: 14, marginBottom: 6, textAlign: 'left' }}>{bio}</Typography>

      <Typography style={{ fontSize: 12, textAlign: 'justify' }}>
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

const About = () => (
  <div>
    <Grid container>
      <CenterWrapper>
        <Grid container justify="center" style={{ paddingTop: 40, width: '100%' }}>
          <h3 style={{ fontSize: 44, fontWeight: 'bold', marginBottom: 30 }}>Om oss</h3>
        </Grid>
        <Grid alignItems="center" container justify="space-between" style={{ paddingTop: 20, paddingBottom: 60 }}>
          <Grid item md={7} sm={12}>
            <div>
              <img alt="" src={require('resources/images/about1.png')} style={{ width: '100%' }} />
            </div>
          </Grid>

          <Grid item md={4} xs={10}>
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 'bold' }}>
                Vad är Digital Ungdom?{' '}
                <span aria-label="hmm" role="img">
                  🤔
                </span>
              </h3>
              <p style={{ fontSize: 15, marginBottom: 40, textAlign: 'justify' }}>
                Digital Ungdom är ett nationellt allmännyttigt ideellt förbund i Sverige. Digital Ungdoms syfte är att i
                Sverige utveckla och underhålla ungdomars intresse för och kunskaper om digital teknik och
                datavetenskap, samt hur detta kan användas. Digital Ungdoms vision är att verka genom ett brett
                kontaktnät av ungdomar och därigenom aktivt bidra till att Sverige blir världsledande inom digital
                teknik och datavetenskap.
              </p>
            </div>
          </Grid>
        </Grid>
      </CenterWrapper>
    </Grid>

    <CenterWrapper>
      <Grid container justify="center" style={{ paddingTop: 80, width: '100%' }}>
        <h3 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 30 }}>
          Förbundsstyrelsen{' '}
          <span aria-label="heart-eyes" role="img">
            😍
          </span>
        </h3>
      </Grid>
      <Grid container>
        <Profile
          bio="Hej! Jag heter Simon Sondén och jobbar bland annat med arkitekturen och algoritmerna bakom våra projekt. För övrigt älskar jag att bygga robotar."
          color="#bf3728"
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
          bio="Hej! Mitt namn är Charles och jag ansvarar mest för design här på digitalungdom.se! Det är även jag som har ritat bilderna som ni ser på hemsidan."
          color="lightGreen"
          name="Charles"
          role="Vice ordförande"
          surname="Maddock"
        />
        <Profile
          bio="Tjena! Jag är 20 år gammal och studerar på Handelshögskolan i Stockholm! Jag har i nuläget pausat mina studier i Datateknik på KTH. Jag jobbar med front-end och är kassör."
          color="#1e6ee8"
          name="Douglas"
          role="Kassör"
          surname="Bengtsson"
        />
        <Profile bio="" color="#1e6ee8" name="Karl" role="Styrelseledamot" surname="Sellergren" />
      </Grid>
    </CenterWrapper>
  </div>
);

export default About;
