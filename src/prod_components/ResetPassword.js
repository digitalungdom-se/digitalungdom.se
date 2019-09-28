import React from "react"
import { Link } from 'react-router-dom'
import {
  Form, Icon, Input, Row, Col, Button,
} from 'antd';
import Card from '@components/Card'

function ResetPassword({ form, sendForgottonPasswordMail, backToLogin }){
  const { getFieldDecorator } = form

  return(
    <Row
      type="flex"
      justify="center"
    >
      <Card
        style={{
          marginTop: 24,
          width: "100%",
          maxWidth: 400
        }}
        title="Återställ lösenord"
      >
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            form.validateFieldsAndScroll((err, values) => {
              if (!err) {
                sendForgottonPasswordMail({
                  email: values.email,
                })
              }
            })
          }}
        >
          <p style={{marginTop: -8, marginBottom: 30}}>
            Ange in din email nedanför så skickar vi ett mail till dig som du kan återställa ditt lösenord med!😊
          </p>
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{
                required: true,
                message: "Ange ditt email."
              }]
            })(
              <Input
                placeholder={"Email"}
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              />
            )}
          </Form.Item>

          <Form.Item>
            <Button
            style={{width: '100%'}}
            type="primary"
            htmlType="submit">
              Skicka
            </Button>
          </Form.Item>

          <Row>
            <Col>
              <a onClick = {backToLogin}>
                Tillbaka till inloggning
              </a>
            </Col>
          </Row>
        </Form>
      </Card>
    </Row>
  )
}

export default Form.create()(ResetPassword)
