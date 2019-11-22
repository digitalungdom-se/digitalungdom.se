import React, {useState} from 'react'
import Modal from '@components/Modal'
import { Icon } from 'antd'

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

const MarkdownGuideModal = () => {
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

export default MarkdownGuideModal
