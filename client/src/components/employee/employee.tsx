import React from 'react';
import { compose, Query } from 'react-apollo';
import {
  Table,
  Form,
  Input,
  InputNumber,
  Button,
  Modal,
  Select,
  Icon,
} from 'antd';
import Highlighter from 'react-highlight-words';
import { get as _get } from 'lodash';

import CreateModal from './modals/createModal';
import EditModal from './modals/editModal';
import {
  createEmployeeData,
  updateEmployeeData,
  deleteEmployeeData,
} from '../../graphql/employee';
import {
  Employee as EmployeeType,
  CreateEmployeeInput,
  UpdateEmployeeInput,
  QueryEmployeesArgs,
  EmployeesInput,
  Order as OrderType,
} from '../../graphql/types';
import { GET_EMPLOYEE_QUERY } from '../../graphql/gql/employee';

import IntlMessage from '../intlMessage';
import { columns, sortableFields } from './config';
import './employee.css';

type searchFilterIndex = 'name' | 'accountHolder';
type rangeFilterIndex = 'number' | 'accountNumber';

interface Props {
  data: any;
  loading: any;
  error: any;
  createEmployee: (input: CreateEmployeeInput) => EmployeeType;
  updateEmployee: (_id: string, input: UpdateEmployeeInput) => EmployeeType;
  deleteEmployee: (_id: string) => EmployeeType;
}

interface State {
  curEmployee: EmployeeType;
  showCreateModal: boolean;
  showEditModal: boolean;
  showDeleteModal: boolean;
  selectedEmployees: EmployeeType[];
  selectedRowKeys: number[] | string[];
  order?: OrderType;
  sort?: string;
  searchFilter?: any;
  rangeFilter?: any;
}

class EmployeeComponent extends React.Component<Props, State> {
  state = {
    curEmployee: {
      _id: '',
      name: '',
      number: 0,
      accountHolder: '',
      accountType: '',
      accountNumber: 0,
    },
    showCreateModal: false,
    showEditModal: false,
    showDeleteModal: false,
    selectedEmployees: [],
    selectedRowKeys: [],
    order: OrderType.Asc,
    sort: '',
    searchFilter: {
      name: '',
      accountHolder: '',
    },
    rangeFilter: {
      number: [0, 0],
      accountNumber: [0, 0],
    },
  };

  searchInput: any = React.createRef();

  // Create new employee
  handleOpenCreateModal = () => {
    this.setState({
      showCreateModal: true,
    });
  };

  handleCreateNewEmployee = (newEmployee: CreateEmployeeInput) => {
    this.props.createEmployee(newEmployee);
    this.handleCloseCreateModal();
  };

  handleCloseCreateModal = () => {
    this.setState({
      showCreateModal: false,
    });
  };

  // Edit Employee
  handleOpenEdit = (item: EmployeeType) => () => {
    this.setState({
      curEmployee: item,
      showEditModal: true,
    });
  };

  handleEditSave = (_id: string, item: UpdateEmployeeInput) => {
    this.props.updateEmployee(_id, item);

    this.setState({
      showEditModal: false,
    });
  };

  handleCloseEdit = () => {
    this.setState({
      showEditModal: false,
    });
  };

  // Delete Employee
  handleOpenDelete = () => {
    this.setState({
      showDeleteModal: true,
    });
  };

  handleConfirmDelete = () => {
    const { selectedEmployees } = this.state;

    selectedEmployees.forEach((employeeData: EmployeeType) => {
      this.props.deleteEmployee(employeeData._id);
    });

    this.setState({
      showDeleteModal: false,
      selectedEmployees: [],
      selectedRowKeys: [],
    });
  };

  handleCloseDelete = () => {
    this.setState({
      showDeleteModal: false,
    });
  };

  handleChangeSelection = (
    selectedRowKeys: number[] | string[],
    selectedEmployees: EmployeeType[],
  ) => {
    this.setState({
      selectedRowKeys,
      selectedEmployees,
    });
  };

  handleChangeValue = (name: keyof State) => (value: any) => {
    this.setState({
      [name]: value,
    } as Pick<State, keyof State>);
  };

  getColumnSearchProps = (dataIndex: searchFilterIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: any;
      selectedKeys: any;
      confirm: any;
      clearFilters: any;
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(dataIndex, selectedKeys, confirm)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(dataIndex, selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(dataIndex, clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    // onFilter: (value: string, record: any) =>
    //   record[dataIndex]
    //     .toString()
    //     .toLowerCase()
    //     .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text: string) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchFilter[dataIndex]]}
        autoEscape
        textToHighlight={text.toString()}
      />
    ),
  });

