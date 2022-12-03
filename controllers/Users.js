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

export const getUserById = (req, res) => {
    try{
        const response = await User.findOne({
            where: {
                uuid: req.params.id;
            }
        });
        res.status(200).json({response});
    } catch {
        res.status(500).json({msg: error.message});
    }
}

export const createUser = (req, res) => {
    
}

export const updateUser = (req, res) => {
    
}

export const deleteUser = (req, res) => {
    
}