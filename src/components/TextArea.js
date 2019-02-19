import React, { Component } from 'react'
import { Input, Tabs, Button } from 'antd'
import ReactMarkdown from 'react-markdown'
import emoji from 'emoji-dictionary'

const emojiSupport = text => text.value.replace(/:\w+:/gi, name => emoji.getUnicode(name) ? emoji.getUnicode(name) : name)

function textToEmoji(text) {
	return text.replace(/:\w+:/gi, name => emoji.getUnicode(name) ? emoji.getUnicode(name) : name)
}

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
