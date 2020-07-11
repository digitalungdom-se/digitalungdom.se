import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';

export interface AgoraFilterProps {
  hypagora?: string | undefined;
  sort: string | undefined;
  path?: string | undefined;
}

export default function AgoraFilter({
  path = '/',
  hypagora = 'general',
  sort = 'new',
}: AgoraFilterProps): React.ReactElement {
  /**
   * TODO: Use <Link> instead of history.push()
   * Notice that if you use <MenuItem component={Link} value="new" /> you get a TypeScript error
   * Also notice that if you simply can't wrap MenuItem with a Link and still have it keyboard accessible
   */
  const history = useHistory();
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    history.push(`${path}/${hypagora}/${event.target.value as string}`);
  };
  return (
    <TextField id="select" label="Sort" name="sort" onChange={handleChange} select value={sort} variant="outlined">
      <MenuItem value="new">new</MenuItem>
      <MenuItem value="top">top</MenuItem>
    </TextField>
  );
}
