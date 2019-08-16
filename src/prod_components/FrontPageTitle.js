import React from 'react'
import { Row, Col } from 'antd'

const defaultStyling = {fontSize: 40, marginBottom: 10, color: 'white', fontWeight: 'bold'}
var wordIndex = 0
var words = [
  {
    word: "roligt",
    style: {fontStyle: "italic", ...defaultStyling}
  },
  {
    word: "viktigt",
    style: {fontStyle: "bold", ...defaultStyling}
  },
  {
    word: "enkelt",
    style: {textDecoration: "underline", ...defaultStyling}
  },
]
class FrontPageTitle extends React.Component{
  constructor(props) {
    super(props);
    this.state = { wordIndex: 0 };
  }
  renderWord(){


    return(<h1 style={words[wordIndex].style}> {words[wordIndex].word} </h1>)
  }

  render(){

    setInterval(function(){
      console.log(wordIndex)
      if( this.state.wordIndex < words.length){
        wordIndex ++
      }else{
          wordIndex = 0
      }
    }, 3000)

    return(
      <Row type="flex" justif="start">
        <Col>
          <h1 style={{...defaultStyling}}>Programmering är &nbsp;</h1>
        </Col>
        <Col>
           {this.renderWord()}
        </Col>
        <Col>
          <h1 style={{...defaultStyling}}>! </h1>
        </Col>
      </Row>
    )
  }
}

export default FrontPageTitle
