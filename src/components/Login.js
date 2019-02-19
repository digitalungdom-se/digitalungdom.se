import React from 'react'
import {
  Form, Input, Row, Col, Button, Icon, Alert
} from 'antd';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Login } from '../actions'

class LoginForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.login({username: values.username, password: values.password})
      }
    });
  }

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }

  render() {

    if(this.props.Auth.username) return <Redirect to='min-profil' />

    const { getFieldDecorator } = this.props.form;

    return (
      <Row type="flex" justify="center"
      >
        <Col
          xs= {{
            span: 18,
          }}
          sm={{
            span: 15
          }}
          md={{
            span: 12
          }}
          lg={{
            span: 7
          }}
        >
          <Form
            className="window"
            style={{ padding: 30 }} onSubmit={this.handleSubmit}
          >
	          <Row
              type="flex" justify="center"
            >
	          	<Col
	          	>
	          		<h1>Logga in</h1>
	        		</Col>
	          </Row>
            {this.props.Login.loggedIn === "fail" && <Alert message="Fel e-post/användarnamn eller lösenord" type="error" showIcon style={{marginBottom: 20}} />}
            <Form.Item
              validateStatus={this.props.Login.loggedIn === 'fail' ? 'error' : null}
              hasFeedback
            >
              {getFieldDecorator('username', {
                rules: [{
                  required: true, message: 'Fyll i din e-mail eller ditt användarnamn',
                }]
              })(
                <Input
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="E-mail eller användarnamn"
                />
              )}
            </Form.Item>
            <Form.Item
              validateStatus={this.props.Login.loggedIn === 'fail' ? 'error' : null}
              hasFeedback
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: 'Fyll i ditt lösenord',
                }, {
                  validator: this.validateToNextPassword,
                }]
              })(
                <Input
                type="password"
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}  />}
                placeholder="Lösenord"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button style={{width: '100%'}} type="primary" htmlType="submit"
              loading={this.props.Login.loggingIn}
              >
                Logga in
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

const mapStateToProps = state => {
  return {
    Login: {...state.Login},
    Auth: {...state.Auth}
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => dispatch(Login.login(credentials))
    // createInstance: instance => dispatch(Instances.createInstance(instance))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm)
