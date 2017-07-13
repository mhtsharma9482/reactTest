/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
// import messages from './messages';
import { createStructuredSelector } from 'reselect';

interface IMohitProp {
  myName ?: string;
}
export class Mohit extends React.Component<IMohitProp , {}> {
    public render() {
    return(
      <div>Hello</div>
    );
  }
}

export default Mohit;
