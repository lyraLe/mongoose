const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
}, {collection: 'user'});

// 插件用于在保持原有Schema不变的基础上；修改Schema
let plugin = require('./plugin');
UserSchema.plugin(plugin, {index: true});
const User = conn.model('User', UserSchema);
User.create({username: 'lyra'});
