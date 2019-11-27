import  React, {useState} from 'react'
import { Select, Input, Button, Form } from 'antd'
import Modal from '@components/Modal'
import MarkdownGuideModal from '@components/MarkdownGuideModal'
import { Redirect } from 'react-router-dom'
import Card from '@components/Card'
import { isURL } from 'validator';

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

	// Must auth modal
	const [mustAuthModalVisible, showMustAuthModal] = useState(false)
	const onCancel = () => showMustAuthModal(false);
  const onConfirm = () => showMustAuthModal(false);

	// Form values
	const [formUrlIsValid, setUrlValid] = useState(null)

	// TO-DO: add getFieldError, isFieldTouched
	const { getFieldDecorator, setFields } = form

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
		    			body: postType !== "link" ? (values.text ? values.text : "") : values.website
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

	// This function validates a input's link.
	const checkValidLink = async (rule, value, callback) => {
		if(value){
			if(!isURL(value)) {
				callback("Felaktigt länk-format")
			}else{
				callback()
			}
		}else{
			callback()
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

	const postType = form.getFieldValue("type")

	return (
		<Form
			onSubmit={(e) => handleForm(e)}
			disabled={authorized}
		>
			<Card
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
				{getFieldDecorator(postType !== "link" ? 'text' : "website", {

					rules: postType !== "link" ? [{
						max: 10000,
						message: "Texten kan inte vara längre än 10000 karaktärer lång."
					}]
					:
					[{
						validator: checkValidLink
					}, {
						required: true,
						message: "Ange en länk"
					}]
				})(
						<div
							style={{position: 'relative'}}
							onClick={()=> {
								if(!authorized){
									showMustAuthModal(true)
								}
							}}
						>
							{
								postType !== "link" ?
								<div>
				        	<Input.TextArea
				        		name="body"
										disabled={!authorized}
										autosize={{minRows: 4}}
				        		placeholder={
				        			agoragramType !== "comment" ?
				        				"Text (icke-obligatoriskt)\nDetta är react-markdown, tryck på frågetecknet för mer information. "
				        				:
				        				commentPlaceholder
										}
				      		/>
				      		<MarkdownGuideModal/>
			      		</div>
								:
								<Input
									placeholder="https://www.digitalungdom.se"
									disabled={!authorized}
								/>
							}
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
