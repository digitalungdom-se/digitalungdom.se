import React from 'react';

import 'resources/variables.css'

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Welcome } from '@storybook/react/demo';
import Button from "prod_components/button";
import ResetPassword from 'prod_components/Auth/ResetPassword'
import Cropper from '@components/Cropper'

// import './Agora/index.js'
// import './Auth/index.js'
// import './User'
// import './miscellaneous.js'
// import './Menu.js'
// import './Filter.js'
const image = require('containers/image.json')

storiesOf('Cropper', module).add("Cropper", () =>
	(
		<div>
			<h3 style={{color: "rgba(0,0,0,0.7)"}}>
			  Klicka och dra för att redigera din bild <span role="img" aria-label="profile">👤</span>
			</h3>
			<div
				style={{
					width: 300,
					height: 300,
					background: "black",
					position: "relative"
				}}
			>
				<Cropper
					image={image}
					style={{
						containerStyle: {
							// width: 300,
							// height: 300
						}
					}}
				/>
			</div>
		</div>
	)
)

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

// storiesOf('Reset', module)
// 	.add('Reset password', () =>
// 		<ResetPassword />
// 	)
// 	.add('Simon Sondén', () =>
// 		<div
// 			style={{width: 400}}
// 		>
// 			<ResetPassword
// 				color="blue"
// 			/>
// 		</div>
// 	)
