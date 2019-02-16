import React, { Component } from 'react'
import { Input, Tabs, Button } from 'antd'
import ReactMarkdown from 'react-markdown'
import emoji from 'emoji-dictionary'
const emojiRegex = require('emoji-regex')()

const emojiSupport = text => text.value.replace(/:\w+:/gi, name => emoji.getUnicode(name))

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

	insert = (e, value, textInput) => {

		const newValue = textInput.value.slice(0, textInput.selectionStart) + value + textInput.value.slice(textInput.selectionStart, textInput.value.length)

		textInput.value = newValue

		this.setState({
			textAreaValue: textInput.value
		})
	}

	handleChange(e, textInput) {

		const value = textInput.value

		const matches = value.match(emojiRegex)

		if(matches) {
			matches.forEach(match => {
				value = value.replace(match, `:${emoji.getName(match)}:`)
			})
		}
	}

	render() {
		return (
			<Tabs>
				<TabPane
					tab="Skriv"
					key="1"
				>
					<div
						style={{paddingBottom: 20}}
					>
						<Button.Group>
							<Button
								onClick={(e) => this.insert(e, '# ', this.textInput.textAreaRef)}
							>
								h1
							</Button>
							<Button
								onClick={(e) => this.insert(e, '## ', this.textInput.textAreaRef)}
							>
								h2
							</Button>
							<Button
								onClick={(e) => this.insert(e, '### ', this.textInput.textAreaRef)}
							>
								h3
							</Button>
						</Button.Group>
					</div>
					<Input.TextArea
						autosize={{minRows: 10, maxRows: 24}}
						ref={element => this.textInput = element}
						// onChange={this.handleChange}
						// onChange={() => {console.log(this.TextAreaValue); console.log(1)}}
						onChange={(e) => this.handleChange(e, this.textInput.textAreaRef)}
					/>
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
