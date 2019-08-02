import React from 'react'
import { Button, Form, Input } from 'antd'

function Reply({
	onCancel = () => {},
	reply,
	form,
}) {

	const { getFieldDecorator } = form

	function handleSubmit(e) {
		e.preventDefault()
		form.validateFields((err, values) => {
			if(!err) {
				reply({
					body: values.text,
					type: "comment",
					role: "user"
				})
			}
		})
	}

	return (
		<Form
			onSubmit={handleSubmit}
		>
			<Form.Item>
				{getFieldDecorator('text', {
	        rules: [{ required: true, message: 'You need body' }],
	      })(
	        <Input.TextArea
	        	autosize={{minRows: 2}}
  				/>,
	      )}
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					htmlType="submit"
				>
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}



export default Form.create()(Reply)
