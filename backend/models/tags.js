import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class tags extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    excerpt_post_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    wiki_post_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    tag_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'tags',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "tags_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}
