import React from "react"
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Row, Col, Button, notification } from 'antd';
import Card from '@components/Card'

function ForgotPassword({ form, sendForgottonPasswordMail, forgotPasswordEmailSent}){
  const { getFieldDecorator } = form

  const openNotification = (title, icon) => {
    notification.open({
      message: title,
      icon,
    });
  };

  //If the email responsable for resetting email has been sent, show notification
  if(forgotPasswordEmailSent === true){
    openNotification('Återställnings-email skickat!', <Icon type="check-circle" style={{ color: 'green' }} />)
  }

  if(forgotPasswordEmailSent === false){
    openNotification('Något gick fel, försök igen senare.', <Icon type="stop" style={{ color: 'red' }} />)
  }

  return(
    <Row
      type="flex"
      justify="center"
    >
      <Card
        style={{
          marginTop: 24,
          width: "100%",
          maxWidth: 400,
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

          <Form.Item style={{marginBottom: 0}}>
            <Button
            style={{width: '100%'}}
            type="primary"
            htmlType="submit">
              Skicka
            </Button>
          </Form.Item>
          <Link to="/logga-in" style={{fontSize: 12, marginTop: 4}}>
            Tillbaka till inloggning
          </Link>
        </Form>
      </Card>
    </Row>
  )
}

export default Form.create()(ForgotPassword)
