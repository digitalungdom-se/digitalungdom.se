import React from 'react'

class FileSelector extends React.Component {
  verifyImageFile(){

  }

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    // Get the file
    var file = event.target.files[0];
    // Create our file reader
    const reader = new FileReader()
    // Add a listener to handleImgSrc when loaded
    reader.addEventListener("load", () => {
      this.props.handleImgSrc(file, reader.result)
    }, false)
    // Load the file as dataURL
    reader.readAsDataURL(file)
  }

  render(){
    return (
      <div style={{width: "100%", height: "100%"}}>
        <span
          className="highlightable"
          style={{color: "rgba(0,0,0,0.6)"}}
          onClick={()=>{this.upload.click()}}
        >
          Ladda upp ny profilbild
        </span>

        <input
          id="fileInput"
          type="file"
          ref={(ref) => this.upload = ref}
          style={{display: 'none', background: 'red'}}
          onChange={this.onChangeFile.bind(this)}
        />
      </div>
    )
  }
}

export default FileSelector
