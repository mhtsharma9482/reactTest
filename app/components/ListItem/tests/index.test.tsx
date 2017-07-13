import ListItem from 'app/components/ListItem';

import * as expect from 'expect';
import { shallow } from 'enzyme';
import * as React from 'react';

describe('<ListItem />', () => {
  it('should adopt the className', () => {
    const renderedComponent = shallow(<ListItem className="test" />);
    expect(renderedComponent.find('li').hasClass('test')).toEqual(true);
  });

  it('should render the content passed to it', () => {
    const content = 'Hello world!';
    const renderedComponent = shallow(
      <ListItem item={content} />,
    );
    expect(renderedComponent.text()).toBe(content);
  });
});
