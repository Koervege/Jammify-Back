module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    name: {
      tyoe: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.String,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  };

  const userOps = {
    timestamps: true,
    tableName: 'users',
  };

  const User = sequelize.define('User', userSchema, userOps);

  User.associate = (db) => {
    db.User.hasMany(db.SynthPatch);
  };

  return User;
};
