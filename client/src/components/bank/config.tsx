import React from 'react';
import IntlMessage from '../intlMessage';

export const columns = [
  {
    title: <IntlMessage id="bank.table.name" />,
    dataIndex: 'name',
  },
  {
    title: <IntlMessage id="bank.table.branch" />,
    dataIndex: 'branchName',
  },
];
