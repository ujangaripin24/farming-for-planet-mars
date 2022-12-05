import User from "../models/UserModel.js";
import argon2 from "argon2";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const Login = async(req, res) => {
    const user = await User.findOne({
        where : {
            email: req.body.email
        }
    });
    if (!user) return res.status(404).json({msg: "User tidak terdaftar"});
    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({msg: "Salah Password"});
    req.session.userId = user.uuid;
    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Login Dari Perangkat",
        html: `<h1>Anda Masuk Pada Perangkat</h1>`,
    };
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email sent: ${info.response}`);
        }
    });

    res.status(200).json({uuid, name, email, role});
}

export const Status = async(req, res) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Mohon login terlebih dahulu"});
    }
    const user = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'number','role'],
        where: {
            uuid: req.session.userId
        }
    });
    if (!user) return res.status(400).json({msg: "User Tidak Ada"});
    res.status(200).json(user);
}

export const logOut = (req, res) => {
    req.session.destroy((err) => {
        if(err) return res.status(400).json({msg: "Tidak bisa logout"});
        res.status(200).json({msg: "Anda telah logout"});
    });
}