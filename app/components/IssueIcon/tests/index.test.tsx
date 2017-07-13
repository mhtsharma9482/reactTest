import IssueIcon from 'app/components/IssueIcon';

import * as expect from 'expect';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('<IssueIcon />', () => {
  it('should render a SVG', () => {
    const renderedComponent = shallow(
      <IssueIcon />,
    );
    expect(renderedComponent.find('svg').length).toEqual(1);
  });
});
