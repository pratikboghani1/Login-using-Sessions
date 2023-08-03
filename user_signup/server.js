import express from "express";
import bodyParser from "body-parser";

import session from "express-session";

import MongoStore from "connect-mongo";

import router from "./routes/web.js";
import {} from "dotenv/config";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.MONGO_URI;

const session_store = MongoStore.create({
  mongoUrl: uri,
  dbName: "Leons_users",
  collectionName: "Lenos_sessions",
});

app.use(
  session({
    secret: "Any Secret Key to Sign Cookies",
    resave: false,
    saveUninitialized: false,
    store: session_store,
  })
);

app.set("view engine", "ejs");

app.listen(4500, () => {
  console.log("App is listening at port 4500 !!!");
});

app.use("/", router);

// app.get('/',(req,res)=>{

//     res.render("home.ejs")
// })
