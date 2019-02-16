import React, { Component } from 'react'
import { Row, Col, Card, Form, Input } from 'antd'
import TextArea from './TextArea.js'

class CreateBlogPost extends Component {
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
					<WrappedBlogPostForm />
				</Card>
			</Col>
			</Row>
		)
	}
}

class BlogPostForm extends Component {

	handleSubmit(e) {
		console.log(e)
	}

	render() {
		const { getFieldDecorator } = this.props.form
		return (
			<Form
				onSubmit={this.handleSubmit}
			>
				<Form.Item
          label="Rubrik"
        >
          {getFieldDecorator('Rubrik', {
            rules: [{
              required: true, message: 'Skriv en rubrik!',
            }],
          })(
            <Input />
          )}
        </Form.Item>
				<Form.Item
          label="Inlägg"
        >
          {getFieldDecorator('Rubrik', {
            rules: [{
              required: true, message: 'Skriv en rubrik!',
            }],
          })(
            <TextArea />
          )}
        </Form.Item>
			</Form>
		)
	}
}

const WrappedBlogPostForm = Form.create()(BlogPostForm)

export default CreateBlogPost
