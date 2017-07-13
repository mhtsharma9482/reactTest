/**
 * A link to a certain page, an anchor tag
 */

import * as React from 'react';

const styles = require('./styles.module.css');

interface IAProps {
  className?: string;
  href?: string;
  target?: string;
  children?: React.ReactNode;
}

class A extends React.Component<IAProps, {}> {
  public render() {
    return(
      <a className={this.props.className || styles.link} {...this.props} />
    );
  }
}


export default A;
