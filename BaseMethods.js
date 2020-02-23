let mongoose = require('mongoose');
let conn = mongoose.createConnection('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); 
const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  age: Number,
  password: String,
  createAt: {type: Date, default: Date.now}
});
const User = conn.model('User', UserSchema);

(async function() {
  try{  
    // 插入文档
    let user1 = await User.create({username: "lyra", age: 18});
    let user2 = await User.create({username: "lee", age: 10});
    // 更新文档
    let updatedUser1 = await User.updateOne({username: 'lyra'}, {username: 'lyraLee'});
    let updatedUser2 = await User.updateMany({}, {password: '123456'});
    // 查询文档
    let findUser1 = await User.find({age: {$gte: 10, $lt: 12}});
    console.log(findUser1); // 返回一个数组
    let findUser2 = await User.findOne({});
    console.log(findUser2); // 返回一个对象
    let findUser3 = await User.findById({_id: '5e4d62bab945ba909211d280'});
    console.log(findUser3); // 返回一个对象
  } catch(err) {
    console.log(err);
  }
})();