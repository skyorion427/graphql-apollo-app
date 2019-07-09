import React from 'react';
import IntlMessage from '../intlMessage';

export const columns = [
  {
    title: <IntlMessage id="employee.table.number" />,
    dataIndex: 'number',
  },
  {
    title: <IntlMessage id="employee.table.name" />,
    dataIndex: 'name',
  },
  {
    title: <IntlMessage id="employee.table.account.number" />,
    dataIndex: 'accountNumber',
  },
  {
    title: <IntlMessage id="employee.table.account.type" />,
    dataIndex: 'accountType',
  },
  {
    title: <IntlMessage id="employee.table.account.holder" />,
    dataIndex: 'accountHolder',
  },
  {
    title: <IntlMessage id="employee.table.bank.name" />,
    dataIndex: 'bank.name',
  },
  {
    title: <IntlMessage id="employee.table.bank.branch" />,
    dataIndex: 'bank.branchName',
  },
];

export const sortableFields = [
  {
    title: <IntlMessage id="employee.table.number" />,
    dataIndex: 'number',
  },
  {
    title: <IntlMessage id="employee.table.name" />,
    dataIndex: 'name',
  },
  {
    title: <IntlMessage id="employee.table.account.number" />,
    dataIndex: 'accountNumber',
  },
  {
    title: <IntlMessage id="employee.table.account.type" />,
    dataIndex: 'accountType',
  },
  {
    title: <IntlMessage id="employee.table.account.holder" />,
    dataIndex: 'accountHolder',
  },
];
