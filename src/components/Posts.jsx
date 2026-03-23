import React, { useEffect, useState } from "react";
import { deleteData, getData } from "../api/Postapi";
import Form from "./Form";

const Posts = () => {
  const [data, setData] = useState([]);
  const [editPost, setEditPost] = useState({});

  const getPostData = async () => {
    try {
      const response = await getData();
      setData(response.data);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const deleteHandler = async (id) => {
    try {
      const res = await deleteData(id);
      if (res.status === 200) {
        const newData = data.filter((ele) => {
          return ele.id !== id;
        });
        setData(newData);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const editHandler = (post) => {
    setEditPost(post);
  };

  useEffect(() => {
    getPostData();
  }, []);
  return (
    <>
      <div className="form-section">
        <Form
          data={data}
          setData={setData}
          editPost={editPost}
          setEditPost={setEditPost}
        />
      </div>
      <div className="post-section">
        <ol>
          {data.map((post) => {
            const { id, body, title } = post;
            return (
              <li key={id}>
                <p>Title: {title}</p>
                <p>Body: {body}</p>
                <button onClick={() => editHandler(post)}>Edit</button>
                <button onClick={() => deleteHandler(id)}>Delete</button>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default Posts;
