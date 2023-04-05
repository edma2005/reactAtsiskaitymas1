import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
`;

const Question = styled.h1`
  font-size: 24px;
  margin-bottom: 8px;
`;

const Title = styled.h3`
  font-size: 20px;
  margin-bottom: 16px;
`;

const Answer = styled.h2`
  font-size: 20px;
  margin-bottom: 8px;
`;

const Content = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 16px;
`;

const Button = styled.button`
  font-size: 16px;
  padding: 8px 16px;
  margin-right: 8px;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #0062cc;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const PostsListWrapper = styled.div`
  margin-top: 20px;
`;

const PostsListTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const PopupContainer = styled.div`
  position: fixed;
  display: flex;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 300px;
  background-color: yellow;
  border: 1px solid gray;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
`;

const Post = (props) => (
  <Wrapper>
    <div>
      <Question>QUESTION</Question>
      <Title>{props.post.title}</Title>
    </div>
    <div>
      <Answer>ANSWER</Answer>
      <Content>{props.post.content}</Content>
    </div>
    <Button onClick={() => props.deletePost(props.post._id)}>Delete</Button>
    <Button onClick={() => props.editPost(props.post._id)}>Edit</Button>
  </Wrapper>
);

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:5000/posts/${id}`)
      .then(() => {
        setPosts(posts.filter((post) => post._id !== id));
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const editPost = (id) => {
    setEditingPost(id);
  };

  const updatePost = (id, updatedPost) => {
    axios
      .put(`http://localhost:5000/posts/${id}`, updatedPost)
      .then(() => {
        const updatedPosts = [...posts];
        const index = updatedPosts.findIndex((post) => post._id === id);
        updatedPosts[index] = updatedPost;
        setPosts(updatedPosts);
        setEditingPost(null);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const postList = () => {
    return posts.map((currentPost) => {
      return (
        <div key={currentPost._id}>
          {editingPost === currentPost._id ? (
            <PopupContainer>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updatePost(currentPost._id, {
                    title: e.target.title.value,
                    content: e.target.content.value,
                  });
                }}
              >
                <input
                  type="text"
                  name="title"
                  defaultValue={currentPost.title}
                />
                <input
                  type="text"
                  name="content"
                  defaultValue={currentPost.content}
                />
                <Button>
                  <button type="submit">Save</button>
                </Button>
              </form>
              <Button>
                <button onClick={() => setEditingPost(null)}>Cancel</button>
              </Button>
            </PopupContainer>
          ) : (
            <Post
              post={currentPost}
              deletePost={deletePost}
              editPost={editPost}
            />
          )}
        </div>
      );
    });
  };

  return (
    <PostsListWrapper>
      <PostsListTitle>List of Questions</PostsListTitle>
      {postList()}
    </PostsListWrapper>
  );
};
export default PostsList;
