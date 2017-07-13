import * as expect from 'expect';
import { mount } from 'enzyme';
import * as React from 'react';

import List from 'app/components/List';
import ListItem from 'app/components/ListItem';

describe('<List />', () => {
  it('should render the component if no items are passed', () => {
    const renderedComponent = mount(
      <List component={ListItem} />,
    );
    expect(renderedComponent.find(ListItem)).toExist();
  });

  it('should render the items', () => {
    const items = [
      'Hello',
      'World',
    ];
    const renderedComponent = mount(
      <List items={items} component={ListItem} />,
    );
    expect(renderedComponent.containsAllMatchingElements(items.map((item) => <ListItem item={item}/>))).toExist();
  });
});
