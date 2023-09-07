import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  message: String,
  creator: {
    type: String,
    trim: true,
  },
  tags: [String],
  selectedFile: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// postSchema.pre('save', function (next) {
//   this.tags = this.tags[0].split(',').map((item) => item.trim());
//   next();
// });

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
