import  React from 'react'
import { Row, Col, Select, Input, Button, Form } from 'antd'
import { Redirect } from 'react-router-dom'
import Card from '@components/Card'

function Agorize({
	agorize,
	hypagora = "general",
	agoragramType,
	id = "",
	availableHypagoras = ["general"],
	form,
	agorizing,
	agorized
}) {

	const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = form

	function handleForm(e) {
		e.preventDefault()
		form.validateFieldsAndScroll((err, values) => {
	    if (!err) {
	    	if(agoragramType === "post") {
	    		agorize({
	    			type: values.type,
	    			title: values.title,
	    			tags: values.tags ? values.tags : [],
	    			body: values.text ?values.text : "" 
	    		}, null, "post")
	    	}
	    	else agorize({
	    		type: "comment",
	    		body: values.text,
	    		replyTo: id
	    	})
	    }
	  });
	}

	// const formItemLayout = agoragramType==="post" ? {
	// 	labelCol: {
	// 		xs: {span: 6}
	// 	},
	// 	wrapperCol: {
	// 		xs: {span: 16}
	// 	}
	// } : {}
	// const tailFormLayout = agoragramType==="post" ? {
	// 	wrapperCol: {
	// 		xs: {
	// 			offset: 0
	// 		},
	// 		sm: {
	// 			offset: 6
	// 		}
	// 	}
	// } : {}

	const titleError = isFieldTouched('titleError') && getFieldError('titleError');
	if(agoragramType!=="comment" && agorized) return <Redirect to="/agora" />

	return (
		<Form
			onSubmit={(e) => handleForm(e)}
			// {...formItemLayout}
		>
			<Card
				// style={
				// 	agoragramType==="post" ?
				// 	{background: "white", border: "1px solid #e8e8e8", padding: 30}
				// 	: {}
				// }
				titleAlign="left"
				title={
					agoragramType === "post" ?
						"Publicera inlägg"
						:
						null
				}
			>
				{
					agoragramType === "post" &&
					<React.Fragment>
						<Form.Item>
							{getFieldDecorator('type', {
								rules: [{
									required: true,
									message: "Ange inläggstyp "
									}]
		          })(
		          	<Select
		          		placeholder="Välj inläggstyp"
		          	>
			          	<Select.Option value="text">Text</Select.Option>
			          	<Select.Option value="link">Länk</Select.Option>
		          	</Select>
		          )}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('title', {
								rules: [{
									required: true,
									message: "Ange en titel "
								}]
							})(
		          	<Input placeholder="Titel" type="text" />
		          )}
						</Form.Item>
						<Form.Item>
							{getFieldDecorator('tags')(
		          	<Select
		          		placeholder="Välj taggar (separera med Enter-knappen)"
		          		mode="tags"
		          		maxTagCount={5}
		          	/>
		          )}
						</Form.Item>
					</React.Fragment>
				}
			<Form.Item>
				{getFieldDecorator('text')(
        	<Input.TextArea
        		name="body"
        		placeholder="Text (icke-obligatoriskt)"
        		autosize={{minRows: 4}}
      		/>
        )}
			</Form.Item>
			<Form.Item
				// {...tailFormLayout}
			>
				<Button loading={agorizing && (!agorized)} type="primary" htmlType="submit">Publicera</Button>
			</Form.Item>
			</Card>
		</Form>
	)
}

export default Form.create()(Agorize)
