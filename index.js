import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
// import db from "./config/Database.js";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
dotenv.config();

const app = express();

// (async()=>{
//     await db.sync();
// })();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: "auto"
    }
}))

app.use(cors({
    credentials: true,
    origin: 'http://localhost:8100'
}))
app.use(express.json());
app.use(ProductRoute);
app.use(UserRoute);
app.use(AuthRoute);


app.listen(process.env.APP_PORT, ()=>{
    console.log('Server Berjalan Pada Port 5000');
});