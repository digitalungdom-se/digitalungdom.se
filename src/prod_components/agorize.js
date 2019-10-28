import  React, {useState} from 'react'
import { Select, Input, Button, Form, Icon } from 'antd'
import { Redirect } from 'react-router-dom'
import Card from '@components/Card'
import Modal from '@components/Modal'

const Description = () => (
	<div>
		<p>
			Skriv <i>kursivt</i> genom att omringa text med *
			<br/>
			*Text* = <i>Text</i>
		</p>
		<p>
			Skriv <b>fet stil</b> genom att omringa text med **
			<br/>
			**Text** = <b>Text</b>
		</p>
		<p>
			Skriv <code>kod-stil</code> genom att omringa text med ```
			<br/>
			```Text``` = <code>Text</code>
		</p>
	</div>
)

const GuideModal = () => {
  const [modalVisible, showModal] = useState(false)
  const onCancel = () => showModal(false);
  const onConfirm = () => showModal(false);

  return (
    <div>
			<span className="highlightable" style={{position: "absolute", right: 0, top: -6}} onClick = {()=> {showModal(true)}}>
				<Icon style={{fontSize: 14, marginRight: 10}} type="question-circle" />
			</span>
      <Modal
        visible={modalVisible}
        title="Markdown guide"
				description = {<Description/>}
        confirmText="Klar"
				modalType="confirmOnly"
        handleConfirm={() => onConfirm()}
        onConfirm={() => onConfirm()}
        onCancel={() => onCancel()}
      />
    </div>
  )
}

function Agorize({
	agorize,
	authorized,
	hypagora = "general",
	agoragramType,
	id = "",
	availableHypagoras = ["general"],
	form,
	agorizing,
	agorized
}) {

	const [mustAuthModalVisible, showMustAuthModal] = useState(false)
	const onCancel = () => showMustAuthModal(false);
  const onConfirm = () => showMustAuthModal(false);

	// TO-DO: add getFieldError, isFieldTouched
	const { getFieldDecorator } = form

	function handleForm(e) {
		e.preventDefault()

		if(authorized){
			form.validateFieldsAndScroll((err, values) => {
		    if (!err) {
		    	if(agoragramType === "post") {
		    		agorize({
		    			type: values.type,
		    			title: values.title,
		    			tags: values.tags ? values.tags : [],
		    			body: values.text ?values.text : ""
		    		}, "post")
		    	}
		    	else agorize({
		    		type: "comment",
		    		body: values.text,
		    		replyTo: id
		    	}, "comment")
		    }
		  });
		}
	}

	// TO-DO: add title error
	//const titleError = isFieldTouched('titleError') && getFieldError('titleError');
	if(agoragramType!=="comment" && agorized) return <Redirect to="/agora" />

	let postTypeForModal = "ett inlägg"
	if(agoragramType==="comment") postTypeForModal = "en kommentar"

	// Different placeholder for comment depending on if the user is authenticated or not.
	let commentPlaceholder = "Skriv din reaktion"
	if(!authorized){
		commentPlaceholder = "Du måste logga in eller skapa ett konto för att skriva en kommentar"
	}

	return (
		<Form
			onSubmit={(e) => handleForm(e)}
			disabled={authorized}

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
				style={{
					border: 0,
					paddingBottom: agoragramType === "comment" ? 0 : 24
				}}
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
				{getFieldDecorator('text', {
					rules: [
					{
						max: 10000, message: "Texten kan inte vara längre än 10000 karaktärer lång."
					}
					]
				})(
					<div
						style={{position: 'relative'}}
						onClick={()=> {
							if(!authorized){
								showMustAuthModal(true)
							}
						}}
					>
	        	<Input.TextArea
	        		name="body"
							disabled={!authorized}
	        		placeholder={
	        			agoragramType !== "comment" ?
	        				"Text (icke-obligatoriskt)\nDetta är markdown, tryck på frågetecknet för mer information. "
	        				:
	        				commentPlaceholder
							}
	        		autosize={{minRows: 4}}
	      		/>
						<GuideModal/>
					</div>
        )}
			</Form.Item>
			<Form.Item
				// {...tailFormLayout}
			>
				<Button
				loading={agorizing && (!agorized)}
				type="primary"
				htmlType="submit"
				disabled={!authorized}
				>
					Publicera {agoragramType === "comment" ? "kommentar" : "inlägg"}
				</Button>
			</Form.Item>
			</Card>

			<Modal
				visible={mustAuthModalVisible}
				title="Logga in eller bli medlem!"
				description={"Du måste vara inloggad för att skriva " + postTypeForModal + "."}
				modalType="mustAuthenticate"
				handleConfirm={() => onConfirm()}
        onConfirm={() => onConfirm()}
        onCancel={() => onCancel()}
			/>

		</Form>
	)
}

export default Form.create()(Agorize)
