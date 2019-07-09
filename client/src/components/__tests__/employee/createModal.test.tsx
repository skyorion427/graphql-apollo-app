import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import { MockedProvider } from 'react-apollo/test-utils';

import CreateModal from '../../employee/modals/createModal';

describe('Employee Create Modal', () => {
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
    const component = shallow(
      <MockedProvider mocks={[]}>
        <CreateModal {...props} />
      </MockedProvider>,
    )
      .first()
      .shallow()
      .first()
      .shallow();

    expect(component.prop('visible')).toEqual(true);
    expect(component.prop('onOk')).toBeInstanceOf(Function);
    expect(component.prop('onCancel')).toBeInstanceOf(Function);
  });
});
