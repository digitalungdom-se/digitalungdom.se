import React from 'react'

class FileSelector extends React.Component {

  onChangeFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var file = event.target.files[0];
    console.log(file);
    //var form = new FormData();
    //form.append('file', this.state.file);
    //YourAjaxLib.doUpload('/yourEndpoint/',form).then(result=> console.log(result));
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
