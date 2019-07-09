import React from 'react';
import { compose } from 'react-apollo';
import { Form, Input, Button, Table, Modal } from 'antd';

import CreateModal from './modals/createModal';
import EditModal from './modals/editModal';
import {
  withBankData,
  createBankData,
  updateBankData,
  deleteBankData,
} from '../../graphql/bank';
import {
  Bank as BankType,
  CreateBankInput,
  UpdateBankInput,
} from '../../graphql/types';
import IntlMessage from '../intlMessage';
import { columns } from './config';
import './bank.css';

interface Props {
  data: any;
  createBank: (input: CreateBankInput) => BankType;
  updateBank: (_id: string, input: UpdateBankInput) => BankType;
  deleteBank: (_id: string) => BankType;
}

interface State {
  curBank: BankType;
  showCreateModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  selectedBanks: BankType[];
  selectedRowKeys: number[] | string[];
}

class BankComponent extends React.Component<Props, State> {
  state = {
    curBank: {
      _id: '1',
      name: 'bank name',
      branchName: 'branch name',
    },
    showCreateModal: false,
    showEditModal: false,
    showDeleteModal: false,
    selectedBanks: [],
    selectedRowKeys: [],
  };

  // Create new bank
  handleShowCreateModal = () => {
    this.setState({
      showCreateModal: true,
    });
  };

  handleCreateNewBank = (newBank: CreateBankInput) => {
    const { createBank } = this.props;

    createBank(newBank);
    this.handleCloseCreateModal();
  };

  handleCloseCreateModal = () => {
    this.setState({
      showCreateModal: false,
    });
  };

  // Edit bank
  handleOpenEdit = (item: BankType) => () => {
    this.setState({
      curBank: item,
      showEditModal: true,
    });
  };

  handleEditSave = (_id: string, item: UpdateBankInput) => {
    this.props.updateBank(_id, item);

    this.setState({
      showEditModal: false,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      showEditModal: false,
    });
  };

  // Delete bank
  handleOpenDelete = () => {
    this.setState({
      showDeleteModal: true,
    });
  };

  handleConfirmDelete = () => {
    const { selectedBanks } = this.state;

    selectedBanks.forEach((bankData: BankType) => {
      this.props.deleteBank(bankData._id);
    });

    this.setState({
      showDeleteModal: false,
      selectedRowKeys: [],
      selectedBanks: [],
    });
  };

  handleCloseDelete = () => {
    this.setState({
      showDeleteModal: false,
    });
  };

  handleChangeSelection = (
    selectedRowKeys: number[] | string[],
    selectedBanks: BankType[],
  ) => {
    this.setState({
      selectedRowKeys,
      selectedBanks,
    });
  };

  render() {
    const { data } = this.props;
    const { selectedRowKeys } = this.state;
    const actionCol = {
      title: <IntlMessage id="btn.edit" />,
      render: (text: string, record: BankType) => (
        <span>
          <a onClick={this.handleOpenEdit(record)}>
            <IntlMessage id="btn.edit" />
          </a>
        </span>
      ),
    };
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleChangeSelection,
    };

    return (
      <div className="bank-container">
        <div className="bank-create">
          <Button onClick={this.handleShowCreateModal} type="primary">
            <IntlMessage id="bank.btn.create" />
          </Button>
          <Button
            type="default"
            onClick={this.handleOpenDelete}
            disabled={selectedRowKeys.length === 0}
          >
            <IntlMessage id="btn.delete" />
          </Button>
        </div>
        <div className="bank-list-container">
          <Table
            rowSelection={rowSelection}
            columns={[...columns, actionCol]}
            dataSource={data.banks}
          />
        </div>
        <CreateModal
          visible={this.state.showCreateModal}
          onOk={this.handleCreateNewBank}
          onCancel={this.handleCloseCreateModal}
        />
        <EditModal
          visible={this.state.showEditModal}
          item={this.state.curBank}
          onOk={this.handleEditSave}
          onCancel={this.handleCloseEdit}
        />
        <Modal
          visible={this.state.showDeleteModal}
          onOk={this.handleConfirmDelete}
          onCancel={this.handleCloseDelete}
        >
          Do you want to delete?
        </Modal>
      </div>
    );
  }
}

export default compose(
  withBankData,
  createBankData,
  updateBankData,
  deleteBankData,
)(BankComponent);
