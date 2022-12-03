import Product from "../models/ProductModel.js";
import User from '../models/UserModel.js';
import { Op } from "sequelize";
import path from "path";
import fs from "fs";

export const getProducts = async (req, res) => {
    try{
        let response;
        if(req.role === "admin"){
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price', 'url'],
                include:[{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await Product.findAll({
                where:{
                    userId : req.userId
                },
                include:[{
                    model: User,
                }]
            });
        }
        res.status(200).json({response});
    } catch (error){
        res.status(500).json({msg: error.message});
    }
}

export const getProductById = async (req, res) => {
    try{
        const product = await Product.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product){
            return res.status(404).json({msg: "product tidak ditemukan"});
        }
        let response;
        if(req.role === "admin"){
            response = await Product.findAll({
                attributes: ['uuid', 'name', 'price', 'url'],
                where:{
                   id: product.id
                },
                include:[{
                    model: User,
                    attributes: ['name', 'email', 'role']
                }]
            });
        } else {
            response = await Product.findAll({
                where:{
                    [Op.and]: [{userId : req.userId}, {id: product.id}],
                },
                include:[{
                    model: User,
                }]
            });
        }
        res.status(200).json({response});
    } catch (error){
        res.status(500).json({msg: error.message});
    }
}

export const createProduct = (req, res) => {
    if(req.files === null) return res.status(400).json({msg: "No File Uploaded"});
    const {
        price = req.body.price,
        name = req.body.title,
        file = req.files.file,
        fileSize = file.data.length,
        ext = path.extname(file.name),
        fileName = file.md5 + ext,
        url = `${req.protocol}://${req.get("host")}/images/${fileName}`,
        allowedType = ['.png','.jpg','.jpeg'],
    } = req.body;
 
    if(!allowedType.includes(ext.toLowerCase())) return res.status(422).json({msg: "Invalid Images"});
    if(fileSize > 5000000) return res.status(422).json({msg: "Image must be less than 5 MB"});
 
    file.mv(`./public/images/${fileName}`, async(err)=>{
        if(err) return res.status(500).json({msg: err.message});
        try {
            await Product.create({
                name: name,
                price: price,
                image: fileName,
                url: url,
                userId: req.userId
            });
            res.status(201).json({msg: "Product Created Successfuly"});
        } catch (error) {
            console.log(error.message);
        }
    });
}

export const updateProduct = (req, res) => {
    
}

export const deleteProduct = async (req, res) => {
    const product = await Product.findOne({
        where:{
            uuid : req.params.id
        }
    });
    if(!product) return res.status(404).json({msg: "No Data Found"});
 
    try {
        const filepath = `./public/images/${product.image}`;
        fs.unlinkSync(filepath);
        await Product.destroy({
            where:{
                uuid : req.params.id
            }
        });
        res.status(200).json({msg: "Product telah dihapus"});
    } catch (error) {
        console.log(error.message);
    }
}