import User from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async(req, res) => {
    try{
        const response = await User.findAll();
        res.status(200).json({response});
    } catch {
        res.status(500).json({msg: error.message});
    }
}

export const getUserById = async (req, res) => {
    try{
        const response = await User.findOne({
            where: {
                uuid: req.params.id,
            }
        });
        res.status(200).json({response});
    } catch {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = async (req, res) => {
    const {name, email, password, confPassword, number, role} = req.body;
    if (password !== confPassword) return res.status(400).json({msg: 'Password Tidak Sama!!'});
    const hashPassword = await argon2.hash(password);
    try{
        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            number: number,
            role: role
        });
        res.status(201).json({msg: "Registrasi Berhasil!!"});
    } catch (error){
        res.status(400).json({msg: error.message});
    }
}

export const updateUser = async(req, res) => {
    const user = await User.findOne({
        where: {
            uuid: req.params.id,
        }
    });
    if(!user) return res.status(404).json({ message: "User not found" });
    const { name, email, password, number, confPassword , role } = req.body;
    let hashedPassword;
    if (password === "" || confPassword === null) {
        hashedPassword = user.password;
    } else {
        hashedPassword = await argon2.hash(password);
    }
    if (password !== confPassword) return res.status(400).json({ message: "Password does not match" });
    try {
        await User.update({
            name : name,
            email : email,
            password : hashedPassword,
            number : number,
            role : role
        },{
            where :{
                id : user.id
            }
        }
        );
        res.status(201).json({ message: "User berhasil diupdate" });
    } catch {
        res.status(400).json(error);
    }
}

export const deleteUser = (req, res) => {
    
}