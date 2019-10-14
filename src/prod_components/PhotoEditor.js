import React from "react"
import { Button, Modal } from "antd"
import ReactCrop from "react-image-crop"
import ErrorModal from "@components/Modal"
import "react-image-crop/dist/ReactCrop.css"

const { useState, forwardRef, useImperativeHandle } = React;
const acceptedFileTypes = ["image/x-png", "image/png", "image/jpg", "image/jpeg", "image/gif"]

const PhotoEditor = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)
  const [imgSrc, setImgSrc] = useState(null)
  const [crop, setCrop] = useState({ aspect: 1 / 1, maxWidth: 1000, minWidth: 60})
  const [pixelCrop, setPixelCrop] = useState(null)

  const onErrorCancel = () => setErrorVisible(false)

  useImperativeHandle(ref, () => ({
    openCropperModal(_imgSrc){
      if(getFileTypeAccepted(_imgSrc)){
        setImgSrc(_imgSrc)
        setVisible(true)
      }else{
        //varför fungerar detta inte?
        setErrorVisible(true)
        console.log(errorVisible)


      }
    }
  }));

  const getFileTypeAccepted = (src) => {
    var type = src.substring("data:".length, src.indexOf(";base64"))

    if(acceptedFileTypes.indexOf(type) === -1){
      return false
    }else{
      return true
    }
  }

  const handleOnCropChange = crop => {
    setCrop(crop)
  }

  const handleOnCropComplete = (crop, _pixelCrop) => {
    setPixelCrop(_pixelCrop)
  }

  const handleDoneWithCrop = () => {
    cropDataToImage64(pixelCrop)
  }

  const cropDataToImage64 = () => {
    var canvas = document.createElement('canvas');
    canvas.width = pixelCrop.width
    canvas.height = pixelCrop.height
    const ctx = canvas.getContext("2d")
    const image = new Image()
    image.src = imgSrc
    image.onload = function(){
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      )
    }
    const fileExtension = imgSrc.substring("data:image/".length, imgSrc.indexOf(";base64"))
    var dataURL = canvas.toDataURL("image/" + fileExtension);
    console.log(canvas)
  }

  const onCancel = () => {
    setVisible(false)
  }

  return(
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      style={{textAlign: "center"}}
    >
      <h3 style={{color: "rgba(0,0,0,0.7)", marginTop: -8}}>
        Klicka och dra för att redigera din bild 👤
      </h3>
      <div style={{flex: 1, top: 0}}>
        <ReactCrop
        src={imgSrc}
        crop={crop}
        onChange={handleOnCropChange}
        onComplete={handleOnCropComplete}
        />
      </div>
      <Button onClick={()=> setVisible(false)} style={{width: "30%", margin: 4}}>
        Avbryt
      </Button>
      <Button onClick={()=> handleDoneWithCrop()} style={{width: "30%", margin: 4}} type="primary">
        Klar
      </Button>

      <ErrorModal
      modalType="confirmOnly"
      visible={errorVisible}
      title="Försök igen!"
      description="Filformatet du valt är inte tillåtet."
      handleCancel={onErrorCancel}
      onCancel={onErrorCancel}
      onConfirm={onErrorCancel}
      />
    </Modal>
  )
});

export default PhotoEditor
