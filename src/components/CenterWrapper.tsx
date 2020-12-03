import React, { FunctionComponent } from 'react';

import Grid from '@material-ui/core/Grid';

export interface CenterWrapperProps {
  children?: React.ReactNode;
  className?: string;
}

const CenterWrapper: FunctionComponent<CenterWrapperProps> = ({ children, className }: CenterWrapperProps) => (
  <Grid className={className} container justify="center">
    <Grid justify="center" md={10} xs={12}>
      {children}
    </Grid>
  </Grid>
);

export default CenterWrapper;
