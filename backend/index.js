import dotenv from "dotenv"
import express from "express";
import db from "./config/database.js";
import userRoutes from "./routes/index.js";
import cors from "cors";
import sessions from 'express-session';
import cookieParser from 'cookie-parser';

dotenv.config()

const app = express();
try {
   await db.authenticate();
   console.log('Database connected...');
} catch (error) {
   console.error('Connection error:', error);
}
app.use(cors({
   origin: [
      "http://127.0.0.1:3000",
      "http://20.193.230.163:3000",
      "http://localhost:3000",
      "http://querylane.centralindia.cloudapp.azure.com:3000"
   ],
   credentials: true,
}));
app.use(sessions({
   secret: process.env.SECRET,
   saveUninitialized: true,
   cookie: {
      maxAge: 24*60*60*100000,
      secure: false,
      sameSite: "none",
      httpOnly: true
   },
   resave: false,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', userRoutes);
app.listen(process.env.PORT, () => console.log('Server running at port %',process.env.PORT));
