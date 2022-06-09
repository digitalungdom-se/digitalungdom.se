import Button from '@material-ui/core/Button';
import DynamicTitle from 'components/DynamicTitle';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const Startpage = () => (
  <Grid container item justify="space-between">
    <Grid
      container
      justify="center"
      style={{
        background: '#05379c',
        paddingBottom: 50,
        paddingTop: 60,
        width: '100%',
      }}
    >
      <Grid alignItems="center" container justify="space-between" xs={10}>
        <Hidden smDown>
          <Grid item lg={6} md={5}>
            <div>
              <img alt="frontPage" src={require('resources/images/FrontPage.png')} style={{ width: '100%' }} />
            </div>
          </Grid>
        </Hidden>
        <Grid item lg={5} md={7} xs={12}>
          <div>
            <DynamicTitle />
            <Typography gutterBottom style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 'bold' }} variant="h5">
              Här kan du lära dig, <br /> dela med dig av och hjälpa
              <br /> andra med programmering.{' '}
            </Typography>
            <Typography
              component="p"
              style={{
                color: 'rgba(255,255,255,0.85)',
                fontWeight: 'normal',
                marginBottom: 40,
              }}
              variant="h6"
            >
              Vi är ett svenskt ideellt ungdomsförbund för programmerings- och teknikintresserade ungdomar. Bli medlem
              och ta del av vår community!{' '}
              <span aria-label="star" role="img">
                🌟
              </span>
            </Typography>
            <Grid container justify="space-evenly">
              <Grid item xs={4}>
                <Button
                  color="primary"
                  component={Link}
                  fullWidth
                  size="large"
                  style={{ width: '90%' }}
                  to="/bli-medlem"
                  variant="contained"
                >
                  Bli medlem!
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  component="a"
                  href="https://discord.gg/9bJehW8beu"
                  size="large"
                  style={{
                    width: '90%',
                  }}
                  variant="contained"
                >
                  Joina Discord!
                </Button>
              </Grid>
              <Grid item xs={4}>
                <Button
                  component={Link}
                  size="large"
                  style={{
                    width: '90%',
                  }}
                  to="/om-oss"
                  variant="contained"
                >
                  Om oss
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </Grid>
    <div
      style={{
        background: '#05379c',
        borderBottomLeftRadius: '50%',
        borderBottomRightRadius: '50%',
        height: 24,
        width: '100%',
      }}
    />
    <Grid container justify="center" style={{ flex: 1 }}>
      <Grid
        container
        justify="center"
        style={{
          paddingBottom: 80,
          paddingTop: 140,
        }}
      >
        <Grid container item justify="center" md={3} xs={7}>
          <div>
            <img
              alt="underConstruction"
              src={require('resources/images/underConstruction.png')}
              style={{ width: '100%' }}
            />
          </div>
        </Grid>
        <Grid container item justify="center" lg={4} md={4} sm={8} xs={9}>
          <Typography gutterBottom variant="h4">
            Arbete pågår!
          </Typography>
          <Typography gutterBottom>
            Detta är den andra versionen av digitalungdom.se så det saknas forfarande många planerade funktioner. Vi
            arbetar dock hårt med hemsidan och fler funktioner kommer snart!
          </Typography>
          <Typography gutterBottom variant="body1">
            För tillfället kan ni njuta av Agora (vårt forum) och faktumet att ni kan ha i princip vilket användarnamn
            som helst!{' '}
            <span aria-label="cool" role="img">
              😎
            </span>
          </Typography>
          <Grid container style={{ marginTop: 30 }}>
            <Link to="/bli-medlem">
              <Button color="primary" size="large" variant="contained">
                Skapa ett konto
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
export default Startpage;
