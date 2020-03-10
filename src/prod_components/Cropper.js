import React from 'react'
import Cropper from 'react-easy-crop'

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
	  />
	)
}

export default CroppedImage
