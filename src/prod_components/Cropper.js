import React from 'react'
import Cropper from 'react-easy-crop'
const image = require('containers/image.json')

function CroppedImage({ image }) {
	const [crop, onCropChange] = React.useState({ x: 0, y: 0 })
	const [zoom, onZoomChange] = React.useState(1)

	return (
	  <Cropper
	    image={image.base64}
	    crop={crop}
	    zoom={zoom}
	    onCropChange={onCropChange}
	    onZoomChange={onZoomChange}
	    // style={{
	    // 	containerStyle: {
	    // 		width: 400,
	    // 		height: 400
	    // 	}
	    // }}
	    // onImageLoaded={imageSize => {
	    //   // Adapt zoom based on image size to fit max height
	    //   setZoom(CONTAINER_HEIGHT / imageSize.naturalHeight)
	    // }}
	  />
	)
}

export default CroppedImage
