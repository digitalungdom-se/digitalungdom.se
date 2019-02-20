import React, { Component } from 'react'
import { Modal, Row, Col, Input, Tabs, Button, Icon } from 'antd'
import ReactMarkdown from 'react-markdown'
import emoji from 'emoji-dictionary'

const emojiSupport = text => text.value.replace(/:\w+:/gi, name => emoji.getUnicode(name) ? emoji.getUnicode(name) : name)

function textToEmoji(text) {
	return text.replace(/:\w+:/gi, name => emoji.getUnicode(name) ? emoji.getUnicode(name) : name)
}

const quote = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 14 16"><path fill='#666' fill-rule="evenodd" d="M6.16 3.5C3.73 5.06 2.55 6.67 2.55 9.36c.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.9 0-2.99-1.52-2.99-4.25 0-3.8 1.75-6.53 5.02-8.42L6.16 3.5zm7 0c-2.43 1.56-3.61 3.17-3.61 5.86.16-.05.3-.05.44-.05 1.27 0 2.5.86 2.5 2.41 0 1.61-1.03 2.61-2.5 2.61-1.89 0-2.98-1.52-2.98-4.25 0-3.8 1.75-6.53 5.02-8.42l1.14 1.84h-.01z"/></svg>
)

const code = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="14" height="16" viewBox="0 0 14 16"><path fill='#666' fill-rule="evenodd" d="M9.5 3L8 4.5 11.5 8 8 11.5 9.5 13 14 8 9.5 3zm-5 0L0 8l4.5 5L6 11.5 2.5 8 6 4.5 4.5 3z"/></svg>
)

const h_rule = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><path fill='#666' fill-rule="evenodd" d="M1 7h2v2h1V3H3v3H1V3H0v6h1V7zm9 2V7H9v2h1zm0-3V4H9v2h1zM7 6V4h2V3H6v6h1V7h2V6H7zm-7 7h10v-2H0v2z"/></svg>
)

const { TabPane } = Tabs

class TextArea extends Component {
	constructor(props) {
		super(props)
		this.textInput = React.createRef()
		this.state = {
			textAreaValue: '',
			selection: 0
		}
	}

	insert = (e, textInput, type, one, two ) => {
		const text = [
			textInput.value.slice(0, textInput.selectionStart),
			textInput.value.slice(textInput.selectionStart, textInput.value.length)
		]

		let addText
		let addOffset

		switch(type) {
			case 'link':
				addText = '[' + one + '](' + two + ')'
				addOffset = addText.length
				break
			case 'img':
				addText = '![' + one + '](' + two + ')'
				addOffset = addText.length
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
				addText = '`'
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

		textInput.value = text[0] + addText + text[1]
		textInput.selectionStart += addOffset

		this.setState({
			textAreaValue: text[0] + addText + text[1]
		})

		textInput.focus()
	}

	render() {
		return (
			<Tabs>
				<TabPane
					tab="Skriv"
					key="1"
				>
					<Row
						style={{paddingBottom: 20}}
						type="flex"
						justify="space-around"
					>
						<Col>
							<Button.Group>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, '# ' )}
								>
									h1
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, '## ' )}
								>
									h2
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, '### ' )}
								>
									h3
								</Button>
							</Button.Group>
						</Col>
						<Col>
							<Button.Group>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, 'link' )}
								>
									<Icon type="link" />
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, 'img' )}
								>
									<Icon type="picture" />
								</Button>
							</Button.Group>
						</Col>
						<Col>
							<Button.Group>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, 'b' )}
								>
									<Icon type="bold" />
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, 'i' )}
								>
									<Icon type="italic" />
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, 'code' )}
								>
									<Icon component={code}/>
								</Button>
							</Button.Group>
						</Col>
						<Col>
							<Button.Group>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, '1. ' )}
								>
									<Icon type="ordered-list" />
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, '* ' )}
								>
									<Icon type="bars"/>
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, 'h_rule' )}
								>
									<Icon component={h_rule}/>
								</Button>
								<Button
									onClick={(e) => this.insert(e, this.textInput.textAreaRef, '> ' )}
								>
									<Icon component={quote}/>
								</Button>
							</Button.Group>
						</Col>
					</Row>
					<Input.TextArea
						autosize={{minRows: 10, maxRows: 24}}
						ref={element => this.textInput = element}
						onChange={(e) => this.setState({textAreaValue: textToEmoji(this.textInput.textAreaRef.value)})}
					/>
					<span style={{float: 'right'}}>
						{this.state.textAreaValue.length} / 10000
					</span>
				</TabPane>
				<TabPane
					tab="Förhandsvisa"
					key="2"
				>
					<ReactMarkdown source={this.state.textAreaValue} renderers={{ text: emojiSupport }} />
				</TabPane>
			</Tabs>
		)
	}
}

export default TextArea
