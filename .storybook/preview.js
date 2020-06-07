import React from 'react'
import StoryRouter from 'storybook-react-router';
import ThemeLayer from './../src/components/ThemeLayer';
import { addDecorator } from '@storybook/react';
import { addParameters } from '@storybook/react';
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';
import useMediaQuery from '@material-ui/core/useMediaQuery';

addParameters({
  darkMode: {
    dark: themes.dark,
    light: themes.normal,
    current: 'light'
  }
});

addDecorator(StoryRouter());
addDecorator(storyFn => <ThemeLayer forceDarkMode={useDarkMode() ? 'dark' : 'light'}>{storyFn()}</ThemeLayer>);