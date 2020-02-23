// schema是原始Schema; options是参数
module.exports = function(schema, options) {
  // 添加字段
  schema.add({lastModified: Date});
  // 钩子；每次更新前添加变更时间
  schema.pre('save', function(next) {
    this.lastModified = new Date();
    next();
  })
}