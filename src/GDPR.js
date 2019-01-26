import React, { Component } from 'react'
import { Modal, Button, Checkbox } from 'antd'

class GDPR extends Component {
  state = {
    loading: false,
    visible: false,
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({ loading: false, visible: false });
  }

  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <Checkbox style={{fontSize: '0.9em'}} onChange={this.props.onChange}>Jag accepterar Digital Ungdoms användarvillkor. <a onClick={this.showModal}>Läs mer.</a></Checkbox>
        <Modal
          visible={visible}
          title="Digital Ungdoms användarvillkor"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Stäng
            </Button>,
          ]}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default GDPR
