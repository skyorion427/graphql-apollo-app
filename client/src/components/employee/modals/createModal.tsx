import React from 'react';
import { compose } from 'react-apollo';
import { Modal, Form, Input, InputNumber, Select, Button, Steps } from 'antd';

import { withBankData } from '../../../graphql/bank';
import {
  Employee as EmployeeType,
  Bank as BankType,
  CreateEmployeeInput,
} from '../../../graphql/types';
import '../employee.css';

interface Props {
  data: any;
  visible: boolean;
  onOk: (employee: CreateEmployeeInput) => void;
  onCancel: () => void;
}

interface State {
  curStep: number;
  name: string;
  number: number;
  accountHolder: string;
  accountType?: string | null;
  accountNumber: number;
  bank?: number;
}

class CreateModal extends React.Component<Props, State> {
  state = {
    curStep: 0,
    name: '',
    number: 0,
    accountHolder: '',
    accountType: 'Saving',
    accountNumber: 0,
    bank: 0,
  };

  handleChange = (name: keyof State) => (event: any) => {
    this.setState({
      [name]: event.target.value,
    } as Pick<State, keyof State>);
  };

  handleChangeValue = (name: keyof State) => (value: any) => {
    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  handleSave = () => {
    const {
      data: { banks },
    } = this.props;
    const {
      name,
      number,
      accountHolder,
      accountType,
      accountNumber,
      bank,
    } = this.state;

    const newItem = {
      name,
      number,
      accountHolder,
      accountType,
      accountNumber,
      bank: banks[bank]._id,
    };

    this.props.onOk(newItem);
  };

  handleClose = () => {
    this.props.onCancel();
  };

  handleNext = () => {
    if (this.state.curStep === 3) {
      this.handleSave();
    } else {
      this.setState(prevState => ({
        curStep: prevState.curStep + 1,
      }));
    }
  };

  renderView = () => {
    if (this.state.curStep === 0) {
      const {
        data: { banks },
      } = this.props;

      return (
        <div className="bank-input-view">
          <Form>
            <Form.Item className="form-element" label="Bank: ">
              <Select
                value={this.state.bank}
                onChange={this.handleChangeValue('bank')}
              >
                <Select.Option value="">Select Bank</Select.Option>
                {banks &&
                  banks.map((bank: BankType, index: number) => {
                    return (
                      <Select.Option value={index} key={bank._id}>
                        {bank.name} / {bank.branchName}
                      </Select.Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </Form>
        </div>
      );
    } else if (this.state.curStep === 1) {
      return (
        <div className="account-input-view">
          <Form>
            <Form.Item className="form-element" label="Account Holder's Name: ">
              <Input
                value={this.state.accountHolder}
                onChange={this.handleChange('accountHolder')}
                placeholder="Input account holder's name"
              />
            </Form.Item>
            <Form.Item className="form-element" label="Account Number: ">
              <InputNumber
                value={this.state.accountNumber}
                onChange={this.handleChangeValue('accountNumber')}
                placeholder="Input account number"
              />
            </Form.Item>
            <Form.Item className="form-element" label="Account Type: ">
              <Select
                value={this.state.accountType || 'Saving'}
                onChange={this.handleChangeValue('accountType')}
              >
                <Select.Option value="Saving">Saving</Select.Option>
                <Select.Option value="Checking">Checking</Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      );
    } else if (this.state.curStep === 2) {
      return (
        <div className="employee-input-view">
          <Form>
            <Form.Item className="form-element" label="Employee Name: ">
              <Input
                value={this.state.name}
                onChange={this.handleChange('name')}
                placeholder="Input employee name"
              />
            </Form.Item>
            <Form.Item className="form-element" label="Employee Number: ">
              <InputNumber
                value={this.state.number}
                onChange={this.handleChangeValue('number')}
                placeholder="Input employee  number"
              />
            </Form.Item>
          </Form>
        </div>
      );
    } else {
      const {
        data: { banks },
      } = this.props;
      const { bank } = this.state;
      const bankData = banks[bank];

      return (
        <div className="preview-view">
          <div className="preview-field">
            <span className="field-text">Bank Name:&nbsp;</span>
            <span className="value-text">{bankData.name || ''}</span>
          </div>
          <div className="preview-field">
            <span className="field-text">Branch Name:&nbsp;</span>
            <span className="value-text">{bankData.branchName || ''}</span>
          </div>
          <div className="preview-field">
            <span className="field-text">Account Holder:&nbsp;</span>
            <span className="value-text">{this.state.accountHolder}</span>
          </div>
          <div className="preview-field">
            <span className="field-text">Account Number:&nbsp;</span>
            <span className="value-text">{this.state.accountNumber}</span>
          </div>
          <div className="preview-field">
            <span className="field-text">Account Type:&nbsp;</span>
            <span className="value-text">{this.state.accountType}</span>
          </div>
          <div className="preview-field">
            <span className="field-text">Employee Name:&nbsp;</span>
            <span className="value-text">{this.state.name}</span>
          </div>
          <div className="preview-field">
            <span className="field-text">Employee Number:&nbsp;</span>
            <span className="value-text">{this.state.number}</span>
          </div>
        </div>
      );
    }
  };

  render() {
    const { visible } = this.props;
    const btnText = this.state.curStep === 3 ? 'Save' : 'Next';

    return (
      <Modal
        className="modal-create"
        title="Edit Bank Information"
        visible={visible}
        onOk={this.handleSave}
        onCancel={this.handleClose}
        footer={[
          <Button key="next" type="primary" onClick={this.handleNext}>
            {btnText}
          </Button>,
          <Button key="cancel" onClick={this.handleClose}>
            Cancel
          </Button>,
        ]}
      >
        <Steps current={this.state.curStep}>
          <Steps.Step title="Bank" />
          <Steps.Step title="Account" />
          <Steps.Step title="Employee" />
          <Steps.Step title="Confirm" />
        </Steps>
        <div className="content">{this.renderView()}</div>
      </Modal>
    );
  }
}

export default compose(withBankData)(CreateModal);
