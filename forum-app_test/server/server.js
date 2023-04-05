const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.URI;

mongoose
  .connect(uri, { useNewUrlParser: true, dbName: "test" })
  .then(() => console.log("connected to db!"))
  .catch((error) => console.log(error));

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

console.log(process.env.URI);

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

app.get("/posts", (req, res) => {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.post("/posts/add", (req, res) => {
  const { title, content } = req.body;

  const newPost = new Post({ title, content });

  newPost
    .save()
    .then(() => res.json("Post added!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  Post.findByIdAndUpdate(id, { title, content })
    .then(() => res.json("Post updated!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;

  Post.findByIdAndDelete(id)
    .then(() => res.json("Post deleted!"))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
