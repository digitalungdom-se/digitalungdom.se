import React, { useState } from 'react'

import { storiesOf } from '@storybook/react';
import Empty from '@components/Empty'
import ProfileDropdown from '@components/ProfileDropdown'
import Modal from '@components/Modal'

import { withKnobs, text, boolean, number } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';

storiesOf('Miscellaneous', module)
	.addDecorator(withKnobs)
	.add("Empty", () => (
		<Empty
			description="Inga inlägg hittades med detta filter!"
		/> 
	))
	.add("Profile dropdown", () => {
		const name = text('Name', 'Arunoda Susiripala');
		const age = number('Age', 89);

		return (
			<ProfileDropdown
				name={name}
				age={age}
			/> 
		)}
	)
	.add("Modal with input", () => React.createElement(() => {

		const [modalVisible, showModal] = useState(false)

		const handleConfirm = (inputRef) => console.log(inputRef)

		return (
			<span>
				<button
					onClick={() => showModal(!modalVisible)}
				>
					Show modal
				</button>
				<Modal
					title={"Hey Kelvin!"}
					visible={modalVisible}
					handleConfirm={handleConfirm}
					showInput
				/>
			</span>
		)
	}))
	.add("Delete account", () => React.createElement(() => {

		const [modalVisible, showModal] = useState(false)

		const handleConfirm = (inputRef) => action("clicked")()
		const handleCancel = () => action("canceled")()

		const onCancel = () => showModal(false)
		const onConfirm = () => showModal(false)

		return (
			<span>
				<button
					onClick={() => showModal(!modalVisible)}
				>
					Delete account
				</button>
				<Modal
					title="Är du säker? 🗑️"
					description={"Ifall du trycker på \"Radera\" test kommer ditt konto raderas permanent."}
					visible={modalVisible}
					handleConfirm={handleConfirm}
					handleCancel={handleCancel}
					confirmText="Radera"
					cancelText="Avbryt"

					onCancel={onCancel}
					onConfirm={onConfirm}
				/>
			</span>
		)
	}))
	.add("Report", () => React.createElement(() => {

		const [modalVisible, showModal] = useState(false)

		const handleConfirm = (inputValue) => action("reported")({reason: inputValue})

		return (
			<span>
				<button
					onClick={() => showModal(!modalVisible)}
				>
					Rapportera
				</button>
				<Modal
					title="Varför vill du rapportera agoragrammet?"
					description={"Skriv en anledning"}
					visible={modalVisible}
					handleConfirm={handleConfirm}
					showInput
					confirmText="Rapportera"
					cancelText="Avbryt"
				/>
			</span>
		)
	}))
