import React from 'react';
import { compose } from 'react-apollo';
import { Modal, Form, Input, InputNumber, Select, Button, Steps } from 'antd';

import { withBankData } from '../../../graphql/bank';
import {
  Employee as EmployeeType,
  Bank as BankType,
  CreateEmployeeInput,
} from '../../../graphql/types';
import IntlMessage from '../../intlMessage';
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
            <Form.Item
              className="form-element"
              label={<IntlMessage id="employee.modal.step.bank" />}
            >
              <Select
                value={this.state.bank}
                onChange={this.handleChangeValue('bank')}
              >
                <Select.Option value="">
                  <IntlMessage id="employee.modal.step.bank.placeholder" />
                </Select.Option>
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
            <Form.Item
              className="form-element"
              label={<IntlMessage id="employee.modal.step.account.holder" />}
            >
              <Input
                value={this.state.accountHolder}
                onChange={this.handleChange('accountHolder')}
                placeholder="Input account holder's name"
              />
            </Form.Item>
            <Form.Item
              className="form-element"
              label={<IntlMessage id="employee.modal.step.account.number" />}
            >
              <InputNumber
                value={this.state.accountNumber}
                onChange={this.handleChangeValue('accountNumber')}
                placeholder="Input account number"
              />
            </Form.Item>
            <Form.Item
              className="form-element"
              label={<IntlMessage id="employee.modal.step.account.type" />}
            >
              <Select
                value={this.state.accountType || 'Saving'}
                onChange={this.handleChangeValue('accountType')}
              >
                <Select.Option value="Saving">
                  <IntlMessage id="employee.modal.step.account.type.saving" />
                </Select.Option>
                <Select.Option value="Checking">
                  <IntlMessage id="employee.modal.step.account.type.checking" />
                </Select.Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      );
    } else if (this.state.curStep === 2) {
      return (
        <div className="employee-input-view">
          <Form>
            <Form.Item
              className="form-element"
              label={<IntlMessage id="employee.modal.step.employee.name" />}
            >
              <Input
                value={this.state.name}
                onChange={this.handleChange('name')}
                placeholder="Input employee name"
              />
            </Form.Item>
            <Form.Item
              className="form-element"
              label={<IntlMessage id="employee.modal.step.employee.number" />}
            >
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
            <span className="field-text">
              {<IntlMessage id="employee.modal.step.bank.name" />}:&nbsp;
            </span>
            <span className="value-text">{bankData.name || ''}</span>
          </div>
          <div className="preview-field">
            <span className="field-text">
              {<IntlMessage id="employee.modal.step.bank.branch" />}:&nbsp;
            </span>
            <span className="value-text">{bankData.branchName || ''}</span>
          </div>
          <div className="preview-field">
            <span className="field-text">
              {<IntlMessage id="employee.modal.step.account.holder" />}:&nbsp;
            </span>
            <span className="value-text">{this.state.accountHolder}</span>
          </div>
          <div className="preview-field">
            <span className="field-text">
              {<IntlMessage id="employee.modal.step.account.number" />}:&nbsp;
            </span>
            <span className="value-text">{this.state.accountNumber}</span>
          </div>
          <div className="preview-field">
            <span className="field-text">
              {<IntlMessage id="employee.modal.step.account.type" />}:&nbsp;
            </span>
            <span className="value-text">{this.state.accountType}</span>
          </div>
          <div className="preview-field">
            <span className="field-text">
              {<IntlMessage id="employee.modal.step.employee.name" />}:&nbsp;
            </span>
            <span className="value-text">{this.state.name}</span>
          </div>
          <div className="preview-field">
            <span className="field-text">
              {<IntlMessage id="employee.modal.step.employee.number" />}:&nbsp;
            </span>
            <span className="value-text">{this.state.number}</span>
          </div>
        </div>
      );
    }
  };

  render() {
    const { visible } = this.props;

    const btnText = this.state.curStep === 3 ? 'btn.save' : 'btn.next';

    return (
      <Modal
        className="modal-create"
        title={<IntlMessage id="employee.modal.title" />}
        visible={visible}
        onOk={this.handleSave}
        onCancel={this.handleClose}
        footer={[
          <Button key="next" type="primary" onClick={this.handleNext}>
            <IntlMessage id={btnText} />
          </Button>,
          <Button key="cancel" onClick={this.handleClose}>
            <IntlMessage id="btn.cancel" />
          </Button>,
        ]}
      >
        <Steps current={this.state.curStep}>
          <Steps.Step title={<IntlMessage id="employee.modal.step.bank" />} />
          <Steps.Step
            title={<IntlMessage id="employee.modal.step.account" />}
          />
          <Steps.Step
            title={<IntlMessage id="employee.modal.step.employee" />}
          />
          <Steps.Step
            title={<IntlMessage id="employee.modal.step.confirm" />}
          />
        </Steps>
        <div className="content">{this.renderView()}</div>
      </Modal>
    );
  }
}

export default compose(withBankData)(CreateModal);
