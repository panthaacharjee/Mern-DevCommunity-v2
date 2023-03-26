const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: [true, "Please enter post heading"],
  },
  images: [
    {
      image: {
        public_id: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          // required: true,
        },
      },
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      comment: {
        type: String,
      },
      image: {
        type: String,
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "userModel",
        },
      ],
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
          },
          reply: {
            type: String,
          },
          image: {
            type: String,
          },
          likes: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "user",
            },
          ],
          createdAt: {
            type: Date,
            default: Date.now(),
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("post", postSchema);
