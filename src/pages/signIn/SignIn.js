import React, { useContext, useEffect, useState } from "react";
import "./signin.css";
import { cookie as cookies, signInUser } from "../../apiCall";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context";

export const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState('')

  const { state } = useContext(Context);

  useEffect(() => {
    console.log(state)
    if (state.isAuthenticated) {
      navigate('/forms')
    }
  }, [state])

  const handleSignIn = async(e) => {
      e.preventDefault(false);
      setError('');
      if (!(user.password.length && user.email.length)) {
          setError('email and password required');
          return;
      }
      console.log(e)
      signInUser(user).then(res => {
        console.log(res)
          if (res.data.status){
            cookies.set('Authorization', res.data.authToken);
            cookies.set('userId', res.data.id);
            cookies.set('email', res.data.email);
            cookies.set('name', res.data.name);
            setUser({ email: '', password: ''});
            navigate('/tasks/myDay');
          }
          else {
              setError(res.error);
          }
      }).catch(error => {
        setError('Something went wrong')
      })

  }

  return (
    <div className="signup-container">
      <div className="signup-container-inside">
        <img
          src="https://aadcdn.msauth.net/shared/1.0/content/images/microsoft_logo_ee5c8d9fb6248c938fd0dc19370e90bd.svg"
          alt=""
        />
        <div>Sign In</div>
        <form action="" onSubmit={handleSignIn}>
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
          <span> New User ? <a href="/signup">Create account</a></span>
          <button onClick={handleSignIn}>Continue</button>         
          <span className="error">{error}</span>
        </form>
      </div>
    </div>
  );
};
