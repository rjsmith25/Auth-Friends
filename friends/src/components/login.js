import React, { useState } from "react";
import axiosWithAuth from "../util/axiosWithAuth";

function Login(props) {
  const [user, setUser] = useState({ username: "", password: "" });

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!user.username && !user.password) {
      return;
    }
    console.log(user.username);
    console.log(user.password);

    axiosWithAuth()
      .post("/login", user)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.setIsLoggedIn(true);
        props.setIsLoading(true);
        props.history.push("/friends");
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <form onSubmit={handleSubmit} className="authFriendsForm">
      <input
        name="username"
        value={user.username}
        onChange={handleChange}
        type="text"
        placeholder="Enter username"
      />
      <input
        name="password"
        value={user.password}
        onChange={handleChange}
        type="password"
        placeholder="Enter password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
