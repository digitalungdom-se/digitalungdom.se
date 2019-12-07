import React, {useState} from 'react'
import Modal from '@components/Modal'
import { Icon } from 'antd'

// TODO: Add to components where it is needed 
const MustAuthModal = ({postTypeForModal}) => {
  const [mustAuthModalVisible, showMustAuthModal] = useState(false)
  const onCancel = () => showMustAuthModal(false);
  const onConfirm = () => showMustAuthModal(false);

  return(
    <Modal
      visible={mustAuthModalVisible}
      title="Logga in eller bli medlem!"
      description={"Du måste vara inloggad för att skriva " + postTypeForModal + "."}
      modalType="mustAuthenticate"
      handleConfirm={() => onConfirm()}
      onConfirm={() => onConfirm()}
      onCancel={() => onCancel()}
    />
  )
}
export default MustAuthModal
