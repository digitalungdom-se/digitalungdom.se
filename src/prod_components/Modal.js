import React, { createRef } from 'react'
import Link from 'containers/Link'
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
  onConfirm = () => {},
  modalType
}) {

  const inputRef = createRef()

  return (
     <Modal
       visible={visible}
       onCancel={onCancel}
       footer={null}
       style={{textAlign: "center", maxWidth: 300}}
     >
       <h1 style={{fontSize: 18, fontWeight: 'bold', marginTop: -8}}>{title}</h1>
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

       {
         modalType === "confirmOnly"?
         (
           <Row type="flex" justify="end">
             <Col>
               <Button
                 style={{width: "100%"}}
                 onClick={() => {
                  onConfirm()
                }}
               >
                 {confirmText}
               </Button>
             </Col>
           </Row>
         )
         :
         modalType === "mustAuthenticate"?
         (
           <Row type="flex" justify="center">
             <Col span={24}>
              <Link to={"/bli-medlem"}>
               <Button
                 style={{width: "100%", marginBottom: 8}}
                 type="primary"
                 onClick={() => {
                  handleConfirm()
                }}
               >
                 Bli medlem!
               </Button>
              </Link>
             </Col>

             <Col span={24}>
              <Link to={"/logga-in"}>
               <Button
                 style={{width: "100%"}}
                 onClick={() =>
                   {
                    handleConfirm()
                   }
                 }>
                 Logga in
               </Button>
              </Link>
             </Col>
           </Row>
         )
         :
         (
           <Row type="flex" justify="center" gutter={16}>
             <Col span={12}>
               <Button
                 style={{width: "100%"}}
                 onClick={() => {
                  onCancel()
                  onConfirm()
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
         )
     }
     </Modal>
  )
}

export default DU_Modal
