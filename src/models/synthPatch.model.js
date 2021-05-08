module.exports = (sequelize, DataTypes) => {
  const synthPatchSchema = {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };

  const synthPatchOps = {
    timestamps: true,
    tableName: 'synthPatches',
  };

  const SynthPatch = sequelize.define('synthPatches', synthPatchSchema, synthPatchOps);

  SynthPatch.associate = (db) => {
    db.SynthPatch.belongsTo(db.User);
  };

  return SynthPatch;
};
