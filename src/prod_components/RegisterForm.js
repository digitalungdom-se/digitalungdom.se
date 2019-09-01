import React from 'react'
import {
  Form, Icon, Input, Row, Col, Button, DatePicker, Select
} from 'antd';
import { Redirect, Link } from 'react-router-dom'
import GDPR from './GDPR.js'
import debounce from 'lodash/debounce'
import Card from '@components/Card'

class RegistrationForm extends React.Component {

  constructor(props) {
    super(props)
    this.checkUsername = debounce(this.checkUsername, 300)
    this.checkEmail = debounce(this.checkEmail, 1500)
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    acceptedTOS: false
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.register({
          ...values,
          birthdate: values.birthdate.format('YYYY-MM-DD')
        })
      }
    });
  }

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Lösenorden stämmer inte överrens!');
    } else {
      callback();
    }
  }

  checkUsername = async (rule, value, callback) => {
    if(value.length > 2 && value.length < 25) {
      const response = await this.props.checkUsername(value)
      if(this.props.usernameAvailable === false) {
        this.props.form.setFields({
          username: {
            value,
            errors: [new Error('Användarnamnet är taget')],
          },
        })
      }
    //   // if(response.username) {
    //   //   callback()
    //   // } else {
    //   //   callback('Användarnamnet är taget')
    //   // }
    }
    else callback()
    // else callback()
  }

  checkEmail = async (rule, value, callback) => {
    if(value.indexOf('@') !== -1) {
      const response = await this.props.checkEmail(value)
      if(this.props.emailAvailable === false) {
        this.props.form.setFields({
          email: {
            value,
            errors: [new Error('Det finns redan en medlem med den e-posten.')],
          },
        })
      }
      // const response = await this.checkEmail({email: value})
      // if(response.email) {
      //   callback()
      // } else {
      //   this.props.form.setFields({
      //     email: {
      //       value,
      //       errors: [new Error('En användare finns redan med den emailen')],
      //     },
      //   })
      //   callback('En användare finns redan med den emailen')
      // }
    }
    callback()
  }

  TOS = (e) => {
    this.setState({
      acceptedTOS: e.target.checked
    })
  }

  render() {

    if(this.props.username) return <Redirect to='min-profil' />

    const { getFieldDecorator } = this.props.form;

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 10,
          offset: 0,
        },
        sm: {
          span: 15,
          offset: 7,
        },
      },
    };

    const validateStatusEmail = this.props.checkingEmail ? {
      validateStatus: 'validating'
    } : {}
    let validateStatusUsername
    if(this.props.usernameAvailable === false) validateStatusUsername = 'error'
    if(this.props.usernameAvailable === true) validateStatusUsername = 'success'
    if(this.props.checkingUsername) validateStatusUsername = 'validating'
    // const validateStatusUsername = this.props.Register.checkingUsername ? {
    //   validateStatus: 'validating'
    // } : (this.props.Register.username ? (this.props.Register.username && this.props.Register.username !== undefined ? {} : {validateStatus: 'error'}) : {validateStatus}

    return (
      <Row type="flex" justify="center" style={{flex:1}}
      >
        <Col
          // style ={{backgroundColor: 'white', width: 520, paddingLeft: 40, paddingRight: 40, marginTop: 30, marginBottom: 100, borderRadius: 10, border:'1px solid rgba(0,0,0,0.1)'}}
          xs= {{
            span: 24,
          }}
          sm={{
            span: 20
          }}
          md={{
            span: 15
          }}
          lg={{
            span: 11
          }}
          xl={{
            span: 8
          }}
          style={{
            maxWidth: 520
          }}
        >
          <Card
            title="Bli medlem"
            style={{
              marginTop: 24
            }}
          >
            <Form
              className="window"
              // style={{ padding: "30px 30px 0 30px " }}
              onSubmit={this.handleSubmit}
            >

              <Form.Item>
                {getFieldDecorator('name', {
                  rules: [{
                    required: true, message: 'Fyll i ditt namn', whitespace: true,
                  },
                  {
                    pattern:/^((.+)\s)((.+)\s*){1,}$/, message: 'Du måste uppge för- och efternamn.'
                  },
                  {
                    pattern: /^(([A-Za-zÀ-ÖØ-öø-ÿ\-\'\,\.\ ]+))$/, message: 'Otillåtna karaktärer.'
                  }],
                })(
                  <Input
                  prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Namn"
                  />
                )}
              </Form.Item>

              <Form.Item
                validateStatus={
                  this.props.checkingUsername !== undefined ?
                    this.props.checkingUsername === true ? 
                      "validating"
                      :
                      (
                        this.props.usernameAvailable === true ?
                        "success"
                        :
                        "error"
                      )
                    :
                    null
                }
                // help={this.props.usernameAvailable === false && "Användarnamnet är taget"}
                required
                hasFeedback
              >
                {getFieldDecorator('username', {
                  rules: [
                  {
                    validator: this.checkUsername
                  },
                  {
                    min: 3, max: 24, message: 'Användarnamnet måste vara mellan 3 och 24 karaktärer.'
                  },
                  {
                    pattern: /^(\w+)$/, message: 'Otillåtna karaktärer.'
                  }
                  ]
                })(
                  <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Användarnamn"
                  />
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('birthdate', {
                  rules: [{
                    required: true, message: 'Välj ditt födelsedatum.'
                  }],
                })(
                  <DatePicker showToday={false} placeholder="Födelsedatum (ÅÅÅÅ-MM-DD)" style={{width: '100%'}} />
                )}
              </Form.Item>

              <Form.Item
                validateStatus={
                  this.props.checkingEmail !== undefined ?
                    this.props.checkingEmail === true ? 
                      "validating"
                      :
                      (
                        this.props.emailAvailable === true ?
                        "success"
                        :
                        "error"
                      )
                    :
                    null
                }
                hasFeedback
              >
                {getFieldDecorator('email', {
                  rules: [{
                    type: 'email', message: 'Ogiltig e-mail!',
                  }, {
                    required: true, message: 'Fyll i din e-mail',
                  }, {
                    validator: this.checkEmail
                  }],
                })(
                  <Input
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="E-mail"
                  />
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('gender', {
                  rules: [{
                    required: true, message: 'Välj ett alternativ.',
                  }],
                })(
                  <Select
                  placeholder="Kön"
                  >
                    <Select.Option value="0">Man</Select.Option>
                    <Select.Option value="1">Kvinna</Select.Option>
                    <Select.Option value="2">Annat</Select.Option>
                    <Select.Option value="3">Vill ej uppge</Select.Option>
                  </Select>
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{
                    required: true, message: 'Välj ett lösenord!',
                  }, {
                    validator: this.validateToNextPassword,
                  }, {
                    pattern: /((.*[a-öA-Ö])(.*[0-9]))|((.*[0-9])(.*[a-öA-Ö]))/, message: 'Lösenordet måste innehålla både bokstäver och siffror.'
                  }, {
                    min: 8, max: 72, message: 'Lösenordet måste vara mellan 8 och 72 karaktärer.'
                  }],
                })(
                  <Input
                  type="password"
                  placeholder="Lösenord"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                )}
              </Form.Item>

              <Form.Item style={{marginBottom: 14}}>
                {getFieldDecorator('confirm', {
                  rules: [{
                    required: true, message: 'Bekräfta ditt lösenord',
                  }, {
                    validator: this.compareToFirstPassword,
                  }],
                })(
                  <Input
                  type="password"
                  placeholder="Bekräfta lösenord"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  onBlur={this.handleConfirmBlur} />
                )}
              </Form.Item>

              <Form.Item style={{marginBottom: 14}}>
                {getFieldDecorator('agreement', {
                  rules: [{
                    required: true, message: 'För att bli medlem behöver du acceptera Digital Ungdoms användarvillkor.'
                  }]
                	}, {
                  	valuePropName: 'checked',
                })(
                  <GDPR
                    onChange={this.TOS}
                  />
                )}
              </Form.Item>

              <Form.Item>
                <Button
                style={{width: '100%'}} type="primary" htmlType="submit"
                disabled={!this.state.acceptedTOS}
                loading={this.props.registering}
                >
                  Bli medlem
                </Button>
              </Form.Item>

              <Row>
                <Col>
                  <div>
                    Har du redan ett konto?
                    <Link style={{marginBottom: 10}} to="/login"> Logga in.</Link>
                  </div>
                </Col>
              </Row>

            </Form>
          </Card>
        </Col>
      </Row>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

export default WrappedRegistrationForm
