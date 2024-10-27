import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import './Home.css';
function Home() {
  const [list, setList] = useState([]);
  const postsCollectionRef = collection(db, 'blogs');

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        setList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      const postDoc = doc(db, 'blogs', id);
      await deleteDoc(postDoc);
      setList((prevList) => prevList.filter((post) => post.id !== id)); // Update list locally after deletion
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div className="homePage">
      <h1>Home</h1>
      {list.map((item) => (
        <div key={item.id} className="post">
          <h2 className="title">{item.title}</h2>
          <p className="postTextContainer">{item.post}</p>
          <div className="deletePost">
            {auth.currentUser && item.author.id === auth.currentUser.uid && (
              <button onClick={() => deletePost(item.id)}>X</button>
            )}
          </div>
          <h4 className="author">@{item.author.name}</h4>
        </div>
      ))}
    </div>
  );
}

export default Home;
