import H1 from 'app/components/H1';

import * as expect from 'expect';
import { shallow } from 'enzyme';
import * as React from 'react';
import ReactElement = React.ReactElement;

describe('<H1 />', () => {
  it('should render its text', () => {
    const children = 'Text' as any as ReactElement<any>;
    const renderedComponent = shallow(
      <H1>{children}</H1>,
    );
    expect(renderedComponent.contains(children));
  });
});
