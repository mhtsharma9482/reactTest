import H3 from '../index';

import * as expect from 'expect';
import { shallow } from 'enzyme';
import * as React from 'react';
import ReactElement = React.ReactElement;

describe('<H3 />', () => {
  it('should render its text', () => {
    const children = 'Text' as any as ReactElement<any>;
    const renderedComponent = shallow(
      <H3>{children}</H3>,
    );
    expect(renderedComponent.contains(children));
  });
});
