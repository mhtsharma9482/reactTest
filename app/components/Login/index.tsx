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
  /*private login() {
    // debugger;
    console.log("login");
    axios.get('http://localhost:3000/user?username=Mohit').then(function (response) {
      console.log(response.data);
    });
  }*/
  public render() {
    return (
      <form className={styles.loginForm} onSubmit={(): void => {
            axios.get('http://localhost:3000/user?username='+this.refs.userNameRef.value+'&password='+this.refs.passwordRef.value)
            .then(function (response) {
              console.log(response.data);
            });
          }}>
        <div>Name <input type="text" ref= "userNameRef" name="username" /></div>
        <div>Password <input type="password" ref="passwordRef" name="password" /></div>
        <button type="submit">submit</button>
      </form>
    );
  }
}
export default Login;
