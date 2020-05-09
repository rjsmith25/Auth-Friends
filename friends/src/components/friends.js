import React, { useState, useEffect } from "react";
import axiosWithAuth from "../util/axiosWithAuth";

function Friends(props) {
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState({ name: "", age: "", email: "" });

  function handleChange(e) {
    setNewFriend({ ...newFriend, [e.target.name]: e.target.value });
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!newFriend.name && !newFriend.age && !newFriend.email) {
      return;
    }

    axiosWithAuth()
      .post("/friends", newFriend)
      .then(res => {
        setFriends(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }

  useEffect(() => {
    axiosWithAuth()
      .get("/friends")
      .then(res => {
        setFriends(res.data);
        props.setIsLoading(false);
      });
  }, []);

  if (props.isloading) {
    return <p className="loading">Loading Data.....</p>;
  } else {
    return (
      <>
        <h2 className="friends-title">Friend List</h2>
        <form onSubmit={onSubmit} className="addFriendform">
          <input
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Enter name"
          />
          <input
            onChange={handleChange}
            name="age"
            type="text"
            placeholder="Enter age"
          />
          <input
            onChange={handleChange}
            name="email"
            type="email"
            placeholder="Enter email"
          />
          <button type="submit">Add New Friend</button>
        </form>

        <div className="friends">
          <div className="container">
            {friends.map(friend => {
              return (
                <div key={friend.id} className="friend">
                  <p>{friend.name}</p>
                  <p>{friend.age}</p>
                  <p>{friend.email}</p>
                </div>
              );
            })}
          </div>
        </div>
      </>
    );
  }
}

export default Friends;
