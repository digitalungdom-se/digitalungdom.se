import React, { useEffect, useState } from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { Hidden } from '@material-ui/core';
import DynamicTitle from '../components/DynamicTitle';

const CenterWrapper: React.FC = ({ children }) => (
  <Grid container justify="center">
    <Grid container item justify="center" xs={10}>
      {children}
    </Grid>
  </Grid>
);

export default function Startpage() {
  // With hook determine width of window
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const titleSize = windowWidth > 400 ? 40 : 30;
  const subtitleSize = windowWidth > 400 ? 30 : 20;
  const descSize = windowWidth > 400 ? 18 : 12;
  // const buttonSize = windowWidth > 400 ? 16 : 10;

  return (
    <Grid container item justify="space-between">
      <Grid container style={{ background: '#05379c', paddingTop: 60, paddingBottom: 50, width: '100%' }}>
        <CenterWrapper>
          <Grid alignItems="center" container justify="space-between">
            <Hidden smDown>
              <Grid item lg={6} md={5}>
                <div>
                  <img alt="frontPage" src={require('resources/images/FrontPage.png')} style={{ width: '100%' }} />
                </div>
              </Grid>
            </Hidden>

            <Grid item lg={5} md={7} xs={12}>
              <div>
                <DynamicTitle titleSize={titleSize} />

                <Typography
                  gutterBottom
                  style={{ fontSize: subtitleSize, color: 'rgba(255,255,255,0.85)', fontWeight: 'bold' }}
                  variant="h3"
                >
                  Här kan du lära dig, <br /> dela med dig av och hjälpa
                  <br /> andra med programmering.{' '}
                </Typography>

                <Typography style={{ fontSize: descSize, marginBottom: 40, color: 'rgba(255,255,255,0.85)' }}>
                  Vi är ett svenskt ideellt ungdomsförbund för programmerings- och teknikintresserade ungdomar. Bli
                  medlem och ta del av vår community!{' '}
                  <span aria-label="star" role="img">
                    🌟
                  </span>
                </Typography>
                <Grid container justify="space-evenly">
                  <Grid item xs={4}>
                    <Link to="/bli-medlem">
                      <Button
                        color="primary"
                        fullWidth
                        size="large"
                        style={{ width: '90%' }}
                        // style={{ fontSize: buttonSize }}
                        variant="contained"
                      >
                        Bli medlem!
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={4}>
                    <Link to="/logga-in">
                      <Button
                        size="large"
                        style={{
                          // fontSize: buttonSize,
                          // color: 'rgba(255,255,255,0.9)',
                          width: '90%',
                          // border: '2px solid #cccccc',
                        }}
                        variant="contained"
                      >
                        Logga in
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item xs={4}>
                    <Link to="/about">
                      <Button
                        size="large"
                        style={{
                          // fontSize: buttonSize,
                          // color: 'rgba(255,255,255,0.9)',
                          width: '90%',
                          // border: '2px solid #cccccc',
                        }}
                        variant="contained"
                      >
                        Om oss
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </CenterWrapper>
      </Grid>

      <div
        style={{
          background: '#05379c',
          borderBottomLeftRadius: '50%',
          borderBottomRightRadius: '50%',
          height: 20,
          width: '100%',
          marginTop: -2,
        }}
      />

      <Grid container justify="center" style={{ flex: 1 }}>
        <Grid container justify="center" style={{ paddingTop: 140, paddingBottom: 80 }}>
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
            <Typography
              gutterBottom
              variant="h4"
              // style={{ fontSize: 28, color: '#434343', fontWeight: 'bold' }}
            >
              Arbete pågår!
            </Typography>

            <Typography
              gutterBottom
              // style={{ fontSize: 16, marginBottom: 10, color: '#434343' }}
            >
              Detta är den första versionen av digitalungdom.se så det saknas forfarande många planerade funktioner. Vi
              arbetar dock hårt med hemsidan och fler funktioner kommer snart!
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              // style={{ fontSize: 16, marginBottom: 10, color: '#434343' }}
            >
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
}
