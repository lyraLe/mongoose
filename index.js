let mongoose = require('mongoose');
let conn = mongoose.createConnection('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); //mydb是数据库名称；如果不存在，会自动创建

// 定义Schema
const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: String,
  // default是默认值；Date.now应该是函数，不能写成Date.now()
  createAt: {type: Date, default: Date.now}
});
// 定义数据库的操作模型
/**
 * 1. model函数一个参数时为取值函数
 * 2. 两个参数时为赋值函数
 */
const User = conn.model('User',UserSchema);
/**
User.create({username: "lyra", age: 18}, function(err, result) {
  if (!err) {
    console.log(result)
  }
})
*/
// mongoose的所有方法都返回一个promise
(async function() {
  try{  
    // create的参数和Schema的字段合集为最终结果
    let result = await User.create({username: "lyra", age: 18});
    console.log(result);
    // { _id: 5e4d52d11c7fa38e9f622627,
    //   username: 'lyra',
    //   createAt: 2020-02-19T15:22:57.804Z,
    //   __v: 0 
    // }
  } catch(err) {
    console.log(err);
  }
})();

const zhangsan = new User({username: 'zhangsan', password: 1});
// 可以改成async函数
zhangsan.save(function(err, result) {
  if (!err) {
    console.log(result)
  }
})




// 错误监听
conn.on('error', function(err) {
  console.error(err);
});
// 连接监听
conn.on('open', function() {
  console.log('连接成功');
})