import './../src/i18n';

import React, { Suspense } from 'react';

import { I18nextProvider } from 'react-i18next';
import StoryRouter from 'storybook-react-router';
import ThemeLayer from './../src/components/ThemeLayer';
import { addDecorator } from '@storybook/react';
import { addParameters } from '@storybook/react';
import i18n from 'i18next';
import { themes } from '@storybook/theming';
import { useDarkMode } from 'storybook-dark-mode';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { withI18next } from 'storybook-addon-i18next';

addParameters({
  darkMode: {
    dark: themes.dark,
    light: themes.normal,
    current: 'light',
  },
});

addDecorator(StoryRouter());
addDecorator((storyFn) => <ThemeLayer forceDarkMode={useDarkMode() ? 'dark' : 'light'}>{storyFn()}</ThemeLayer>);
addDecorator((story) => <I18nextProvider i18n={i18n}>{story()}</I18nextProvider>);
addDecorator(
  withI18next({
    i18n,
    languages: {
      en: 'English',
      sv: 'Swedish',
    },
  }),
);
addDecorator((story, context) => <Suspense fallback="Loading...">{story(context)}</Suspense>);
