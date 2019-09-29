import React from 'react';

import 'resources/variables.css'

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import Button from "prod_components/button";
import ResetPassword from 'prod_components/ResetPassword'

import './Agora/index.js'
import './Auth/index.js'
import './miscellaneous.js'
import './Menu.js'

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

storiesOf('Reset', module)
	.add('Reset password', () => 
		<ResetPassword />
	)
	.add('Simon Sondén', () => 
		<div
			style={{width: 400}}
		>
			<ResetPassword
				color="blue"
			/>
		</div>
	)
