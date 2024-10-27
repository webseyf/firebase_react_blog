import React, { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './CreatePost.css';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  let navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [post, setPost] = useState('');
  const postsCollectionRef = collection(db, 'blogs');

  const createPost = async () => {
    await addDoc(postsCollectionRef, {
      title,
      post,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate('/');
  };

  useEffect(() => {
    if (!localStorage.getItem('isAuth')) {
      navigate('/login');
    }
  }, []);

  return (
    <div className="createPostPage">
      <div className="cpContainer">
        <h1>Create a Post</h1>
        <div className="inputGp">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </div>
        <div className="inputGp">
          <label htmlFor="post">Post</label>
          <textarea
            onChange={(e) => {
              setPost(e.target.value);
            }}
          ></textarea>
          <button onClick={createPost} className="createPost">
            Create Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
