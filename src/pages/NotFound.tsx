import Grid from '@material-ui/core/Grid';
import React from 'react';

export default function NotFound() {
  return (
    <Grid alignItems="center" container justify="center" style={{ height: '100%', flex: 1 }}>
      <Grid item md={3} sm={4} xs={8}>
        <img alt="Page not found" src={require('resources/images/Whoops.png')} style={{ width: '100%' }} />
      </Grid>
      <Grid item md={3} sm={4} xs={8}>
        <h1>Oops! 404!</h1>
        <p> Sidan du letar efter verkar tyvärr inte finnas, försök igen!</p>
        <p>
          {' '}
          404-errorn är en felkod som i HTTP-protokollet betecknar att webbsidan som efterfrågats inte finns eller inte
          kan hittas.
        </p>
      </Grid>
    </Grid>
  );
}
