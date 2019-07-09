import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import EditModal from '../../bank/modals/editModal';

describe('Bank Create Modal', () => {
  it('renders component', () => {
    const props = {
      visible: true,
      item: {
        _id: '123',
        name: 'Bank A',
        branchName: 'Branch A',
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
        name: 'Bank A',
        branchName: 'Branch A',
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
