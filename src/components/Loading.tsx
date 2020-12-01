import CircularProgress from '@material-ui/core/CircularProgress';
import React from 'react';

const Loading = ({ minHeight = 400 }: { minHeight?: number }): JSX.Element => (
  <div
    style={{
      alignItems: 'center',
      display: 'flex',
      height: '100%',
      justifyContent: 'center',
      minHeight,
    }}
  >
    <div>
      <CircularProgress />
    </div>
  </div>
);

export default Loading;
