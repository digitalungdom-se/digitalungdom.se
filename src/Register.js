import React from 'react'
import {
  Form, Input, InputNumber, Row, Col, Checkbox, Button, DatePicker
} from 'antd';
import { connect } from 'react-redux'
import { Auth } from './actions'
import Address from './Address.js'
import GDPR from './GDPR.js'

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    acceptedTOS: false
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        console.log({username: values.email, password: values.password})
        this.props.login({username: values.email, password: values.password})
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

  TOS = (e) => {
    this.setState({
      acceptedTOS: e.target.checked
    })
  }

  render() {
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
              {getFieldDecorator('Namn', {
                rules: [{
                  required: true, message: 'Fyll i ditt namn', whitespace: true,
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Användarnamn"
            >
              {getFieldDecorator('Username', {
                rules: [{
                  required: true, message: 'Fyll i ditt användarnamn', whitespace: true,
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Födelsedatum"
            >
              {getFieldDecorator('Birthdate', {
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
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'Ogiltig e-mail!',
                }, {
                  required: true, message: 'Fyll i din e-mail!',
                }],
              })(
                <Input />
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
              <Button style={{width: '100%'}} type="primary" htmlType="submit" disabled={!this.state.acceptedTOS} >Bli medlem</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(Auth.login(credentials))
    // createInstance: instance => dispatch(Instances.createInstance(instance))
  }
}

export default connect(null, mapDispatchToProps)(WrappedRegistrationForm)

// export default WrappedRegistrationForm