import React from 'react'

function Card({ title, titleAlign = "center", children, ...props }) {
	return (
		<div
			{...props}
			style={{
				backgroundColor: 'white',
				paddingRight: 48,
        paddingLeft: 48,
        paddingBottom: 32,
        paddingTop: 24,
				borderRadius: 8,
				// width: 520,
				// top: 80,
				// paddingTop: 26,
				// paddingLeft: 76,
				// paddingRight: 76,
				// margin: 30,
				border:'1px solid rgba(0,0,0,0.1)',
				...props.style
			}}
		>
			{
				title &&
				<h1
					style={{
						marginBottom: 20,
						textAlign: titleAlign,
						color: 'var(--du-blue)',
						// color: 'rgba(1,45,213,0.6)',
						fontSize: 20,
					}}
				>
					{title}
				</h1>
			}
			{children}
		</div>
	)
}

export default Card
