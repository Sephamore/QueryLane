import {UsersModel} from '../models/init-models.js';
import { Op } from "sequelize";
import hash from 'sha256';

export const getLoggedInUser = async (req, res) => {
  if(req.session.isLoggedIn) {
    res.json({message: 'User is logged in', status: 'OK', isLoggedIn: true, username: req.session.username, userId: req.session.userId, userDisplayName: req.session.displayName});
  } else {
    res.json({message: 'User is not logged in', status: 'Error'});
  }
  // isLoggedIn, user
}

export const isUserNameAvailable = async (req, res) => {
  const username = req.params.username;

  try {
    const findUser = await UsersModel.findOne({where: {username: username}});
    if(findUser) {
      res.json({message: 'Username already exists', status: 'Error'});
    } else {
      res.json({message: 'Username is available', status: 'OK'});
    }
  } catch(error) {
    console.log("Error occured: " + error.message);
  }
}

export const login = async (req, res) => {
  const username = req.body.username;
    try {
      const loginInstance = await UsersModel.findOne({where: {username: username}});
      if(loginInstance) {
        const hashedPasswd = hash(req.body.password + loginInstance.salt);
        if(loginInstance.passwd === hashedPasswd) {
          req.session.username = loginInstance.username;
          req.session.userId = loginInstance.id;  // using id because account_id data had some null values
          req.session.displayName = loginInstance.display_name;
          req.session.isLoggedIn = true;

          req.session.save((error) => {
              if(!error) {
                  res.json({message: 'User logged in successfully', status: 'OK'});
              } else {
                  console.log(error.message);
              }
          })
        } else {
          res.json({message: 'Incorrect password', status: 'Error'});
        }
      } else {
        res.json({message: 'User does not exist', status: 'Error'});
      }
    } catch(error) {
        console.log("Error occured: " + error.message);
    }
}

export const register = async (req, res) => {
    try {
        const newUser = await UsersModel.create({
            id: await UsersModel.max("id") + 1,
            username: req.body.username,
            salt: req.body.firstName + req.body.lastName,
            passwd: hash(req.body.password + req.body.firstName + req.body.lastName),
            display_name: req.body.firstName + " " + req.body.lastName,
            creation_date: Date.now(),
            last_access_date: Date.now(),
            reputation: 0,
            views: 0,
            down_votes: 0,
            up_votes: 0,
        });

        console.log(newUser);
        res.json({message: 'New user created successfully', status: 'OK'});
    } catch(error) {
        console.log("Error occured while creating new user: " + error);
    }
}

export const logout = async (req, res) => {
  req.session.destroy();
  res.json({
    message: "Logged out successfully"
  })
}


export const getUserProfile = async (req, res) => {
  try {
      const profile = await UsersModel.findOne({
          where: {
              id: req.params.id
          }, 
          attributes: {
            exclude: ['salt', 'passwd', 'username'] 
          }
      });
      res.json(profile);
  } catch (error) {
      res.json({ message: error.message });
  }
}



export const getUserPicture = async (req, res) => {
  try {
      const profile = await UsersModel.findOne({
          where: {
              id: req.params.id
          }, 
          attributes: ["id", "display_name", "profile_image_url" ]
      });
      res.json(profile);
  } catch (error) {
      res.json({ message: error.message });
  }
}

export const getSimilarNames = async (req, res) => {
  try {
      var limit = req.params.limit;
      if(limit === "max" || limit > 1000 || limit < 0 || limit===null ) 
        {limit = 1000;}

      const searchPrefix = req.params.substring + '%';
      const searchSubstring =  '%' + req.params.substring + '%';

      //substring at start
      var results = await UsersModel.findAll({
          where: {
              [Op.or] : [{
                display_name : {[Op.iLike]: searchPrefix }
              },
            
            ]
          }, 
          attributes: ["id", "display_name", "username"],
          order: [['display_name', 'ASC']],
          limit: limit,
      });

      const remaining = limit- results.length ;
      //substring at any location
      if(remaining > 0)
      {
        const resultsSubstring = await UsersModel.findAll({
          where: {
              display_name : {[Op.like]: searchSubstring} 
          }, 
          attributes: ["id", "display_name"],
          limit: remaining 
        });
        results = results.concat(resultsSubstring);
      }

      res.json(results);
  } catch (error) {
      res.json({ message: error.message });
  }
}

export const updateUser = async (req, res) => {
  try {
      if( req.body.id !== req.session.userId)
      {
          throw {message: " user id not same as the one currently logged in"};
      };

      let newData = req.body;
      await newData.keys(values).forEach( async (key) =>  {
        if (values[key] === undefined) {delete values[key];}      // handle undefined
        if (values[key] === null) {values[key] === "";}            // nulls may not be allowed, so set attribute as empty string
        if (key === 'display_name') {await displayNameTrigger(req.body.id, req.body.display_name);}
      }); 

      await PostsModel.update({
          display_name: newData.display_name,
          location: newData.location,
          profile_image_url: newData.profile_image_url,
          website_url: newData.website_url,
          about_me: newData.about_me
      },{
          where: {id: req.body.id}
      });

      res.json({
          message: "User Updated"
      });

  } catch (error) {
      res.json({ message: error.message });
  }
}

// maitains consistency when updating display_name
const displayNameTrigger = async (id, display_name) => {
  await PostsModel.update({
    owner_display_name: display_name,
  },{
      where: {owner_user_id: id}
  });

  await PostsModel.update({
    last_editor_display_name: display_name,
  },{
      where: {last_editor_user_id: id}
  });

  await CommentsModel.update({
    user_display_name: display_name,
  },{
      where: {user_id: id}
  });
}