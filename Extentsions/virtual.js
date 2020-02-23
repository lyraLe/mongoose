const mongoose = require('mongoose');
const conn = mongoose.createConnection('mongodb://localhost:27017/mydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
  username: String,
  phoneNumber: String,
  province: String,
  city: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});
/*如果想要获取用户所在的区号，需要从phoneNumber中截取；
如果想要获取用户的完整地址，需要拼接province+city
为了更加语义化，则可以使用虚拟属性*/
UserSchema.virtual('areaNumber').get(function(){
  return this.phoneNumber.split('-')[0];
});
UserSchema.virtual('address').get(function() {
  return `${this.province} ${this.city}`;
})

const User = conn.model('User', UserSchema); 
const user = new User({
  username: 'lyra', 
  phoneNumber: '010-123456', 
  province: 'HeiLongJiang',
  city: 'HaErBin'
});

console.log(user.areaNumber); // 010
console.log(user.address); // HeiLongJiang HaErBin

