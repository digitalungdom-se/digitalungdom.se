import React from 'react'
import { Form, Icon, Row, Col, Select, Input, TextArea, Button, Option, Popover } from 'antd'
import { SketchPicker } from 'react-color'

const formStyle = {
  marginBottom: 6
}

class UserEditingForm extends React.Component {

  constructor( props ) {
    super( props )
    this.state = {
      displayColorPicker: false,
      confirmDirty: false,
      autoCompleteResult: [],
    }
  }

  componentWillMount() {
    this.setState( { colour: this.props.user.profile.colour } )
  }

  handleSubmit = ( e ) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll( ( err, values ) => {
      if ( !err ) {
        //Parse object to array type
        let userProfile = []
        const update = values.profile

        Object.keys( update ).forEach( ( item, index ) => {
          if ( this.props.user.profile[ item ] !== update[ item ] ) {
            userProfile.push( [ `profile.${item}`, {
              [ item ]: update[ item ]
            } ] )
          }
        } );

        console.log( userProfile )
        if ( userProfile.length > 0 ) {
          this.props.edit( {
            updates: userProfile
          } )
        }

        this.props.submit()
      } else {
        console.log( err )
      }
    } );
  }

  checkColorBrightness = c => {
    var c = c.substring( 1 ); // strip #
    var rgb = parseInt( c, 16 ); // convert rrggbb to decimal
    var r = ( rgb >> 16 ) & 0xff; // extract red
    var g = ( rgb >> 8 ) & 0xff; // extract green
    var b = ( rgb >> 0 ) & 0xff; // extract blue

    var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709

    if ( luma < 40 ) {
      console.log( "no" )
      return false
    }

  }

  handlecolourChange = value => {
    this.props.setUserColour( value.hex )
    this.props.form.setFieldsValue( { 'profile.colour': value.hex } )
  }

  handleClick = () => {
    this.setState( { displayColorPicker: !this.state.displayColorPicker } )
  }

  handleClose = () => {
    this.setState( { displayColorPicker: false } )
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (

      <Form
        onSubmit={this.handleSubmit}
      >

      <Form.Item style={formStyle}>
        {getFieldDecorator('profile.status', {
          rules:[{
            max: 24, message: 'Din status får max vara 24 karaktärer.'
          }]
        })(
          <Input
          prefix={<Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Status - vad händer?"
          />
        )}
      </Form.Item>

      <Form.Item style={formStyle}>
        {getFieldDecorator('profile.url')(
          <Input
          prefix={<Icon type="paper-clip" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="URL"
          />
        )}
      </Form.Item>

        <Form.Item style={formStyle}>
          {getFieldDecorator('profile.bio',{
            rules:[{
              max: 200, message: 'Din bio får max vara 200 karaktärer.'
            }]
          })(
            <Input.TextArea
              value="this.props.user.profile.bio"
              placeholder="Bio"
              autosize={{ minRows: 3, maxRows: 6 }}
            />
          )}
        </Form.Item>

        <Row gutter={8}>
          <Col
            span={4}
          >
            <Icon
              type="bg-colors"
              style={{ marginLeft: 12, color: 'rgba(0,0,0,.25)' }}
            />
          </Col>

          <Col
            span={20}
          >
            <Form.Item>
              {getFieldDecorator('profile.colour')(
                <div style={{}}>
                    <div
                      style={{height:"20px",borderRadius: '2px',background: this.props.form.getFieldValue('profile.colour') }}
                      onClick={ this.handleClick }
                      />
                  { this.state.displayColorPicker ? <div style={{position: 'absolute',zIndex: '2'}}>
                  <div
                    style={{position: 'fixed',top: '0px',right: '0px',bottom: '0px',left: '0px'}}
                    onClick={ this.handleClose }
                    />
                  <SketchPicker
                    color={ this.props.form.getFieldValue('profile.colour') }
                    onChange={ this.handlecolourChange }
                    disableAlpha={ true }
                    presetColors={[]}
                    />
                </div> : null }
              </div>
              )}
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={12}>
            <Form.Item style={{marginBottom: 0}}>
              <Button
                style={{width: '100%'}} type="primary" htmlType="submit"
                onClick={this.handleSubmit}
              >
                Spara
              </Button>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item style={{marginBottom: 0}}>
              <Button
      					ghost
      					onClick={this.props.cancel}
      				  style={{color: "rgba(0,0,0,0.5)", width: '100%', border: "1px solid rgba(0,0,0,0.2)"}}
      				>
      					Avbryt
      				</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    )
  }
}

const WrappedUserEditingForm = Form.create( {

  mapPropsToFields( props ) {
    return {
      'profile.status': Form.createFormField( {
        value: props.user.profile.status,
      } ),
      'profile.url': Form.createFormField( {
        value: props.user.profile.url,
      } ),
      'profile.bio': Form.createFormField( {
        value: props.user.profile.bio
      } ),
      'profile.colour': Form.createFormField( {
        value: props.user.profile.colour ? props.user.profile.colour : '#83aef2'
      } ),
    };
  },
} )( UserEditingForm );

export default WrappedUserEditingForm
