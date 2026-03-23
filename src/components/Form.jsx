import React, { useState } from "react";
import { postData } from "../api/Postapi";

const Form = ({ data, setData }) => {
  const [newPost, setNewPost] = useState({ title: "", body: "" });
  const inputHandler = (e) => {
    setNewPost((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await postData(newPost);
      if (res.status === 201) {
        setData((prev) => {
          return [...prev, res.data];
        });
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    setNewPost({ title: "", body: "" });
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="title"></label>
        <input
          type="text"
          id="title"
          name="title"
          value={newPost.title}
          onChange={inputHandler}
          placeholder="write posts title.."
        />
      </div>
      <div>
        <label htmlFor="body"></label>
        <input
          type="text"
          id="body"
          name="body"
          value={newPost.body}
          onChange={inputHandler}
          placeholder="write posts body.."
        />
      </div>
      <button>Create</button>
    </form>
  );
};

export default Form;
