/**
 * 例如： 在注册的用户信息保存save()之前，需要将密码通过加盐算法进行加密
 */
const mongoose = require('mongoose');
const crypto = require('crypto');
const conn = mongoose.createConnection('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const { Schema } = mongoose;
const UserSchema = new Schema({
  username: String,
  password: String,
  createAt: {type: Date, default: Date.now}
}, {collection: 'user'});
// save()前添加钩子
UserSchema.pre('save', function(next) {
  this.password = crypto.createHmac('sha256', 'lyra').update(this.password).digest('base64');
  next();
});
const User = conn.model('User', UserSchema);

(async function register(username, password) {
  const user = new User({username, password});
  user.save();
})('a', '1');
