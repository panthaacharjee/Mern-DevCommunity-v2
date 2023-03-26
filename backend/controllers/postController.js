const catchAsyncError = require("../middlewares/catchAsyncError");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhandler");

//Create Post
exports.createPost = catchAsyncError(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  const newPostData = {
    caption: req.body.caption,
    owner: req.user._id,
  };

  const newPost = await Post.create(newPostData);
  const user = await User.findById(req.user._id);
  user.posts.push(newPost._id);
  await user.save();

  res.status(200).json({
    success: true,
    post: newPost,
  });
});

//Get All Post
exports.getAllPosts = catchAsyncError(async (req, res, next) => {
  const posts = await Post.find().populate("owner");

  res.status(200).json({
    success: true,
    posts: posts,
  });
});

//Single Post
exports.getPost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  res.status(201).json({
    success: true,
    post: post,
  });
});

//Delete Post
exports.deletePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Unauthorized", 401));
  } else {
    await Post.findByIdAndDelete(req.params.id);

    const user = await User.findById(req.user._id);
    const index = user.posts.indexOf(req.params.id);
    user.posts.splice(index, 1);
    await user.save();
  }

  res.status(200).json({
    success: true,
    message: "Post Successfully Deleted",
  });
});

// Like and Unlike Post
exports.likeAndUnlikePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (post.likes.includes(req.user._id)) {
    const index = post.likes.indexOf(req.user._id);
    post.likes.splice(index, 1);
    await post.save();
    return res.status(200).json({
      success: true,
      message: "Post Unliked",
    });
  }
  post.likes.push(req.user.id);
  await post.save();
  return res.status(200).json({
    success: true,
    message: "Post Liked",
  });
});

// Update Caption and Description
exports.updatePost = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (post.owner.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("Unauthorized", 401));
  }

  const updatePost = {
    caption: req.body.caption,
    description: req.body.description,
  };

  const Newpost = await Post.findByIdAndUpdate(req.params.id, updatePost, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  return res.status(200).json({
    success: true,
    posts: Newpost,
  });
});

// Create Comment and Update Comment
exports.addComment = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  const newComment = {
    user: req.user._id,
    comment: req.body.comment,
    image: req.body.image,
  };
  post.comments.push(newComment);

  await post.save();

  return res.status(200).json({
    success: true,
    message: "Comment Added",
  });
});

//Update Comment
exports.updateComment = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  let commentIndex = -1;
  post.comments.forEach((item, index) => {
    if (item._id.toString() === req.body.commentId.toString()) {
      commentIndex = index;
    }
  });
  if (commentIndex !== -1) {
    post.comments[commentIndex].comment = req.body.comment;
    post.comments[commentIndex].image = req.body.image;
  }

  await post.save();
  res.status(200).json({
    success: true,
    message: "Comment Updated Successfully",
  });
});

//Delete Comment
exports.deleteComment = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (post.owner.toString() === req.user._id.toString()) {
    post.comments.forEach((item, index) => {
      if (item._id.toString() === req.body.commentId.toString()) {
        return post.comments.splice(index, 1);
      }
    });

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Selected Comment Deleted Successfully",
    });
  } else {
    post.comments.forEach((item, index) => {
      if (item.user.toString() === req.user._id.toString()) {
        if (item._id.toString() === req.body.commentId.toString()) {
          return post.comments.splice(index, 1);
        }
      }
    });
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Comment Deleted Successfully",
    });
  }
});

//Like Comment
exports.likeAndunlikeComment = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  let commentIndex = -1;
  post.comments.forEach((item, index) => {
    if (item._id.toString() === req.body.commentId.toString()) {
      commentIndex = index;
    }
  });
  if (commentIndex !== -1) {
    if (post.comments[commentIndex].likes.includes(req.user._id)) {
      const index = post.comments[commentIndex].likes.indexOf(req.user._id);
      post.comments[commentIndex].likes.splice(index, 1);
      await post.save();
      return res.status(200).json({
        success: true,
        message: "Comment Unliked",
      });
    }

    post.comments[commentIndex].likes.push(req.user._id);
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Comment Liked",
    });
  }
});

