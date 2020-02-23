let mongoose = require('mongoose');
let ObjectId = mongoose.Schema.Types.ObjectId;
let conn = mongoose.createConnection('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}); 

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  age: Number,
  password: String,
  createAt: {type: Date, default: Date.now}
}, {collection: 'user'}); //指定集合名称为user;否则默认users
const ArticleSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {type: ObjectId, ref: 'User'} //ref表明该字段为外键；对应模型名称
});

const User = conn.model('User', UserSchema);
const Article = conn.model('Article', ArticleSchema);

// 带外键查询
(async function() {
  const user = await User.create({username: 'lyra', age: 10, password: 1});
  await Article.create({title: '标题', content: '内容', author: user._id})
  // 查看文章的信息-包含作者的具体信息-populate的参数是外键对应的字段名称
  const article = await Article.findById('5e4d6c2eb8ba3590edada416').populate('author'); 
  console.log(article)
})()

// 分页查询
const pageSize = 3;
const pageNum = 2;
const users = [];
for(let i=0; i< 10; i++) {
  users.push({username: 'lyra'+i, password: i, age: 18+i})
}
(async function() {
  await User.create(users);
  User.find().sort({age: 1}).skip((pageNum-1)*pageSize).limit(pageSize).exec(function(err, result) {
    if(!err) {
      console.log(result);
    }
  })
})();


