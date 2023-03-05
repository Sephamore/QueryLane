import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: "users_username_key"
    },
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    account_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    reputation: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    down_votes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    up_votes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    display_name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    profile_image_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    website_url: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    about_me: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    creation_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    last_access_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    salt: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    passwd: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    initialAutoIncrement: 424000,
    tableName: 'users',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "users_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "users_username_key",
        unique: true,
        fields: [
          { name: "username" },
        ]
      },
    ]
  });
  }
}
