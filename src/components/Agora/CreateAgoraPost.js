import React, { Component } from 'react'
import { Select, Button, Row, Col, Card, Form, Input, Tabs } from 'antd'
import { TextArea } from 'components'
import { connect } from 'react-redux'
import { Agora as actions } from 'actions'

const Option = Select.Option

class CreateAgoraPost extends Component {
	render() {
		const sizes = {
			style: { padding: 40 },
			lg: { span: 12 },
			md: { span: 18 },
			sm: { span: 24 },
			xs: { span: 24 },
		}
		return (
			<Row
				justify="center"
				type="flex"
			>
			<Col
				{...sizes}
			>
				<Card>
					<h1>
					Skapa inlägg
					</h1>
					<WrappedAgoraPostForm />
				</Card>
			</Col>
			</Row>
		)
	}
}



class AgoraPostForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tab: 'text',
			tags: [],
			badges: []
		}
	}

	changeTab(e) {
		this.setState({tab: e})
	}

	handleSubmit = (e) => {
		e.preventDefault()
		this.props.form.validateFields((err, values) => {
      if (!err) {
      	this.props['agora_publish_' + this.state.tab]({
      		body: values[this.state.tab].text,
      		type: this.state.tab,
      		group: "user",
      		title: values.title,
      		tags: this.state.tags
      	})
        console.log('Received values of form: ', values, this.state.tab);
      }
    });
	}

	render() {

		const children = [];
		for (let i = 10; i < 36; i++) {
		  children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>);
		}

		const { getFieldDecorator } = this.props.form
		return (
			<Form
				onSubmit={this.handleSubmit}
			>
				<Tabs
					onChange={(e) => this.changeTab(e)}
				>
					<Tabs.TabPane
						tab="Textinlägg"
						key="text"
					>
						<Form.Item>
		          {getFieldDecorator('title', {
		            rules: [{
		              required: true, message: 'Skriv en rubrik!',
		            }],
		          })(
		            <Input
		            	placeholder="Rubrik"
		            />
		          )}
		        </Form.Item>
						<Form.Item
		        >
		          {getFieldDecorator('text', {})(
		            <TextArea
		            	placeholder="Text"
		            />
		          )}
		       	</Form.Item>
   				</Tabs.TabPane>
   				<Tabs.TabPane
   					tab="Länk"
   					key="link"
   				>
						<Form.Item>
		          {getFieldDecorator('title', {
		            rules: [{
		              required: true, message: 'Skriv en rubrik!',
		            }],
		          })(
		            <Input
		            	placeholder="Rubrik"
		            />
		          )}
		        </Form.Item>
						<Form.Item
		        >
		          {getFieldDecorator('website', {
		          	rules: [{
		          		required: this.state.tab === 'link', message: 'Fältet är inte i URL-format.'
		          	}]
		          })(
		            <Input.TextArea
		            	autosize={{minRows: 3}}
		            	style={{resize: 'none'}}
		            	placeholder="URL"
		            />
		          )}
		       	</Form.Item>
   				</Tabs.TabPane>
   				<Tabs.TabPane
   					tab="Fråga"
   					key="question"
   				>
						<Form.Item>
		          {getFieldDecorator('title', {
		            rules: [{
		              required: true, message: 'Skriv en rubrik!',
		            }],
		          })(
		            <Input
		            	placeholder="Rubrik"
		            />
		          )}
		        </Form.Item>
						<Form.Item
		        >
		          {getFieldDecorator('question', {})(
		            <TextArea
		            	placeholder="Text"
		            />
		          )}
		       	</Form.Item>
   				</Tabs.TabPane>
      	</Tabs>
      	<Form.Item>
	      	<Select 
	      		mode="tags"
	      		onChange={(e) => this.setState({tags: e})}
	      		placeholder="Taggar"
	      	/>
      	</Form.Item>
      	<Button
	      	type="primary"
	      	style={{float: 'right'}}
	      	htmlType="submit"
      	>
      		Publicera
      	</Button>
			</Form>
		)
	}
}

const mapDispatchToProps = dispatch => {
	return {
		agora_publish_text: info => dispatch(actions.agora_publish_text(info)),
		agora_publish_link: info => dispatch(actions.agora_publish_link(info)),
		agora_publish_question: info => dispatch(actions.agora_publish_question(info))
	}
}

const WrappedAgoraPostForm = Form.create()(connect(null, mapDispatchToProps)(AgoraPostForm))

export default CreateAgoraPost
