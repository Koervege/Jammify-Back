module.exports = (sequelize, DataTypes) => {
  const userSchema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const userOps = {
    timestamps: true,
    tableName: 'users',
    initialAutoIncrement: 2,
  };

  const User = sequelize.define('User', userSchema, userOps)

  return User;
}; 
