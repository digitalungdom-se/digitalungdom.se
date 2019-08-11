import  React from 'react'
import { Row, Col, Select, Input, Button, Form } from 'antd'

function Agorize({
	agorize,
	hypagora = "general",
	agoragramType,
	id = "",
	availableHypagoras = ["general"],
	form,
	agorizing,
}) {

	const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form

	function handleForm(e) {
		e.preventDefault()
		form.validateFieldsAndScroll((err, values) => {
	    if (!err) {
	    	if(agoragramType === "post") {
	    		agorize({
	    			hypagora: values.hypagora,
	    			type: values.type,
	    			title: values.title,
	    			tags: values.tags,
	    			body: values.text
	    		})
	    	}
	    	else agorize({
	    		type: "comment",
	    		body: values.text,
	    		replyTo: id
	    	})
	    }
	  });
	}

	const formItemLayout = agoragramType==="post" ? {
		labelCol: {
			xs: {span: 6}
		},
		wrapperCol: {
			xs: {span: 16}
		}
	} : {}
	const tailFormLayout = agoragramType==="post" ? {
		wrapperCol: {
			xs: {
				offset: 0
			},
			sm: {
				offset: 6
			}
		}
	} : {}

	const titleError = isFieldTouched('titleError') && getFieldError('titleError');

	return (
		<Form
			onSubmit={(e) => handleForm(e)}
			{...formItemLayout}
		>
			<div
				style={
					agoragramType==="post" ?
					{background: "white", border: "1px solid #e8e8e8", padding: 30}
					: {}
				}
			>
				{
					agoragramType === "post" &&
					<React.Fragment>
						<Row>
							<Col
								offset={6}
							>
								<h2>Skapa inlägg</h2>
							</Col>
						</Row>
						<Form.Item label="Hypagora">
							{getFieldDecorator('hypagora', {
								initialValue: hypagora,
								rules: [
									{required: true}
								]
		          })(
		          	<Select>
		          		{
		          			availableHypagoras.map((hypagora) => 
		          				<Select.Option key={hypagora + '-option'} value="hypagora">{hypagora}</Select.Option>
		          			)
		          		}
		          	</Select>
		          )}
						</Form.Item>
						<Form.Item label="Inläggstyp">
							{getFieldDecorator('type', {
								initialValue: "text",
								rules: [
									{required: true}
								]
		          })(
		          	<Select>
			          	<Select.Option value="text">Text</Select.Option>
			          	<Select.Option value="link">Länk</Select.Option>
			          	<Select.Option value="question">Fråga</Select.Option>
		          	</Select>
		          )}
						</Form.Item>
						<Form.Item label="Titel" validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
							{getFieldDecorator('title', {
								rules: [{
									required: true
								}]
							})(
		          	<Input name="title" type="text" />
		          )}
						</Form.Item>
						<Form.Item label="Taggar">
							{getFieldDecorator('tags')(
		          	<Select mode="tags" maxTagCount={5} />
		          )}
						</Form.Item>
					</React.Fragment>	
				}
			<Form.Item
				label={agoragramType==="post" ? "Text" : ""}
			>
				{getFieldDecorator('text')(
        	<Input.TextArea
        		name="body"
        		placeholder="Text (optional)"
        		autosize={{minRows: 4}}
      		/>
        )}
			</Form.Item>
			<Form.Item
				{...tailFormLayout}
			>
				<Button loading={agorizing} type="primary" htmlType="submit">Publicera</Button>
			</Form.Item>
			</div>
		</Form>
	)
}

export default Form.create()(Agorize)
