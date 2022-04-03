import React, { useState } from "react";
import "./signup.css";
import { cookie as cookies, signUpUser } from "../../apiCall";

export const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const [error, setError] = useState('')

  const handleSignUp = async(e) => {
      e.preventDefault(false);
      setError('');
      if (user.password !== user.confirmPassword) {
          setError('password and confirm password does not match');
          return;
      }
      console.log(e)
      signUpUser(user).then(res => {
          if (res.status){
            cookies.set('Authorization', res.data.authToken);
            setUser({ email: '', password: '', confirmPassword: '', name: ''});
            
          }
          else {
              setError(res.error);
          }
      }).catch(error => setError(error))

  }

  return (
    <div className="signup-container">
      <div className="signup-container-inside">
        <img
          src="https://aadcdn.msauth.net/shared/1.0/content/images/microsoft_logo_ee5c8d9fb6248c938fd0dc19370e90bd.svg"
          alt=""
        />
        <div>Create Account</div>
        <form action="" onSubmit={handleSignUp}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            id="name"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Email"
            id="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <label htmlFor="confirmPassword" value={user.confirmPassword}>
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={(e) =>
              setUser({ ...user, confirmPassword: e.target.value })
            }
          />
          <span>Account already exists ? <a href="/signin">Continue</a></span>
          <button onClick={handleSignUp}>Create</button>
          <span className="error">{error}</span>
        </form>
      </div>
    </div>
  );
};
