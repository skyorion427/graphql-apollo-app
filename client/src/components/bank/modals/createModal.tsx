import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

import { CreateBankInput } from '../../../graphql/types';

interface Props {
  visible: boolean;
  onOk: (item: CreateBankInput) => void;
  onCancel: () => void;
}

interface State {
  name: string;
  branchName: string;
}

class CreateModal extends React.Component<Props, State> {
  state = {
    name: '',
    branchName: '',
  };

  handleChangeName = (event: any) => {
    this.setState({
      name: event.target.value,
    });
  };

  handleChangeBranch = (event: any) => {
    this.setState({
      branchName: event.target.value,
    });
  };

  handleSave = () => {
    const newItem = {
      name: this.state.name,
      branchName: this.state.branchName,
    };

    this.props.onOk(newItem);
  };

  handleClose = () => {
    this.props.onCancel();
  };

  render() {
    const { visible } = this.props;

    return (
      <Modal
        title="Create Bank Information"
        visible={visible}
        okText="Create"
        onOk={this.handleSave}
        onCancel={this.handleClose}
      >
        <Form layout="horizontal">
          <Form.Item label="Bank Name: ">
            <Input
              value={this.state.name}
              onChange={this.handleChangeName}
              placeholder="input bank name"
            />
          </Form.Item>
          <Form.Item label="Branch: ">
            <Input
              value={this.state.branchName}
              onChange={this.handleChangeBranch}
              placeholder="input branch"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default CreateModal;
