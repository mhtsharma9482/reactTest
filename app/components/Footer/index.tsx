import * as React from 'react';

import A from 'app/components/A';
const styles = require('./styles.module.css');

class Footer extends React.Component<{}, {}> {
  public render() {
    return (
      <footer className={styles.footer}>
        <section>
          <p>© CauseCode Technologies Pvt Ltd 2017 </p>
        </section>
      </footer>
    );
  }
}

export default Footer;
