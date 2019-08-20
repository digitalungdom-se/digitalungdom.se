import React from 'react'
import { Form, Icon, Row, Col, Select, Input, TextArea, Button, Option } from 'antd'

const formStyle = {
  marginBottom: 6
}

const colourList = [
  "#fcba03",
  "#5cc947",
  "#3091db",
  "#120d94",
  "#F0C1C9",
  "#ad300e",

]

class UserEditingForm extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      color: this.props.user.profile.color
    }
  }

  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  }

  componentWillMount(){
    this.setState({color: this.props.user.profile.color})
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

  handleColorChange = value => {
    console.log(value)
      this.props.form.setFieldsValue({
        color: value
      });
      this.setState({color: value})
   };

  render() {

    const { getFieldDecorator } = this.props.form;

    console.log(this.props.user)

    return (

      <Form
        onSubmit={this.handleSubmit}
      >

      <Form.Item style={formStyle}>
        {getFieldDecorator('status',
          {
            min: 3, max: 24, message: 'Din status måste vara mellan 3 och 24 karaktärer.'
          }
        )(
          <Input
          prefix={<Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder="Status - vad händer?"
          />
        )}
      </Form.Item>

        <Form.Item style={formStyle}>
          {getFieldDecorator('biography',
            {
              max: 200, message: 'Din bio får max vara 200 karaktärer.'
            }
          )(
            <Input.TextArea
              value="this.props.user.profile.bio"
              prefix={<Icon type="idcard" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Bio"
              autosize={{ minRows: 3, maxRows: 6 }}
            />
          )}
        </Form.Item>

        <Form.Item style={formStyle}>
          {getFieldDecorator('link')(
            <Input
            prefix={<Icon type="paper-clip" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="URL"
            />
          )}
        </Form.Item>

        <Form.Item style={formStyle}>
          {getFieldDecorator('email')(
            <Input
            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Email"
            />
          )}
        </Form.Item>

        <Row gutter={8}>
          <Col
            span={18}
          >
            <Form.Item>
              {getFieldDecorator('colour')(
                <Select
                  prefix={<Icon type="bg-colors" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="backgrundsfärg"
                  onChange={this.handleColorChange}
                >
                  <Select.Option value={colourList[0]}>{colourList[0]}</Select.Option>
                  <Select.Option value={colourList[1]}>{colourList[1]}</Select.Option>
                  <Select.Option value={colourList[2]}>{colourList[2]}</Select.Option>
                  <Select.Option value={colourList[3]}>{colourList[3]}</Select.Option>
                  <Select.Option value={colourList[4]}>{colourList[4]}</Select.Option>
                  <Select.Option value={colourList[5]}>{colourList[5]}</Select.Option>
                </Select>,
              )}
            </Form.Item>
          </Col>

          <Col span={6}>
            <div style={{width: "100%", height: 32, marginTop: 4, borderRadius: 4, backgroundColor: this.state.color}}/>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={12}>
            <Form.Item >
              <Button
                style={{width: '100%'}} type="primary" htmlType="submit"
                loading={this.props.registering}
              >
                Spara
              </Button>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item >
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

const WrappedUserEditingForm = Form.create({

  mapPropsToFields(props) {
    return {
      biography: Form.createFormField({
        value: props.user.profile.bio,
      }),
      link: Form.createFormField({
        value: props.user.profile.url,
      }),
      color: Form.createFormField({
        value: props.user.profile.color,
      }),
    };
  },
})(UserEditingForm);

export default WrappedUserEditingForm
