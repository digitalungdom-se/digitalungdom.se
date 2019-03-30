import React, { Component } from 'react'
import { Modal, Row, Col, Input, Tabs, Button, Icon, Mention } from 'antd'
import ReactMarkdown from 'react-markdown'
import emoji from 'emoji-dictionary'

const emojiSupport = text => text.value.replace(/:\w+:/gi, name => emoji.getUnicode(name) ? emoji.getUnicode(name) : name)

function textToEmoji(text) {
	return text.replace(/:\w+:/gi, name => emoji.getUnicode(name) ? emoji.getUnicode(name) : name)
}

const quote = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 14 16"><path fill='#666' fillRule="evenodd" d="M6.16 3.5C3.73 5.06 2.55 6.67 2.55 9.36c.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.9 0-2.99-1.52-2.99-4.25 0-3.8 1.75-6.53 5.02-8.42L6.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.89 0-2.98-1.52-2.98-4.25 0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z"/></svg>
)

const code = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16"><path fill='#666' fillRule="evenodd" d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"/></svg>
)

const h_rule = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><path fill='#666' fillRule="evenodd" d="M1 7h2v2h1V3H3v3H1V3H0v6h1V7zm9 2V7H9v2h1zm0-3V4H9v2h1zM7 6V4h2V3H6v6h1V7h2V6H7zm-7 7h10v-2H0v2z"/></svg>
)

const { TabPane } = Tabs

class TextArea extends Component {

	static getDerivedStateFromProps(nextProps) {
	  // Should be a controlled component.
	  if ('value' in nextProps) {
	    return {
	      ...(nextProps.value || {}),
	    };
	  }
	  return null;
	}

	constructor(props) {
		super(props)

		const value = props.value || {};
		this.textInput = React.createRef()
		this.linkURL = React.createRef()
		this.linkText = React.createRef()
		this.imgURL = React.createRef()
		this.imgAlt = React.createRef()
		this.state = {
			text: value.text || '',
			selection: 0,
			length: 0,
			linkModal: false,
			imgModal: false
		}
	}

	handleChange = (e) => {
	  if(e) {
	    let v = {text: e.target.value, length: e.target.value.length}
	    this.setState(v)
	    this.triggerChange(v)
	  }
	}

	triggerChange = (changedValue) => {
	  // Should provide an event to pass value to Form.
	  const onChange = this.props.onChange;
	  if (onChange) {
	    onChange(Object.assign({}, this.state, changedValue));
	  }
	}

	insert = (type, one, two ) => {

		const textInput = this.textInput.textAreaRef

		let addText
		let addOffset

		switch(type) {
			case 'h1':
				addText = '# '
				addOffset = 2
				break
			case 'h2':
				addText = '## '
				addOffset = 3
				break
			case 'h3':
				addText = '### '
				addOffset = 4
				break
			case 'link':
				if (one === undefined) return this.setState({linkModal: true});
				else {
					addText = '[' + one + '](' + two + ')'
					addOffset = addText.length
				}
				break
			case 'img':
				if (one === undefined) return this.setState({imgModal: true});
				else {
					addText = '![' + one + '](' + two + ')'
					addOffset = addText.length
				}
				break
			case 'i':
				addText = '__'
				addOffset = 1
				break
			case 'h_rule':
				addText = '\n***'
				addOffset = 0
				break
			case 'code':
				addText = '``'
				addOffset = 1
				break
			case 'b':
				addText = '****'
				addOffset = 2
				break
			default:
				addText = type
				addOffset = type.length
				break
		}

		const text = [
			textInput.value.slice(0, textInput.selectionStart),
			textInput.value.slice(textInput.selectionStart, textInput.value.length)
		]

		textInput.value = text[0] + addText + text[1]
		textInput.selectionStart += addOffset

		textInput.focus()
	}

