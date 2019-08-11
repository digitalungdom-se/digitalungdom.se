import  React from 'react'

function Agorize({
	agorize,
	hypagora = "general",
	agoragramType,
	replyTo = "",
	availableHypagoras = ["general"]
}) {
	function handleForm(e) {
		e.preventDefault()
		if(agoragramType === "post") {
			agorize({
				hypagora: e.target.hypagora.value,
				type: e.target.type.value,
				title: e.target.title.value,
				tags: e.target.tags.value.replace(/ /g, '').split(',').filter(Boolean),
				body: e.target.body.value
			})
		}
		else agorize({
			type: "comment",
			body: e.target.body.value,
			replyTo
		})
	}
	return (
		<form
			onSubmit={(e) => handleForm(e)}
		>
			{
				agoragramType === "post" &&
				<React.Fragment>
					<h1>Agorize</h1>
					<div>
						<select name="hypagora" defaultValue={hypagora}>
							{
								availableHypagoras.map((hypagora) => 
									<option key={hypagora + '-option'} value="hypagora">{hypagora}</option>
								)
							}
						</select>
					</div>
					<div>
						<select name="type">
							<option value="text">text</option>
							<option value="link">link</option>
							<option value="question">question</option>
						</select>
					</div>
					<div>
						<input name="title" type="text" placeholder="title" />
					</div>
					<div>
						<input name="tags" type="text" placeholder="tags" />
					</div>
				</React.Fragment>	
			}
			<div>
				<textarea name="body" placeholder="body"/>
			</div>
			<button type="submit">Submit</button>
		</form>
	)
}

export default Agorize
