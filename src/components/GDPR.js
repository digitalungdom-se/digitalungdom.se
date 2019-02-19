import React, { Component } from 'react'
import { Modal, Button, Checkbox } from 'antd'

import 'resources/stadgar.pdf'

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
        <Checkbox
        style={{fontSize: '0.9em'}}
        onChange={this.props.onChange}
      >
        Genom att bli medlem accepterar du Digital Ungdoms användarvillkor.
        <a href="#gdpr" onClick={this.showModal}>Läs mer.</a>
      </Checkbox>
        <Modal
          visible={visible}
          title="Digital Ungdoms användarvillkor"
          onOk={this.handleOk}
          onCancel={this.handleOk}
          footer={[
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Stäng
            </Button>,
          ]}
        >
          <p>Genom att godkänna Digital Ungdoms användarvillkor accepterar du att Digital Ungdom lagrar den information du anger på hemsidan.</p>
          <p>Du godkänner även att du kommer att följa förenings stadgar, som du kan läsa <a target="_blank" rel="noopener noreferrer" href="stadgar.pdf">här</a>.</p>
        </Modal>
      </div>
    );
  }
}

export default GDPR
