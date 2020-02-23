const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017/school', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const { Schema } = mongoose;
const UserSchema = new Schema({
  username: String,
  password: String,
  createAt: {type: Date, default: Date.now}
})

// 扩展实体方法;要位于model创建之前
UserSchema.methods.login = function() {
  // 从实体获取模型的方法this.model('User')
  return this.model('User').findOne({username: this.username, password: this.password})
}

const User = conn.model('User', UserSchema);
(async function() {
  await User.create({username: '1', password: '1'})
})();

// 实体方法校验
(async function() {
  const user = new User({username: '1', password: '1'});
  const result = await user.login();
  console.log(result);
})()
