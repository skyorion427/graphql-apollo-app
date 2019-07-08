import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

import { Bank, UpdateBankInput } from '../../../graphql/types';

interface ModalProps {
  visible: boolean;
  item: Bank;
  onOk: (_id: string, item: UpdateBankInput) => void;
  onCancel: () => void;
}

interface ModalState {
  name: string;
  branchName: string;
}

class EditModal extends React.Component<ModalProps, ModalState> {
  state = {
    name: '',
    branchName: '',
  };

  componentDidUpdate(prevProps: ModalProps) {
    if (prevProps.item !== this.props.item) {
      this.setState({
        name: this.props.item.name,
        branchName: this.props.item.branchName,
      })
    }
  }

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

    this.props.onOk(this.props.item._id, newItem);
  };

  handleClose = () => {
    this.props.onCancel();
  };

  render() {
    const { visible, item } = this.props;
    const { _id, name, branchName } = item;

    return (
      <Modal
        title="Edit Bank Information"
        visible={visible}
        okText="Save"
        onOk={this.handleSave}
        onCancel={this.handleClose}
      >
        <Form layout="horizontal">
          <Form.Item label="Bank Name: ">
            <Input
              defaultValue={name}
              onChange={this.handleChangeName}
              placeholder="input bank name"
            />
          </Form.Item>
          <Form.Item label="Branch: ">
            <Input
              defaultValue={branchName}
              onChange={this.handleChangeBranch}
              placeholder="input branch"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default EditModal;
