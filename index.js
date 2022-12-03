import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
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


app.listen(process.env.APP_PORT, ()=>{
    console.log('Server Berjalan Pada Port 5000');
});