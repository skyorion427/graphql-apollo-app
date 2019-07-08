import React from 'react';
import { Modal, Form, Input, InputNumber, Select, Button } from 'antd';

import {
  Employee as EmployeeType,
  UpdateEmployeeInput,
} from '../../../graphql/types';

interface ModalProps {
  visible: boolean;
  item: EmployeeType;
  onOk: (_id: string, item: UpdateEmployeeInput) => void;
  onCancel: () => void;
}

interface ModalState {
  name: string;
  number: number;
  accountHolder: string;
  accountType?: string | null;
  accountNumber: number;
}

class EditModal extends React.Component<ModalProps, ModalState> {
  state = {
    name: '',
    number: 0,
    accountHolder: '',
    accountType: '',
    accountNumber: 0,
  };

  componentDidUpdate(prevProps: ModalProps) {
    if (prevProps.item !== this.props.item) {
      const {
        name,
        number,
        accountHolder,
        accountType,
        accountNumber,
      } = this.props.item;

      this.setState({
        name,
        number,
        accountHolder,
        accountType,
        accountNumber,
      });
    }
  }

  handleChange = (name: keyof ModalState) => (event: any) => {
    this.setState({
      [name]: event.target.value,
    } as Pick<ModalState, keyof ModalState>);
  };

  handleChangeValue = (name: keyof ModalState) => (value: any) => {
    this.setState({
      [name]: value,
    } as Pick<ModalState, keyof ModalState>);
  };

  handleSave = () => {
    const {
      name,
      number,
      accountHolder,
      accountType,
      accountNumber,
    } = this.state;
    const newItem = {
      name,
      number,
      accountHolder,
      accountType,
      accountNumber,
    };

    this.props.onOk(this.props.item._id, newItem);
  };

  handleClose = () => {
    this.props.onCancel();
  };

  render() {
    const { visible, item } = this.props;
    const { name, number, accountHolder, accountType, accountNumber } = item;

    return (
      <Modal
        title="Edit Employee Information"
        visible={visible}
        onOk={this.handleSave}
        onCancel={this.handleClose}
      >
        <Form layout="inline">
          <Form.Item label="Name: ">
            <Input
              defaultValue={name}
              onChange={this.handleChange('name')}
              placeholder="input name"
            />
          </Form.Item>
          <Form.Item label="Number: ">
            <InputNumber
              defaultValue={number}
              onChange={this.handleChangeValue('number')}
              placeholder="input number"
            />
          </Form.Item>
          <Form.Item label="Account Holder: ">
            <Input
              defaultValue={accountHolder}
              onChange={this.handleChange('accountHolder')}
              placeholder="input account holder"
            />
          </Form.Item>
          <Form.Item label="Account Type: ">
            <Select
              defaultValue={accountType || 'Saving'}
              onChange={this.handleChangeValue('accountType')}
            >
              <Select.Option value="Saving">Saving</Select.Option>
              <Select.Option value="Checking">Checking</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Account Number: ">
            <InputNumber
              defaultValue={accountNumber}
              onChange={this.handleChangeValue('accountNumber')}
              placeholder="input account number"
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default EditModal;
