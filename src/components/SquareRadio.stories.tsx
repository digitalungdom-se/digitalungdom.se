/* eslint-disable sort-keys */
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

import { Color } from '@material-ui/core';
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

function calcModuloGrid(
  index: number,
  direction: 'up' | 'down' | 'left' | 'right',
  gridLength: number,
  gridWidth: number,
): number {
  switch (direction) {
    case 'up':
      if (index - gridWidth + 1 <= 0) {
        if (index <= (gridLength - 1) % gridWidth) return gridLength - 1 - ((gridLength - 1) % gridWidth) + index;
        else return gridLength - 1 - ((gridLength - 1) % gridWidth) - gridWidth + index;
      } else return index - gridWidth;
    case 'down':
      if (index + gridWidth >= gridLength) return index % gridWidth;
      else return index + gridWidth;
    case 'left':
      if (index % gridWidth === 0) {
        if (index + gridWidth - 1 >= gridLength) return gridLength - (gridWidth - (gridLength % gridWidth));
        return index + gridWidth - 1;
      } else return index - 1;
    case 'right':
      if (index % gridWidth === gridWidth - 1) return index - gridWidth + 1;
      else {
        if (index + 1 >= gridLength) return gridLength - (gridLength % gridWidth);
        return index + 1;
      }
    default:
      return index;
  }
}

const colors: Record<string, Color> = {
  red,
  pink,
  purple,
  deepPurple,
  indigo,
  blue,
  lightBlue,
  cyan,
  teal,
  green,
  lightGreen,
  lime,
  yellow,
  amber,
  orange,
  deepOrange,
  brown,
  grey,
  blueGrey,
};

const colorList = Object.keys(colors);

export const Basic = (): JSX.Element => {
  const gridWidth = 4;

  const [value, setValue] = React.useState<string>('');

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
      case 'ArrowLeft':
        event.preventDefault();
        setValue(colorList[calcModuloGrid(index, 'left', colorList.length, gridWidth)]);
        break;
      case 'ArrowRight':
        event.preventDefault();
        setValue(colorList[calcModuloGrid(index, 'right', colorList.length, gridWidth)]);
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
