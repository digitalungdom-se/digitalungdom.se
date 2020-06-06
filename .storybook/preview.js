import React from 'react'
import StoryRouter from 'storybook-react-router';
import ThemeLayer from './../src/components/ThemeLayer';
import { addDecorator } from '@storybook/react';

addDecorator(StoryRouter());
addDecorator(storyFn => <ThemeLayer>{storyFn()}</ThemeLayer>);