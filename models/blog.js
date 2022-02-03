require("dotenv").config();
const { ObjectId } = require("bson");
const mongoose = require("mongoose");
var blogDb = mongoose.createConnection(process.env.BLOG_MONGO_URI);

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    blogContent: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  { versionKey: "revisions" }
);

module.exports = blogDb.model("Blog", blogSchema);
