import React, { useState, useEffect } from "react";
import { editData, postData } from "../api/Postapi";

const Form = ({ data, setData, editPost, setEditPost }) => {
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  useEffect(() => {
    if (Object.keys(editPost).length !== 0) {
      setNewPost(editPost);
    }
  }, [editPost]);

  console.log(Object.keys(editPost).length);
  console.log(newPost);
  console.log(editPost);
  const inputHandler = (e) => {
    setNewPost((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  let isEmpty = Object.keys(editPost).length === 0;

  const submitHandler = async (e) => {
    e.preventDefault();
    const fromData = new FormData(e.target);
    const action = e.nativeEvent.submitter.value;
    console.log("action : ", action);
    try {
      if (action === "create") {
        const res = await postData(newPost);
        if (res.status === 201) {
          setData((prev) => {
            return [...prev, res.data];
          });
        }
      } else if (action === "edit") {
        const res = await editData(newPost);
        if (res.status === 200) {
          const editedData = data.map((ele) => {
            return ele.id === newPost.id ? newPost : ele;
          });
          setData(editedData);
        }
        setEditPost({});
      }
    } catch (error) {
      console.log("Error: ", error);
    }
    setNewPost({ title: "", body: "" });
  };
  return (
    <form
      onSubmit={submitHandler}
      className="flex justify-center flex-col gap-2 bg-gray-400 p-2 rounded-[5px]  w-[80%] mx-auto  sm:w-[40%] "
    >
      <div className="bg-gray-300 rounded-[5px] p-2">
        <label htmlFor="title"></label>
        <input
          className="outline-none w-full scroll-auto"
          type="text"
          id="title"
          name="title"
          value={newPost.title}
          onChange={inputHandler}
          placeholder="write posts title.."
        />
      </div>
      <div className="bg-gray-300 rounded-[5px] p-2">
        <label htmlFor="body"></label>
        <input
          className="outline-none w-full scroll-auto"
          type="text"
          id="body"
          name="body"
          value={newPost.body}
          onChange={inputHandler}
          placeholder="write posts body.."
        />
      </div>
      <button
        className="w-full bg-green-500 text-white text-xl rounded-[5px] py-1 hover:bg-green-300 hover:text-black"
        type="submit"
        name="action"
        value={isEmpty ? "create" : "edit"}
      >
        {isEmpty ? "create" : "edit"}
      </button>
    </form>
  );
};

export default Form;
