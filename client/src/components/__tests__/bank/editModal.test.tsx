import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import CreateModal from '../../bank/modals/createModal';
import { functionDeclaration } from '@babel/types';

describe('Bank Edit Modal', () => {
  it('renders component', () => {
    const props = {
      visible: true,
      onOk: () => {},
      onCancel: () => {},
    };
    const component = shallow(<CreateModal {...props} />);

    expect(shallowToJson(component)).toMatchSnapshot();
  });

  it('renders props', () => {
    const props = {
      visible: true,
      onOk: () => {},
      onCancel: () => {},
    };
    const component = shallow(<CreateModal {...props} />);

    expect(component.prop('visible')).toEqual(true);
    expect(component.prop('onOk')).toBeInstanceOf(Function);
    expect(component.prop('onCancel')).toBeInstanceOf(Function);
  });
});
