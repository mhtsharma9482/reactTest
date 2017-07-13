import * as React from 'react';
import axios from 'axios';
import {isEmpty} from 'lodash';
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
      <form className={styles.loginForm} onSubmit={(e): void => {
        e.preventDefault();
        axios.get('http://localhost:3000/user?username='+this.refs.userNameRef.value+'&password='+this.refs.passwordRef.value)
        .then(function (response) {
        console.log(response.data);
        });
      }}>
        <div>Name <input type="text" ref= "userNameRef" name="username" /></div>
        <div>Password <input type="password" ref="passwordRef" name="password" /></div>
        <input type="submit" />
      </form>
    );
  }
}
export default Login;