  getColumnRangeProps = (dataIndex: rangeFilterIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: {
      setSelectedKeys: any;
      selectedKeys: any;
      confirm: any;
      clearFilters: any;
    }) => (
      <div style={{ padding: 8 }}>
        <InputNumber
          value={selectedKeys[0]}
          onChange={value =>
            setSelectedKeys(value ? [value, selectedKeys[1]] : [])
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <InputNumber
          value={selectedKeys[1]}
          onChange={value =>
            setSelectedKeys(value ? [selectedKeys[0], value] : [])
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() =>
            this.handleRangeFilter(
              dataIndex,
              selectedKeys[0],
              selectedKeys[1],
              confirm,
            )
          }
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Filter
        </Button>
        <Button
          onClick={() => this.handleResetRange(dataIndex, clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <Icon type="filter" style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
  });

  handleSearch = (
    dataIndex: searchFilterIndex,
    selectedKeys: string[],
    confirm: () => void,
  ) => {
    confirm();

    const newFilter = this.state.searchFilter;
    newFilter[dataIndex] = selectedKeys[0];
    this.setState({
      searchFilter: newFilter,
    });
  };

  handleReset = (dataIndex: searchFilterIndex, clearFilters: () => void) => {
    clearFilters();

    const newFilter = this.state.searchFilter;
    newFilter[dataIndex] = '';
    this.setState({
      searchFilter: newFilter,
    });
  };

  handleRangeFilter = (
    dataIndex: rangeFilterIndex,
    from: number,
    to: number,
    confirm: () => void,
  ) => {
    confirm();

    const newRange = this.state.rangeFilter;
    newRange[dataIndex] = [from, to];
    this.setState({
      rangeFilter: newRange,
    });
  };

  handleResetRange = (
    dataIndex: rangeFilterIndex,
    clearFilters: () => void,
  ) => {
    clearFilters();

    const newRange = this.state.rangeFilter;
    newRange[dataIndex] = [0, 0];
    this.setState({
      rangeFilter: newRange,
    });
  };

  render() {
    const {
      selectedRowKeys,
      order,
      sort,
      searchFilter,
      rangeFilter,
    } = this.state;
    const filters: any = [];

    Object.keys(searchFilter).map((field: string) => {
      if (field === 'name' || field === 'accountHolder') {
        if (searchFilter[field]) {
          filters.push({
            field,
            value: searchFilter[field],
            operator: 'like',
          });
        }
      }
    });

    Object.keys(rangeFilter).map((field: string) => {
      if (field === 'number' || field === 'accountNumber') {
        if (rangeFilter[field][0]) {
          filters.push({
            field,
            value: rangeFilter[field][0].toString(),
            operator: 'gte',
          });
        }
        if (rangeFilter[field][1]) {
          filters.push({
            field,
            value: rangeFilter[field][1].toString(),
            operator: 'lte',
          });
        }
      }
    });

    const variables = {
      order,
      sort,
      filters,
    };

    let tableColumns = columns;

    // add search filter
    tableColumns[0] = {
      ...tableColumns[0],
      ...this.getColumnRangeProps('number'),
    };
    tableColumns[2] = {
      ...tableColumns[2],
      ...this.getColumnRangeProps('accountNumber'),
    };
    tableColumns[1] = {
      ...tableColumns[1],
      ...this.getColumnSearchProps('name'),
    };
    tableColumns[4] = {
      ...tableColumns[4],
      ...this.getColumnSearchProps('accountHolder'),
    };

    const actionCol = {
      title: <IntlMessage id="btn.edit" />,
      render: (text: string, record: EmployeeType) => (
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
      <Query<any, QueryEmployeesArgs>
        query={GET_EMPLOYEE_QUERY}
        variables={variables}
      >
        {({ loading, data, error }) => {
          const employees = _get(data, 'employees', []);

          return (
            <div className="employee-container">
              <div className="employee-toolbar">
                <div className="employee-create">
                  <Button onClick={this.handleOpenCreateModal} type="primary">
                    <IntlMessage id="employee.btn.create" />
                  </Button>
                  <Button
                    type="default"
                    onClick={this.handleOpenDelete}
                    disabled={selectedRowKeys.length === 0}
                  >
                    <IntlMessage id="btn.delete" />
                  </Button>
                </div>
                <div className="employee-sort">
                  <Form layout="inline">
                    <Form.Item>
                      <IntlMessage id="btn.sort" />
                    </Form.Item>
                    <Form.Item>
                      <Select
                        className="employee-sortable-field"
                        value={this.state.sort}
                        onChange={this.handleChangeValue('sort')}
                      >
                        <Select.Option value="">
                          <IntlMessage id="btn.sort.field.placeholder" />
                        </Select.Option>
                        {sortableFields.map(col => (
                          <Select.Option value={col.dataIndex}>
                            {col.title}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                    <Form.Item>
                      <IntlMessage id="btn.sort.by" />
                    </Form.Item>
                    <Form.Item>
                      <Select
                        value={this.state.order}
                        onChange={this.handleChangeValue('order')}
                      >
                        <Select.Option value="">Select Order</Select.Option>
                        <Select.Option value={OrderType.Asc}>ASC</Select.Option>
                        <Select.Option value={OrderType.Desc}>
                          DESC
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Form>
                </div>
              </div>
              <div className="employee-table">
                <Table
                  rowSelection={rowSelection}
                  columns={[...columns, actionCol]}
                  dataSource={employees}
                />
              </div>
              <CreateModal
                visible={this.state.showCreateModal}
                onOk={this.handleCreateNewEmployee}
                onCancel={this.handleCloseCreateModal}
              />
              <EditModal
                visible={this.state.showEditModal}
                item={this.state.curEmployee}
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
        }}
      </Query>
    );
  }
}

export default compose(
  createEmployeeData,
  updateEmployeeData,
  deleteEmployeeData,
)(EmployeeComponent);
