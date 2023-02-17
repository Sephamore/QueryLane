import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import db from "../config/database.js"; 

import _comments from  "./comments.js";
import _posts from  "./posts.js";
import _tags from  "./tags.js";
import _users from  "./users.js";
import _votes from  "./votes.js";

export const CommentsModel = _comments.init(db, DataTypes);
export const PostsModel = _posts.init(db, DataTypes);
export const TagsModel = _tags.init(db, DataTypes);
export const UsersModel = _users.init(db, DataTypes);
export const VotesModel = _votes.init(db, DataTypes);

/*
export default function initModels(sequelize) {
  const comments = _comments.init(sequelize, DataTypes);
  const posts = _posts.init(sequelize, DataTypes);
  const tags = _tags.init(sequelize, DataTypes);
  const users = _users.init(sequelize, DataTypes);
  const votes = _votes.init(sequelize, DataTypes);


  return {
    comments,
    posts,
    tags,
    users,
    votes,
  };
}

*/
