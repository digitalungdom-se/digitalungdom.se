import React from 'react'

class FileSelector extends React.Component {
  constructor(props){
    super(props)
  }

  verifyImageFile(){

  }

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      this.props.handleImgSrc(reader.result)
    }, false)
    reader.readAsDataURL(file)
  }

  render(){
    return (
      <div>
        <a
          style={{color: "rgba(0,0,0,0.6)"}}
          onClick={()=>{this.upload.click()}}
        >
          Ladda upp ny profilbild
        </a>

        <input
          id="fileInput"
          type="file"
          ref={(ref) => this.upload = ref}
          style={{display: 'none'}}
          onChange={this.onChangeFile.bind(this)}
        />
      </div>
    )
  }
}

export default FileSelector
