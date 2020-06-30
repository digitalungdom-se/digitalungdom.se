import * as colors from '@material-ui/core/colors';

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

const colorList = [
  'red',
  'pink',
  'purple',
  'deepPurple',
  'indigo',
  'blue',
  'lightBlue',
  'cyan',
  'teal',
  'green',
  'lightGreen',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deepOrange',
  // 'brown',
  // 'grey',
  // 'blueGrey',
];

const calcModuloGrid = (index: number, direction: 'up' | 'down', gridLength: number, gridWidth: number): number => {
  switch (direction) {
    case 'up':
      return (index - gridWidth) % gridLength;
    case 'down':
      return (index + gridWidth) % gridLength;
  }
};

export const Basic = (): JSX.Element => {
  const gridWidth = 4;

  const [value, setValue] = React.useState(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setValue((event.target as HTMLInputElement).value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    const index = colorList.indexOf(value);
    switch (event.key) {
      case 'ArrowUp':
        event.preventDefault();
        setValue(colorList[calcModuloGrid(index, 'up', colorList.length, gridWidth)]);
        break;
      case 'ArrowDown':
        event.preventDefault();
        setValue(colorList[calcModuloGrid(index, 'down', colorList.length, gridWidth)]);
        break;
    }
  };

  return (
    <Paper
      // 42 is the needed width of a SquareRadio
      style={{ width: 42 * gridWidth }}
    >
      <RadioGroup
        aria-label="gender"
        name="color"
        onChange={handleChange}
        onKeyDownCapture={handleKeyDown}
        row
        value={value}
      >
        {colorList.map((color) => (
          // See this thread for ref's https://twitter.com/ryanflorence/status/1099876940985454593
          <SquareRadio
            checked={value === color}
            color={colors[color]}
            isFocused={value === color}
            key={color}
            value={color}
          />
        ))}
      </RadioGroup>
    </Paper>
  );
};
