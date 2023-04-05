import React from "react";

function Post({ post }) {
  return (
    <div>
      <p>{post.text}</p>
    </div>
  );
}

export default Post;
