import {UsersModel} from '../models/init-models.js';
import hash from 'sha256';

export const getLoggedInUser = async (req, res) => {
  if(req.session.userName && req.session.isLoggedIn) {
    res.json({message: 'User is logged in', status: 'OK'});
  } else {
    res.json({message: 'User is not logged in', status: 'Error'});
  }
}

export const isUserNameAvailable = async (req, res) => {
  const username = req.params.username;

  try {
    const findUser = UsersModel.findOne({where: {username: username}});
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
  const userId = req.body.userId;
    try {
      const loginInstance = await UsersModel.findOne({where: {username: userId}});
      if(loginInstance) {
        const hashedPasswd = hash(req.body.passwd + loginInstance.salt);
        if(loginInstance.passwd === hashedPasswd) {
          req.session.userName = loginInstance.username;
          req.session.isLoggedIn = true;

          res.json({message: 'User logged in successfully', status: 'OK'});
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

}

export const logout = async (req, res) => {
  req.session.destroy();

  res.redirect('/');
}
