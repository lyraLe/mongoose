## ORM
**Object Relational Mapping 对象关系映射**
- 将对数据库的操作映射成代码对象的操作

## ORM优点
1. 屏蔽数据库操作细节
2. 跨数据库

## Mongoose
- 是MongoDB的对象模型工具
- 在node中写数据库的唯一选择

## 定义Schema
*字段名称/类型/默认值*
```
  const personSchema = new mongoose.Schema({
    name: {type: String, required: true}, // 字符串
    binary: Buffer, // 二进制
    living: Boolean, // 布尔值
    birthday: {type: Date, default: Date.now}, // 日期类型
    age: Number, //Number类型
    // ObjectId类型
    _id: Schema.Types.ObjectId, // 主键
    _fk: Schema.Types.ObjectId, // 外键；其他集合的主键
    //数组类型
    array: [], 
    arrOfString: [String], //字符串数组
    arrOfNumber: [Number], //数字数组
    arrOfDate: [Date], //日期数组
    arrOfBuffer: [Buffer], //Buffer数组
    arrOfBoolean: [Boolean], //布尔数组
    arrOfObjectId:[Schema.Types.ObjectId] // ObjectId数组
    // 内嵌文档
    nested: {
      name: String
    }
  })
```
## 创建模型
`const User = conn.model('User', UserSchema);`

## 操作方法
> BaseMethods.js

## 高级查询
- 带外键查询
- 分页查询

## 模型扩展
- 静态方法
- 实体方法
- 虚拟属性 
- 钩子
- 插件

