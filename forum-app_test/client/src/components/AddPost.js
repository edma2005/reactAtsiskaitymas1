import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const PostAddWrapper = styled.div`
  padding: 20px;
  border-radius: 4px;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
`;

const SubmitButton = styled.input`
  background-color: #008cba;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #006d90;
  }
`;

const PostAdd = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const post = {
      title,
      content,
    };

    axios
      .post("http://localhost:5000/posts/add", post)
      .then((res) => {
        console.log(res.data);
        window.location.reload();
      })
      .catch((err) => console.log(err));
    setTitle("");
    setContent("");
  };

  return (
    <PostAddWrapper>
      <h2>Add New Question</h2>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Title of the Question:</Label>
          <Input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Answer for Question:</Label>
          <TextArea
            required
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <SubmitButton type="submit" value="Add Post" />
        </FormGroup>
      </Form>
    </PostAddWrapper>
  );
};

export default PostAdd;
