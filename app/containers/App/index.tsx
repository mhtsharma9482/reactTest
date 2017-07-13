/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import Helmet from 'react-helmet';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';

import Img from 'app/components/Img';
import Footer from 'app/components/Footer';
const Banner = require('./banner-metal.jpg');
import A from 'app/components/A';
import Login from 'app/components/Login';
const styles = require('./styles.module.css');
interface IAppProps {
  children?: React.ReactNode;
}

class App extends React.Component<IAppProps, {}> {
  public render() {
    return (
      <div className={styles.wrapper}>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
        >
          <meta name="description" content="A React.js Boilerplate application" />
        </Helmet>
        <A className={styles.logoWrapper} href="https://twitter.com/mxstbr">
          <Img className={styles.logo} src={Banner} alt="react-boilerplate - Logo"/>
        </A>
        {this.props.children}
        <Login /><br />
        <Footer />
      </div>
    );
  }
}

export default App;
