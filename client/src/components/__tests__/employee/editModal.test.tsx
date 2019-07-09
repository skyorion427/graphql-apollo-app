import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import EditModal from '../../employee/modals/editModal';

describe('Employee Edit Modal', () => {
  it('renders component', () => {
    const props = {
      visible: true,
      item: {
        _id: '123',
        name: 'Employee A',
        number: 1234567,
        accountHolder: 'Holder A',
        accountType: 'Checking',
        accountNumber: 7654321,
      },
      onOk: () => {},
      onCancel: () => {},
    };
    const component = shallow(<EditModal {...props} />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('renders props', () => {
    const props = {
      visible: true,
      item: {
        _id: '123',
        name: 'Employee A',
        number: 1234567,
        accountHolder: 'Holder A',
        accountType: 'Checking',
        accountNumber: 7654321,
      },
      onOk: () => {},
      onCancel: () => {},
    };
    const component = shallow(<EditModal {...props} />);

    expect(component.prop('visible')).toEqual(true);
    expect(component.prop('onOk')).toBeInstanceOf(Function);
    expect(component.prop('onCancel')).toBeInstanceOf(Function);
  });
});
