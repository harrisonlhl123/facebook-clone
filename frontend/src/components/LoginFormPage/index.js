import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';
import SignUpFormModal from "../SignUpFormModal";

const LoginPageForm = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);

    if (sessionUser) return <Redirect to="/" />;

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ email, password }))
          .catch(async (res) => {
            let data;
            try {
              // .clone() essentially allows you to read the response body twice
              data = await res.clone().json();
            } catch {
              data = await res.text(); // Will hit this case if, e.g., server is down
            }
            if (data?.errors) setErrors(data.errors);
            else if (data) setErrors([data]);
            else setErrors([res.statusText]);
          });
    };

    const handleDemoLogin = async () => {
      // Define your demo user credentials
      const demoUser = {
        email: "harrison@aa.io",
        password: "password",
      };
  
      try {
        // Dispatch the login action with demo user credentials
        await dispatch(sessionActions.login(demoUser));
      } catch (res) {
        let data;
        try {
          data = await res.clone().json();
        } catch {
          data = await res.text();
        }
        if (data?.errors) setErrors(data.errors);
        else if (data) setErrors([data]);
        else setErrors([res.statusText]);
      }
    };

    

    return (
      <>
        <div id="login-container">
          <div id="left-content">
            <h1>instabook</h1>
            <p>Connect with friends and the world around you on Instabook.</p>
          </div>
          <div id="right-content">
            <form onSubmit={handleSubmit}>
              <ul>
                {errors.map(error => <li id="login-errors" key={error}>{error}</li>)}
              </ul>
              <div className="login-email-password">
                <label>
                  {/* Email */}
                  <input
                    type="text"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>
                <label>
                  {/* Password */}
                  <input
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
              </div>
              <button type="submit" id="login-button">Log In</button>
            </form>

            <button type="button" id="demo-login-button" onClick={handleDemoLogin}>
              Demo User
            </button>

            <SignUpFormModal />
          </div>
        </div>

        <div id="socials-login-page">
            <div>
                <a href="https://www.linkedin.com/in/harrison-l-2738bb103/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                    LinkedIn
                </a>
            </div>
            <div>
                <a href="https://harrisonlhl123.github.io/personal-website/" target="_blank" rel="noopener noreferrer">
                    <i class="fa-solid fa-globe"></i>
                    Harrison Liang
                </a>
            </div>
            <div>
                <a href="https://github.com/harrisonlhl123/facebook-clone" target="_blank" rel="noopener noreferrer">
                    <i class="fa-solid fa-code"></i>
                    Instabook Repo
                </a>
            </div>
            <div>
                <a href="https://github.com/harrisonlhl123" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github"></i>
                    GitHub
                </a>
            </div>
        </div>
      </>
  );
}

export default LoginPageForm;