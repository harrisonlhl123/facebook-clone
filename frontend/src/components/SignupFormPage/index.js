import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState({
    month: "",
    day: "",
    year: ""
  });
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setErrors([]);
      await dispatch(sessionActions.signup({ email, first_name, last_name, gender, password, birthday }));
      // Handle successful signup if needed
    } catch (res) {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if, e.g., server is down
      }
  
      if (data?.errors) {
        setErrors(data.errors);
      } else if (data) {
        setErrors([data]);
      } else {
        setErrors([res.statusText]);
      }
    };
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error) => <li key={error}>{error}</li>)}
        </ul>
        <label>
          First Name
          <input
            type="text"
            value={first_name}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Birthday
            <select value={birthday.month} onChange={(e) => setBirthday({ ...birthday, month: e.target.value })}>
                <option value="01">Month</option>
                {/* Add the rest of the month options */}
            </select>
            <select value={birthday.day} onChange={(e) => setBirthday({ ...birthday, day: e.target.value })}>
                <option value="19">Day</option>
                {/* Add the rest of the day options */}
            </select>
            <select value={birthday.year} onChange={(e) => setBirthday({ ...birthday, year: e.target.value })}>
                <option value="1990">Year</option>
                {/* Add the rest of the year options */}
            </select>
        </label>
        <label>
          Gender
            <label>
                <input
                    type="radio"
                    value="male"
                    checked={gender === "male"}
                    onChange={() => setGender("male")}
                />
                Male
            </label>
            <label>
                <input
                    type="radio"
                    value="female"
                    checked={gender === "female"}
                    onChange={() => setGender("female")}
                />
                Female
            </label>
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;