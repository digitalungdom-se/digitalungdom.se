import React, { useState } from "react"
import {Row, Col, Button, Form, Input, Icon} from 'antd';
import { Link } from 'react-router-dom'
import Card from "@components/Card"

function renderButton( resettingPassword ){
  switch (resettingPassword) {
    case "requesting":
      return(
        <Button
        style={{width: '100%', marginBottom: 0}}
        type="primary"
        loading={true}/>
      )
      default:
        return(
          <Button
          style={{width: '100%', marginBottom: 0}}
          type="primary"
          htmlType="submit">
            Byt lösenord
          </Button>
        )
  }
}

function ResetPassword({ form, dispatchResetPassword, resettingPassword, token }) {

  const [ confirmDirty, changeDirty ] = useState(false)
  const { getFieldDecorator } = form

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  const compareToFirstPassword = (rule, value, callback) => {
    changeDirty(true);
    if (value && value !== form.getFieldValue('password')) {
      callback('Lösenorden stämmer inte överrens!');
    } else {
      callback();
    }
  }

	return (
		<Row
      type="flex"
      justify="center"
      style={{flex:1}}
		>
			<Col
				xs={{span: 22}}
				sm={{span: 14}}
				md={{span: 12}}
				lg={{span: 8}}
				xl={{span: 6}}
			>
        <Card
          style={{
            marginTop: 24,
            width: "100%",
          }}
          title="Återställ lösenord"
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault()
              form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                  dispatchResetPassword({
                      token,
                      password: values.password
                  })
                }
              })
            }}
          >
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{
                  required: true,
                  message: "Detta fält är obligatoriskt."
                  }, {
                    validator: validateToNextPassword,
                  }, {
                    pattern: /((.*[a-öA-Ö])(.*[0-9]))|((.*[0-9])(.*[a-öA-Ö]))/,
                    message: 'Lösenordet måste innehålla både bokstäver och siffror'
                  }, {
                    min: 8, max: 72,
                    message: 'Lösenordet måste vara mellan 8 och 72 karaktärer'
                  }],
              })(
                <Input
                  type="password"
                  placeholder="Nytt lösenord"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('confirm', {
                rules: [{
                  required: true,
                  message: "Detta fält är obligatoriskt."
                }, {
                  validator: compareToFirstPassword,
                }]
              })(
                <Input
                  type="password"
                  placeholder="Återupprepa nytt lösenord"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                />
              )}
            </Form.Item>

            <Form.Item style={{marginBottom: 2}}>

            {
              resettingPassword?
              null
              :
              (
                <p style={{color: "red", margin: 0, padding: 0}}>
                  Något gick fel, försök igen senare.
                </p>
              )
            }

            {renderButton(resettingPassword)}

            </Form.Item>
          </Form>
        </Card>
			</Col>
		</Row>
	)
}

export default Form.create()(ResetPassword)