// Add A Reply
exports.addReply = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }
  const newReply = {
    user: req.user._id,
    reply: req.body.reply,
    image: req.body.image,
  };

  let commentIndex = -1;
  post.comments.forEach((item, index) => {
    if (item._id.toString() === req.body.commentId.toString()) {
      commentIndex = index;
    }
  });

  if (commentIndex !== -1) {
    post.comments[commentIndex].replies.push(newReply);
  }

  await post.save();
  res.status(200).json({
    success: true,
    message: "Added Successfully",
  });
});

//Like Reply
exports.likeAndunlikeReply = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  let commentIndex = -1;
  post.comments.forEach((item, index) => {
    if (item._id.toString() === req.body.commentId.toString()) {
      commentIndex = index;
    }
  });

  if (commentIndex !== -1) {
    let replyIndex = -1;
    post.comments[commentIndex].replies.forEach((item, index) => {
      if (item._id.toString() === req.body.replyId.toString()) {
        replyIndex = index;
      }
    });

    if (replyIndex !== -1) {
      if (
        post.comments[commentIndex].replies[replyIndex].likes.includes(
          req.user._id
        )
      ) {
        const index = post.comments[commentIndex].replies[
          replyIndex
        ].likes.indexOf(req.user._id);
        post.comments[commentIndex].replies[replyIndex].likes.splice(index, 1);
        await post.save();
        return res.status(200).json({
          success: true,
          message: "Reply Unliked",
        });
      }

      post.comments[commentIndex].replies[replyIndex].likes.push(req.user._id);
      await post.save();

      return res.status(200).json({
        success: true,
        message: "Reply Liked",
      });
    }
  }
});

//Delete Reply
exports.deleteReply = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  if (post.owner.toString() === req.user._id.toString()) {
    let commentIndex = -1;
    post.comments.forEach((item, index) => {
      if (item._id.toString() === req.body.commentId.toString()) {
        // return post.comments.splice(index, 1);
        commentIndex = index;
      }
    });
    if (commentIndex !== -1) {
      post.comments[commentIndex].replies.forEach((item, index) => {
        if (item._id.toString() === req.body.replyId.toString()) {
          return post.comments[commentIndex].replies.splice(index, 1);
        }
      });
    }

    await post.save();

    return res.status(200).json({
      success: true,
      message: "Selected Reply Deleted Successfully",
    });
  } else {
    let commentIndex = -1;
    post.comments.forEach((item, index) => {
      if (item._id.toString() === req.body.commentId.toString()) {
        // return post.comments.splice(index, 1);
        commentIndex = index;
      }
    });
    if (commentIndex !== -1) {
      post.comments[commentIndex].replies.forEach((item, index) => {
        if (item._id.toString() === req.body.replyId.toString()) {
          return post.comments[commentIndex].replies.splice(index, 1);
        }
      });
    }
    await post.save();

    return res.status(200).json({
      success: true,
      message: "Reply Deleted Successfully",
    });
  }
});

//Update Reply
exports.updateReply = catchAsyncError(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post Not Found", 404));
  }

  let commentIndex = -1;
  post.comments.forEach((item, index) => {
    if (item._id.toString() === req.body.commentId.toString()) {
      commentIndex = index;
    }
  });
  if (commentIndex !== -1) {
    post.comments[commentIndex].replies.forEach((item, index) => {
      if (item.user._id.toString() === req.user._id.toString()) {
        if (item._id.toString() === req.body.replyId.toString()) {
          post.comments[commentIndex].replies[index].reply = req.body.reply;
          post.comments[commentIndex].replies[index].image = req.body.image;
        }
      }
    });
  }

  await post.save();
  res.status(200).json({
    success: true,
    message: "Reply Updated Successfully",
  });
});

//Get User Post  ---Developer
exports.getMyPost = catchAsyncError(async (req, res, next) => {
  const userPost = await Post.find({ owner: req.user._id });

  // const userPosts = await user.populate("posts");
  res.status(200).json({
    success: true,
    posts: userPost,
  });
});
