import * as React from 'react';
const styles = require('./styles.module.css');
interface ILoginProps extends React.ClassAttributes<Login> {
  abc ?: string;
}
/**
 * Login
 */
class Login extends React.Component<{}, {}> {
  public render() {
    return (
      <form className={styles.loginForm}>
        <div>Name <input type="text" name="username" /></div>
        <div>Password <input type="password" name="password" /></div>
        <input type="submit" />
      </form>
    );
  }
}
export default Login;
