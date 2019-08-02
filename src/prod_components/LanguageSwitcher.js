import React from 'react'
import { Dropdown, Menu, Select, Icon } from 'antd'


// const menu = (
//   <Menu>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
//         1st menu item
//       </a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
//         2nd menu item
//       </a>
//     </Menu.Item>
//     <Menu.Item>
//       <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
//         3rd menu item
//       </a>
//     </Menu.Item>
//   </Menu>
// );

const LanguageMenu = (languages, chosenLanguage, changeLanguage) => (
	<Menu
		// onSelect={({ key }) => {
		// 	console.log(key)
		// 	changeLanguage(key)
		// }}
		mode="vertical"
		// style={{padding: "0px 20px"}}
		onSelect={() => console.log('sup')}
		selectedKeys={[chosenLanguage]}
	>
		{
			languages.map(lng => (
				<Menu.Item key={lng}>
					{lng}
				</Menu.Item>
			))
		}
	</Menu>
)

const BritishSVG = () => (
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="1.6em" height="1em" width="2em" height="1em">
		<clipPath id="t">
			<path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
		</clipPath>
		<path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>
		<path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
		<path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#cf142b" stroke-width="4"/>
		<path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
		<path d="M30,0 v30 M0,15 h60" stroke="#cf142b" stroke-width="6"/>
	</svg>
)

const SwedishSVG = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1em" viewBox="0 0 16 10">
		<rect width="16" height="10" fill="#006aa7"/>
		<rect width="2" height="10" x="5" fill="#fecc00"/>
		<rect width="16" height="2" y="4" fill="#fecc00"/>
	</svg>
)

const HeartSvg = () => (
  <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 1024 1024">
    <path d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z" />
  </svg>
);

const Flag = ({svg, ...props}) => <Icon component={svg}  {...props} style={{verticalAlign: "-0." + props.style.fontSize + "em", ...props.style}} />;

function LanguageSwitcher({ languages, chosenLanguage, changeLanguage }) {
	// return (
	// 	<Flag
	// 		svg={BritishSVG}
	// 		style={{
	// 			fontSize: 32,
	// 		}}
	// 	/>
	// )
	// return (
	// 	<div
	// 		style={{
	// 			display: "table",
	// 			position: "relative",
	// 			overflow: "hidden",
	// 			height: 60
	// 		}}
	// 	>
	// 		<div
	// 			style={{
	// 				position: "relative",
	// 				top: "-50%",
	// 				height: 32
	// 			}}
	// 		>
	// 			<SwedishSVG
	// 				style={{
	// 					fontSize: 32
	// 				}}
	// 			/>
	// 		</div>
	// 	</div>
	// )
	return (
		<Dropdown
			overlay={LanguageMenu(languages, chosenLanguage, changeLanguage)}
		>
		{
			true ?
			<Flag
				svg={SwedishSVG}
				style={{fontSize: 24}}
			/>
			:
			<Icon
				type="search"
				style={{fontSize: 24}}
			/>
		}
		</Dropdown>
	)
	return (
		<Select
			value={chosenLanguage}
			onSelect={lng => changeLanguage(lng)}
			style={{padding: 0}}
		>
			{
				languages.map((lng, a) => (
					<Select.Option key={lng} value={lng}
					>
						{a === 0 ?
							<SwedishSVG
								style={{fontSize: 16}}
							/>
							:
							<SwedishSVG
								style={{fontSize: 16}}
							/>
						}
					</Select.Option>
				))
			}
		</Select>
	)
}

export default LanguageSwitcher
