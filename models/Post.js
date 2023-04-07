const mongoose = require('mongoose'); // mongoose를 선언해주고,

const postSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
  title: { 
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true, 
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdAt: {
    type:Date, 
    default:Date.now
  }
});

const Post = mongoose.model('post', postSchema); // userSchema를 model로 감싸준다. 

module.exports = { Post }; // User라는 모델을 본 파일 밖에서도 사용할 수 있도록 export 구문을 작성해준다. 