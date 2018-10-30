module.exports = function(sequelize, DataTypes) {
  return sequelize.define("comment", {
    title: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.STRING
    }
  });
};
