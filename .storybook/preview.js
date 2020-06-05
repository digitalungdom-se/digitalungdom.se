import React from 'react'
import ThemeLayer from './../src/components/ThemeLayer';
import { addDecorator } from '@storybook/react';

addDecorator(storyFn => <ThemeLayer>{storyFn()}</ThemeLayer>);