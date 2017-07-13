import * as expect from 'expect';
import { shallow } from 'enzyme';
import * as React from 'react';

import Footer from 'app/components/Footer';
import A from 'app/components/A';

describe('<Footer />', () => {
  it('should render the copyright notice', () => {
    const renderedComponent = shallow(
      <Footer />,
    );
    expect(renderedComponent.contains(
      <section>
        <p>This project is licensed under the MIT license.</p>
      </section>,
    )).toEqual(true);
  });

  it('should render the credits', () => {
    const renderedComponent = shallow(<Footer />);
    expect(renderedComponent.contains(
      <section>
        <p>Made with love by <A href="https://twitter.com/mxstbr">Max Stoiber</A>.</p>
      </section>,
    )).toEqual(true);
  });
});
