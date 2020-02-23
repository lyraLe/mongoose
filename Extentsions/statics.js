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
// 扩展Schema类静态方法;要位于model创建之前
UserSchema.statics.login = function(username, password) {
  return this.findOne({username, password});
}

const User = conn.model('User', UserSchema);
(async function() {
  await User.create({username: '1', password: '1'})
})();

// 静态方法校验
(async function(username, password) {
  const result = await User.login(username, password);
  console.log(result);
})('1', '1');

