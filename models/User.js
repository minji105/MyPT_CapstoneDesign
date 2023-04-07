const bcrypt = require('bcrypt');
const saltRounds = 10;
const mongoose = require('mongoose'); // mongoose를 선언해주고,

const userSchema = mongoose.Schema({  // userSchema라는 이름의 schema를 작성해준다. 
  id: { 
    type: String,
    maxLength: 10,
  },
  pw: {
    type: String,
    maxLength: 60, // bcrypt hash의 길이는 60입니다.
    trim: true, // space를 없애준다.
    unique: 1, // 같은값은 하나만 존재할 수 있다.
  },
  name: {
    type: String,
    maxLength: 10,
  },
  email: { 
    type: String, 
    required: true ,
    unique: true,
  },
  birth: {
    type: String, 
    required: true ,
  }
});

// pre hook 함수를 사용하여 pw 필드를 해시화합니다.
userSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('pw')) return next();

  bcrypt.genSalt(saltRounds, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.pw, salt, function(err, hash) {
      if (err) return next(err);

      user.pw = hash;
      next();
    });
  });
});

const User = mongoose.model('User', userSchema); // userSchema를 model로 감싸준다. 

module.exports = { User }; // User라는 모델을 본 파일 밖에서도 사용할 수 있도록 export 구문을 작성해준다. 