	render() {

		const buttons = [
			[
				['h1'],
				['h2'],
				['h3']
			],
			[
				['link', 'link'],
				['img', 'picture']
			],
			[
				['b', 'bold'],
				['i', 'italic'],
				['code', null, code],
			],
			[
				['1. ', 'ordered-list'],
				['* ', 'bars'],
				['h_rule', null, h_rule],
				['> ', null, quote]
			]
		]

		const ButtonIcon = ({button}) => {
			if(button[1]) return <Icon type={button[1]}/>;
			else if(button[2]) return <Icon component={button[2]} />;
			else return <span>{button[0]}</span>
		}

		const renderButtons = buttons => buttons.map((col, id1) => (
			<Col key={id1 + 'button'}>
				<Button.Group>
					{
						col.map((button, id2) => (
							<Button key={id2 + 'button'} onClick={() => this.insert(button[0])}>
								<ButtonIcon button={button} />
							</Button>
						))
					}
				</Button.Group>
			</Col>
		))

		return (
			<Tabs
				type="card"
				onTabClick={() => {
					this.setState({
						text: textToEmoji(this.textInput.textAreaRef.value)
					})
				}}
				tabBarExtraContent={this.props.extraActions ? (
					renderButtons([buttons[1]])
				) : null}
				value={this.state.text}
			>
				<TabPane
					tab="Skriv"
					key="1"
				>
					<Modal
						title="Infoga länk"
						visible={this.state.linkModal}
						onOk={() => {
							this.insert('link', this.linkText.current.input.value, this.linkURL.current.input.value)
							this.setState({linkModal: false})
							this.linkText.current.input.value = ''
							this.linkURL.current.input.value = ''
						}}
						style={{textAlign: 'center'}}
						onCancel={() => {
							this.setState({linkModal: false})
							this.linkText.current.input.value = ''
							this.linkURL.current.input.value = ''
						}}
					>
						<Input
							placeholder="Länktext"
							style={{width: '80%', marginBottom: 20}}
							ref={this.linkText}
						/>
						<Input
							placeholder="URL"
							style={{width: '80%'}}
							ref={this.linkURL}
						/>
					</Modal>
					<Modal
						title="Infoga bild"
						visible={this.state.imgModal}
						onOk={() => {
							this.insert('img', this.imgAlt.current.input.value, this.imgURL.current.input.value)
							this.setState({imgModal: false})
							this.imgAlt.current.input.value = ''
							this.imgURL.current.input.value = ''
						}}
						style={{textAlign: 'center'}}
						onCancel={() => {
							this.setState({imgModal: false})
							this.imgAlt.current.input.value = ''
							this.imgURL.current.input.value = ''
						}}
					>
						<Input
							placeholder="URL"
							style={{width: '80%', marginBottom: 20}}
							ref={this.imgURL}
						/>
						<Input
							placeholder="Alt text"
							style={{width: '80%'}}
							ref={this.imgAlt}
						/>
					</Modal>
					<Row
						style={{paddingBottom: 20}}
						type="flex"
						justify="space-around"
					>
						{
							renderButtons(buttons)
						}
					</Row>
					<Input.TextArea
						autosize={{minRows: 10, maxRows: 24}}
						ref={element => this.textInput = element}
						onChange={this.handleChange}
						placeholder={this.props.placeholder}
					/>
					<span style={{float: 'right'}}>
						{this.state.length} / 10000
					</span>
				</TabPane>
				<TabPane
					tab="Förhandsvisa"
					key="2"
				>
				{(this.state.text &&
					<ReactMarkdown
						source={this.state.text}
						renderers={{
							text: emojiSupport,
							image: (props) => {
								return <img {...props} style={{maxWidth: '100%'}} />
							}
						}
						}
					/>)
					||
					<span style={{color: 'gray'}}>Det finns ingen text att förhandsvisa.</span>
				}
				</TabPane>
			</Tabs>
		)
	}
}

TextArea.defaultProps = {
	extraActions: false
}

export default TextArea
