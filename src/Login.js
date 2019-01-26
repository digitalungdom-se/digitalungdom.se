import React from 'react'
import {
  Form, Input, InputNumber, Row, Col, Checkbox, Button
} from 'antd';
import { connect } from 'react-redux'
import { Auth } from './actions'
import Address from './Address.js'

class LoginForm extends React.Component {
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

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
	          		<h1>Logga in</h1>
	        		</Col>
	          </Row>
            <Form.Item
              {...formItemLayout}
              label="E-mail/användarnamn"
            >
              {getFieldDecorator('email', {
                rules: [{
                  type: 'email', message: 'The input is not valid E-mail!',
                }, {
                  required: true, message: 'Fyll i din e-mail eller ditt användarnamn',
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
                  required: true, message: 'Fyll i ditt lösenord',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="password" />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button style={{width: '100%'}} type="primary" htmlType="submit">Logga in</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(Auth.login(credentials))
    // createInstance: instance => dispatch(Instances.createInstance(instance))
  }
}

export default connect(null, mapDispatchToProps)(WrappedLoginForm)