import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class posts extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    owner_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    last_editor_user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    post_type_id: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    accepted_answer_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    view_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    answer_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    comment_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    owner_display_name: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    last_editor_display_name: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    tags: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    content_license: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    favorite_count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    community_owned_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    closed_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_edit_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    last_activity_date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'posts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "posts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  }
}




