import H2 from 'app/components/H2';

import * as expect from 'expect';
import { shallow } from 'enzyme';
import * as React from 'react';
import ReactElement = React.ReactElement;

describe('<H2 />', () => {
  it('should render its text', () => {
    const children = 'Text' as any as ReactElement<any>;
    const renderedComponent = shallow(
      <H2>{children}</H2>,
    );
    expect(renderedComponent.contains(children));
  });
});
