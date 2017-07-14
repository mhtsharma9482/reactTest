import * as React from 'react';
import axios from 'axios';
const styles = require('./styles.module.css');
interface ILoginProps extends React.ClassAttributes<Login> {
  userName ?: string;
  password ?: string;
}
/**
 * Login
 */
class Login extends React.Component<{}, {}> {
  public static getData: object = null ;
  public render() {
    return (
      <form className={styles.loginForm} onSubmit={(e): void => {
        e.preventDefault();
        axios.get('http://localhost:3000/user?username=' + this.refs.userNameRef.value + '&password=' + this .refs.passwordRef.value)
          .then(function(response) {
            Login.getData = response.data[0].mobile;
            console.log(Login.getData);
          });
      }}>
        <div><label className={styles.userNameLabel}>Name </label><input type="text" ref= "userNameRef" name="username" /></div>
        <div>Password <input type="password" ref="passwordRef" name="password" /></div>
        <input type="submit" />
        {/*<p>your mobile no. is: {Login.getData}</p>*/}
      </form>
    );
  }
}
export default Login;
