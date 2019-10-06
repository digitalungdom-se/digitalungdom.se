import React, { createRef } from 'react'
import { Modal, Col, Row, Button, Input } from 'antd'

function DU_Modal({
  visible = false,
  handleCancel = () => {},
  handleConfirm = () => {},
  title = "",
  description = "",
  cancelText = "Cancel",
  confirmText = "Confirm",
  showInput = false,
  handleInput = () => {},
  onCancel = () => {},
  onConfirm = () => {}
}) {

  const inputRef = createRef()

  return (
     <Modal
       visible={visible}
       onCancel={onCancel}
       footer={null}
       style={{textAlign: "center", maxWidth: 300}}
     >
       <h1 style={{fontSize: 18, fontWeight: 'bold'}}>{title}</h1>
       <p>{description}</p>
       {
        showInput &&
        <Input
          ref={inputRef}
          style={{
            marginBottom: 24
          }}
        />
       }
       <Row type="flex" justify="center" gutter={16}>
         <Col span={12}>
           <Button
             style={{width: "100%"}}
             onClick={() => {
              onCancel()
              handleCancel()
            }}
           >
             {cancelText}
           </Button>
         </Col>
         <Col span={12}>
           <Button
             style={{width: "100%"}}
             type="danger"
             onClick={() =>
               {
                onConfirm()
                if(showInput) handleConfirm(inputRef.current.input.value);
                else handleConfirm();
               }
             }>
             {confirmText}
           </Button>
         </Col>
       </Row>
     </Modal>
  )
}

export default DU_Modal
