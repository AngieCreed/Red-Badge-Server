const sequelize = require("./db");

var User = sequelize.import("./models/User");
var Admin = sequelize.import("./models/Admin");
var Item = sequelize.import("./models/Item");
var Comment = sequelize.import("./models/Comment");
var RedBadgeForum = sequelize.import("./models/RedBadgeForum");

User.hasMany(Item);
Item.belongsTo(User);
User.hasMany(Comment);
Comment.belongsTo(User);
// RedBadgeForum.hasMany(Comment);
// Comment.belongsTo(RedBadgeForum);

sequelize.sync();

// { force: true }
