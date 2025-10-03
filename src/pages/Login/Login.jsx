import React, { useState } from 'react';
import './Login.css';
import logo from '../../assets/logo.png';
import { login, signup } from '../../firebase';

const Login = () => {
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user_auth = async (event) => {
    event.preventDefault();
    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSignState = () => {
    setSignState(signState === "Sign In" ? "Sign Up" : "Sign In");
  };

  return (
    <div className='login'>
      <img src={logo} className='login-logo' alt="Netflix Logo" /> 
      <div className="login-form">
        <h1>{signState}</h1>
        <form>
          {signState === "Sign Up" && 
          <input value={name} onChange={(e)=>setName(e.target.value)} type="text" placeholder='Your Name' />}
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder='Email' />
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='Password' />
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className="form-help">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <p>Need help?</p>
          </div>
        </form>
        <div className="form-switch">
          {signState === "Sign In" ? (
            <p>New to Netflix? <span onClick={toggleSignState}>Sign Up now</span></p>
          ) : (
            <p>Already have an account? <span onClick={toggleSignState}>Sign In now</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
