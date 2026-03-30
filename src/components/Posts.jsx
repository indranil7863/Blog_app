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
      <div className=" w-full bg-white sticky top-[65px]">
        <Form
          data={data}
          setData={setData}
          editPost={editPost}
          setEditPost={setEditPost}
        />
      </div>
      <div className="post-section">
        <ol className="flex flex-col justify-center gap-2 max-w-[80%] mx-auto border-x-2 p-2 bg-gray-100 rounded-[5px] ">
          {data.map((post) => {
            const { id, body, title } = post;
            return (
              <li
                key={id}
                className="border-2 border-gray-200 px-1 py-2 rounded-[5px]"
              >
                <p className="text-xl py-2 bg-white rounded-[5px] pl-1">
                  <span className="font-bold pr-2">Title:</span> {title}
                </p>
                <p className="text-[18px] py-2"> {body}</p>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-400 hover:bg-blue-300 px-6 py-1 rounded-[5px]"
                    onClick={() => editHandler(post)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-400 hover:bg-red-300 px-6 py-1 rounded-[5px]"
                    onClick={() => deleteHandler(id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </>
  );
};

export default Posts;
