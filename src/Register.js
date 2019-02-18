import React from 'react'
import {
  Form, Input, Row, Col, Button, DatePicker, Select
} from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Register } from './actions'
import GDPR from './GDPR.js'
import debounce from 'lodash/debounce'
// import { PasswordInput } from './PasswordStrength.js'

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
      const response = await this.props.check_username({username: value})
      if(response.username) {
        callback()
      } else {
        this.props.form.setFields({
          username: {
            value,
            errors: [new Error('Användarnamnet är taget')],
          },
        });
        callback('Användarnamnet är taget')
      }
    }
    else callback()
  }

  checkEmail = async (rule, value, callback) => {
    if(value.indexOf('@') !== -1) {
      const response = await this.props.check_email({email: value})
      if(response.email) {
        callback()
      } else {
        this.props.form.setFields({
          email: {
            value,
            errors: [new Error('En användare finns redan med den emailen')],
          },
        })
        callback('En användare finns redan med den emailen')
      }
    }
    callback()
  }

  TOS = (e) => {
    this.setState({
      acceptedTOS: e.target.checked
    })
  }

  render() {

    if(this.props.Auth.username) return <Redirect to='min-profil' />

    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        // xs: { span: 7, offset: 1 },
        sm: { span: 7, offset: 0 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 15},
      },
    };
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

    const validateStatusEmail = this.props.Register.checkingEmail ? {
      validateStatus: 'validating'
    } : {}
    let validateStatusUsername
    if(this.props.Register.username === false) validateStatusUsername = 'error'
    if(this.props.Register.checkingUsername) validateStatusUsername = 'validating'
    // const validateStatusUsername = this.props.Register.checkingUsername ? {
    //   validateStatus: 'validating'
    // } : (this.props.Register.username ? (this.props.Register.username && this.props.Register.username !== undefined ? {} : {validateStatus: 'error'}) : {validateStatus}

    return (
      <Row type="flex" justify="center"
      >
        <Col
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
        >
          <Form
            className="window"
            style={{ padding: 30 }} onSubmit={this.handleSubmit}
          >
            <Row>
              <Col
                {...tailFormItemLayout.wrapperCol}
              >
                <h1>Bli medlem</h1>
              </Col>
            </Row>
            <Form.Item
              {...formItemLayout}
              label="Namn"
            >
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
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Användarnamn"
              validateStatus={validateStatusUsername}
              // validateStatus={this.props.Register.checkingUsername !== undefined ? (this.props.Register.checkingUsername ? 'validating' : (this.props.Register.username && this.props.Register.checkingUsername !== undefined ? 'success' : 'error')) : undefined}
              // {...validateStatusUsername}
              required
              hasFeedback
            >
              {getFieldDecorator('username', {
                rules: [
                {
                  validator: this.checkUsername
                },
                {
                  min: 3, max: 24, message: 'Användarnamnet måste vara mellan 3 och 24 karaktärer'
                },
                {
                  pattern: /^(\w+)$/, message: 'Otillåtna karaktärer.'
                }
                ]
              })(
                <Input
                />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Födelsedatum"
            >
              {getFieldDecorator('birthdate', {
                rules: [{
                  required: true, message: 'Välj ditt födelsedatum'
                }],
              })(
                <DatePicker placeholder="ÅÅÅÅ-MM-DD" style={{width: '100%'}} />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="E-mail"
              {...validateStatusEmail}
              hasFeedback={true}
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'Ogiltig e-mail!',
                }, {
                  required: true, message: 'Fyll i din e-mail!',
                }, {
                  validator: this.checkEmail
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Kön"
            >
              {getFieldDecorator('gender', {
                rules: [{
                  required: true, message: 'Välj ett alternativ.',
                }],
              })(
                <Select>
                  <Select.Option value="0">Man</Select.Option>
                  <Select.Option value="1">Kvinna</Select.Option>
                  <Select.Option value="2">Annat</Select.Option>
                  <Select.Option value="3">Vill ej uppge</Select.Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Lösenord"
            >
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
                <Input type="password" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Bekräfta lösenord"
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Bekräfta ditt lösenord',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
                rules: [{
                  required: true, message: 'För att bli medlem behöver du acceptera Digital Ungdoms användarvillkor'
                }]
              	}, {
                	valuePropName: 'checked',
              })(
                <GDPR
                  onChange={this.TOS}
                />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
              style={{width: '100%'}} type="primary" htmlType="submit"
              disabled={!this.state.acceptedTOS}
              loading={this.props.Register.registering}
            >
              Bli medlem
            </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapDispatchToProps = (dispatch) => {
  console.log(Register)
  return {
    register: credentials => dispatch(Register.register(credentials)),
    check_username: username => dispatch(Register.check_username(username)),
    check_email: email => dispatch(Register.check_email(email)),
  }
}

const mapStateToProps = (state) => {
  return {
    Register: {...state.Register},
    Auth: {...state.Auth}
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm)

// export default WrappedRegistrationForm