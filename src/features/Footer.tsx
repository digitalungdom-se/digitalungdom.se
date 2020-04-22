import React from 'react';
import Typography from '@material-ui/core/Typography';

function Copyright() {
  return (
    <Typography align="center" color="textSecondary" variant="body2">
      {'Copyright © '}
      Digital Ungdom 2018-{new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  return (
    <footer style={{ bottom: 0, position: 'absolute' }}>
      <Copyright />
    </footer>
  );
}
