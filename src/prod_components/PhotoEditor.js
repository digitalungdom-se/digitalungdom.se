import React from "react"
import { Button, Modal } from "antd"
import ReactCrop from "react-image-crop"
import ErrorModal from "@components/Modal"
import "react-image-crop/dist/ReactCrop.css"

const { useState, forwardRef, useImperativeHandle } = React;
const imageMaxSize = 1000000000 // Bytes
const acceptedFileTypes = ["image/x-png", "image/png", "image/jpg", "image/jpeg", "image/gif"]

const PhotoEditor = forwardRef((props, ref) => {
  // Modals
  const [visible, setVisible] = useState(false)
  const [errorVisible, setErrorVisible] = useState(false)

  const [imgSrc, setImgSrc] = useState(null)
  const [crop, setCrop] = useState({ aspect: 1 / 1, maxWidth: 1000, minWidth: 60})

  // Image size for calculating correct crop
  const [orginalImageSizeWidth, setOrginalImageSizeWidth] = useState(0)
  const [orginalImageSizeHeight, setOrginalImageSizeHeight] = useState(0)

  // References
  const imageCanvasRef = React.createRef()
  const reactCropRef = React.createRef()

  const onErrorCancel = () => setErrorVisible(false)

  useImperativeHandle(ref, () => ({
    // Opens modal and handles image src from fileSelector.js
    openCropperModal(file, _imgSrc){

      // Set the orginal dimentions of the img
      var img = new Image();
      img.onload = function() {
        setOrginalImageSizeWidth(this.width)
        setOrginalImageSizeHeight(this.height)
      }
      img.src = _imgSrc


      // Check if file type is accepted
      if(getFileTypeAccepted(file)){
        setImgSrc(_imgSrc)
        setVisible(true)
      }else{
        setErrorVisible(true)
      }
    }
  }));

  const getFileType = src => {
    return src.substring("data:".length, src.indexOf(";base64"))
  }

  const getFileTypeAccepted = file => {
    // If an accepted file type doesn't exist, return false
    if(acceptedFileTypes.indexOf(file.type) === -1){
      return false
    }
    // If the file is too large, return false
    if(file.size > imageMaxSize){
      return false
    }
    return true
  }

  const handleOnCropChange = crop => {
    setCrop(crop)
  }

  const handleOnCropComplete = (crop, _pixelCrop) => {
    const canvasRef = imageCanvasRef.current
    image64toCanvasRef(canvasRef, imgSrc, crop)
  }

  const handleDoneWithCrop = () => {
    const imgType = getFileType(imgSrc)
    const imageData64 = imageCanvasRef.current.toDataURL("image/" + imgType)
    props.dispatchImageData64(imageData64)
    setVisible(false)
  }

  // Base64 Image to Canvas with a Crop
  const image64toCanvasRef = (canvasRef, image64, crop) => {
    const divRef = reactCropRef.current
    const imageWidthModificationCoefficient = orginalImageSizeWidth / divRef.clientWidth
    const imageHeightModificationCoefficient = orginalImageSizeHeight / divRef.clientHeight
    const canvas = canvasRef
    canvas.width = crop.width
    canvas.height = crop.height
    const ctx = canvas.getContext('2d')
    const image = new Image()
    image.src = image64
    image.onload = function () {
      if(crop.width !== 0) {
        ctx.drawImage(
          image,
          // Source image (our crop but modified)
          crop.x * imageWidthModificationCoefficient,
          crop.y * imageHeightModificationCoefficient,
          crop.width * imageWidthModificationCoefficient,
          crop.height * imageHeightModificationCoefficient,
          // Destination image
          0,
          0,
          crop.width,
          crop.height
        )
      }
    }
  }

  const onCancel = () => {
    setVisible(false)
  }

  return(
    <div>
      <Modal
        visible={visible}
        onCancel={onCancel}
        footer={null}
        style={{textAlign: "center"}}
      >
        <h3 style={{color: "rgba(0,0,0,0.7)", marginTop: -8}}>
          Klicka och dra för att redigera din bild <span role="img" aria-label="profile">👤</span>
        </h3>
        <div style={{flex: 1, top: 0}}>
          <div ref={reactCropRef}>
            <ReactCrop
            src={imgSrc}
            crop={crop}
            onChange={handleOnCropChange}
            onComplete={handleOnCropComplete}
            />
          </div>
          <canvas style={{visibility: "hidden", position: 'absolute'}} ref={imageCanvasRef}/>
        </div>

        <Button onClick={()=> setVisible(false)} style={{width: "30%", margin: 4}}>
          Avbryt
        </Button>
        <Button onClick={()=> handleDoneWithCrop()} style={{width: "30%", margin: 4}} type="primary">
          Klar
        </Button>
      </Modal>

      <ErrorModal
        modalType="confirmOnly"
        visible={errorVisible}
        title={<div>Försök igen!<span role="img" aria-label="warning">⚠️</span></div>}
        description="Filformatet du valt är inte tillåtet."
        handleCancel={onErrorCancel}
        onCancel={onErrorCancel}
        onConfirm={onErrorCancel}
        confirmText="Tillbaka"
      />
    </div>
  )
});

export default PhotoEditor
