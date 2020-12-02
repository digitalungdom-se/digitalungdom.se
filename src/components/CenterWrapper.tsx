import Grid from '@material-ui/core/Grid';
import React from 'react';

const CenterWrapper: React.FC = ({ children }) => (
  <Grid container justify="center">
    <Grid justify="center" xs={10}>
      {children}
    </Grid>
  </Grid>
);

export default CenterWrapper;
