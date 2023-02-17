import {logger} from "sequelize/lib/utils/logger";

require('dotenv').config();
import express from "express";
import db from "./config/database.js";
import userRoutes from "./routes/index.js";
import cors from "cors";
import sessions from 'express-session';
import hash from 'sha256';
import cookieParser from 'cookie-parser';
import {UsersModel} from './models/init-models.js';

const app = express();
try {
   await db.authenticate();
   console.log('Database connected...');
} catch (error) {
   console.error('Connection error:', error);
}
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(sessions({
   secret: process.env.SECRET,
   saveUninitialized: true,
   cookie: {
      maxAge: 24*60*60*1000
   },
   resave: false
}));

var session = null;

app.get('/',async (req, res) => {
   if(session.userId) {
      // res.sendFile();  -> send the home page
   } else {
      // res.redirect('/login');  -> redirect to the login page
   }
});

app.route('/login')
    .get((req, res) => {
       // res.sendFile();  -> send the login page
    })
    .post(async (req, res) => {
       const userId = req.body.userId;
       try {
          const loginInstance = await UsersModel.findOne({where: {username: userId}});
          if(loginInstance) {
             if(loginInstance.passwd === req.body.password) {
                session = req.session;
                session.userId = userId;

                // res.sendFile();  -> send the home page
             } else {
                res.json({message: 'Incorrect password'});
             }
          } else {
             res.json({message: 'User does not exist'});
          }
       } catch(error) {
          console.log("Error occured: " + error.message);
       }
    });

app.route('/register')
    .get((req, res) => {
       // res.sendFile();  -> send the register page
    })
    .post(async (req, res) => {
       try {
          const newUser = await UsersModel.create();  // user attributes incomplete

          res.redirect('/login');
       } catch(error) {
           console.log('Error: ' + error.message);
      }
    });

app.get('/logout', (req, res) => {
   req.session.destroy();
   session = null;

   res.redirect('/');
})

app.use('/', userRoutes);
app.listen(process.env.PORT, () => console.log('Server running at port %',process.env.PORT));
