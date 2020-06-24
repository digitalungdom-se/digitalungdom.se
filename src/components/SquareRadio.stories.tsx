import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  grey,
  indigo,
  lightBlue,
  lightGreen,
  lime,
  orange,
  pink,
  purple,
  red,
  teal,
  yellow,
} from '@material-ui/core/colors';

import Paper from '@material-ui/core/Paper';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import SquareRadio from './SquareRadio';
import StoryMetadata from './StoryMetadata';

const story: StoryMetadata = {
  component: SquareRadio,
  decorators: [
    (storyFn): JSX.Element => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 100,
        }}
      >
        <div style={{ display: 'inline-block' }}>{storyFn()}</div>
      </div>
    ),
  ],
  title: 'SquareRadio',
};

export default story;

export const Basic = (): JSX.Element => {
  const [value, setValue] = React.useState('red');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };
  return (
    <Paper
      // 42 is the needed width of a SquareRadio
      style={{ width: 42 * 4 }}
    >
      <RadioGroup aria-label="gender" name="color" onChange={handleChange} row value={value}>
        <SquareRadio checked={value === 'red'} color={red} value="red" />
        <SquareRadio checked={value === 'pink'} color={pink} value="pink" />
        <SquareRadio checked={value === 'purple'} color={purple} value="purple" />
        <SquareRadio checked={value === 'deepPurple'} color={deepPurple} value="deepPurple" />
        <SquareRadio checked={value === 'indigo'} color={indigo} value="indigo" />
        <SquareRadio checked={value === 'blue'} color={blue} value="blue" />
        <SquareRadio checked={value === 'lightBlue'} color={lightBlue} value="lightBlue" />
        <SquareRadio checked={value === 'cyan'} color={cyan} value="cyan" />
        <SquareRadio checked={value === 'teal'} color={teal} value="teal" />
        <SquareRadio checked={value === 'green'} color={green} value="green" />
        <SquareRadio checked={value === 'lightGreen'} color={lightGreen} value="lightGreen" />
        <SquareRadio checked={value === 'lime'} color={lime} value="lime" />
        <SquareRadio checked={value === 'yellow'} color={yellow} value="yellow" />
        <SquareRadio checked={value === 'amber'} color={amber} value="amber" />
        <SquareRadio checked={value === 'orange'} color={orange} value="orange" />
        <SquareRadio checked={value === 'deepOrange'} color={deepOrange} value="deepOrange" />
        <SquareRadio checked={value === 'brown'} color={brown} value="brown" />
        <SquareRadio checked={value === 'grey'} color={grey} value="grey" />
        <SquareRadio checked={value === 'blueGrey'} color={blueGrey} value="blueGrey" />
      </RadioGroup>
    </Paper>
  );
};
