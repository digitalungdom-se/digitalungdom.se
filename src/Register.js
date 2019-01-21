import React from 'react'
import {
  Form, Input, InputNumber, Row, Col, Checkbox, Button
} from 'antd';
import { connect } from 'react-redux'
import { Auth } from './actions'

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
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

  validatePersonnummer = (rule, value, callback) => {
    callback()
    // let sum = 0
    // for(var i = 0; i < (value + '').length - 1; i++) {
    //   sum += (index % 2)*2*value[c]
    // }
    // let c = (sum + '').length
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  compareToFirstPassword = (rule, value, callback) => {
      const form = this.props.form;
      if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
      } else {
        callback();
      }
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
          span: 17,
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
            span: 12
          }}
        >
          <Form
            className="register"
            style={{ padding: 30 }} onSubmit={this.handleSubmit}
          >
            <Form.Item
              {...formItemLayout}
              label="E-mail"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Please input your E-mail!',
                }],
              })(
                <Input />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Password"
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Please input your password!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Confirm Password"
            >
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true, message: 'Please confirm your password!',
                }, {
                  validator: this.compareToFirstPassword,
                }],
              })(
                <Input type="password" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Personnummer"
            >
              {getFieldDecorator('personnummer', {
                rules: [{
                  required: true, message: 'Please input your personnummer!',
                }, {
                  validator: this.validatePersonnummer,
                }],
              })(
                <InputNumber type="personnummer" onBlur={this.handleConfirmBlur} />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              {getFieldDecorator('agreement', {
              		required: true, message: 'Please accept the TOS'
              	}, {
                	valuePropName: 'checked',
              })(
                <Checkbox>I have read the <a href="/">agreement</a></Checkbox>
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Register</Button>
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