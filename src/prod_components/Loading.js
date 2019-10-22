import React from 'react'
import { Spin, Icon } from 'antd'
import Logo from '@components/Logo'

const Center = ({ style, vertically, horizontally, children, ...props }) => (
	<div
		style={{
			width: "100%",
			height: "100%",
			display: "flex",
			alignItems: vertically ? "center" : null,
			justifyContent: horizontally ? "center" : null,
			...style
		}}
		{...props}
	>
		{children}
	</div>
)

function Loading({ logo, spin, card }) {
	return (
		<Center
			style={{
				background: card ? "rgb(240,242,245)" : null
			}}
		>
			<div
				style={{
					width: "80%",
					maxWidth: "450px",
					margin: "auto",
					textAlign: "center",
					height: "80%",
					border: card ? "1px solid #e8e8e8" : null,
					background: card ? "white" : null,
					paddingBottom: 48,
				}}
			>
				<Center
					vertically
				>
					<div
						style={{margin: "auto"}}
					>
						{
							logo &&
							<Logo
								fontSize={40}
							/>
						}
						{
							spin &&
							<Spin
								style={{marginTop: 48}}
								indicator={<Icon style={{fontSize:80}} type="loading" spin />}
							/>
						}
					</div>
				</Center>
			</div>
		</Center>
	)
}

export default Loading
