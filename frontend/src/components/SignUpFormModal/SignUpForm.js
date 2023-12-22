import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignUpForm.css';

function SignUpForm() {
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

    // Check if all birthday components are selected
    if (!birthday.month || !birthday.day || !birthday.year) {
      setErrors(["Please select a valid birthday."]);
      return;
    }

    try {
      setErrors([]);

      // Format the birthday before dispatching
      const formattedBirthday = `${birthday.year}-${birthday.month}-${birthday.day}`;

      const userData = {
        email,
        first_name,
        last_name,
        gender,
        password,
        birthday: formattedBirthday,
        pfp: "https://instabook-seeds.s3.amazonaws.com/default.png", // Replace with the actual link
        cover: "https://instabook-seeds.s3.amazonaws.com/cover-photo.jpeg", // Replace with the actual link
        bio: "Hello, I'm a user of this awesome platform!",
      };

      await dispatch(sessionActions.signup(userData));

      // Handle successful signup if needed
    } catch (res) {
      let data;
      try {
        data = await res.clone().json();
      } catch {
        data = await res.text();
      }

      if (data?.errors) {
        setErrors(data.errors);
      } else if (data) {
        setErrors([data]);
      } else {
        setErrors([res.statusText]);
      }
    }
  };

  // Generate an array of month names
  const monthOptions = Array.from({ length: 12 }, (_, index) => (index + 1).toString().padStart(2, '0'));

  // Generate an array of day numbers from 1 to 31
  const dayOptions = Array.from({ length: 31 }, (_, index) => (index + 1).toString().padStart(2, '0'));

  // Generate an array of years, adjust the range as needed
  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from({ length: 100 }, (_, index) => (currentYear - index).toString());

  return (
    <>
      <h1>Sign Up</h1>
      <p>It's quick and easy</p>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error) => <li id="signup-errors" key={error}>{error}</li>)}
        </ul>
        <div className="name-inputs">
          <label>
            {/* First Name */}
            <input
              type="text"
              value={first_name}
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label>
            {/* Last Name */}
            <input
              type="text"
              value={last_name}
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
        </div>
        <label>
          {/* Email */}
          <input className="email-password"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          {/* Password */}
          <input className="email-password"
            type="password"
            value={password}
            placeholder="New Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
          Birthday
          <div className="birthday">
            <select value={birthday.month} onChange={(e) => setBirthday({ ...birthday, month: e.target.value })}>
              <option value="">Month</option>
              {monthOptions.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <select value={birthday.day} onChange={(e) => setBirthday({ ...birthday, day: e.target.value })}>
              <option value="">Day</option>
              {dayOptions.map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <select value={birthday.year} onChange={(e) => setBirthday({ ...birthday, year: e.target.value })}>
              <option value="">Year</option>
              {yearOptions.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </label>
        <label>
          Gender
          <div className="gender">
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
            <label>
              <input
                type="radio"
                value="custom"
                checked={gender === "custom"}
                onChange={() => setGender("custom")}
              />
              Custom
            </label>
          </div>
        </label>
          <button id="signup-button" type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignUpForm;
