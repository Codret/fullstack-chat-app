import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js'
import bycrypt from 'bcryptjs'
import cloudinary from '../lib/cloudinary.js';

export const signup = async (req, res) =>{
    const {email, password, fullName} = req.body;
    try {
        if(!email || !password || !fullName){
            return res.status(400).json({message: "All fields are required"});
        }

         if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 character"});
         }

         const user = await User.findOne({email})

         if(user) return res.status(400).json({message:"Email already exists"})

         const salt = await bycrypt.genSalt(10);
        const hashPassword = await bycrypt.hash(password, salt);

         const newUser = new User({
            fullName, 
            email,
            password:hashPassword,
         })

         if(newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })
         }else{
            res.status(400).json({message:"Invalid user data"})
         }

    } catch (error) {
        
        console.log("error in signup Controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const login = async (req, res) =>{
    const {email, password} = req.body;
   
    try {

        const user = await User.findOne({email});
        
        if(!user){
            return res.status(404).json({message: "Invalid Credentials"})
        }

        const isPasswordCorrect = await bycrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(404).json({message: "Invalid Credentials"})
        }

        generateToken(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        })

    } catch (error) {
        console.log("error in signup Controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout = (req, res) =>{
    try {
        res.cookie("jwt", "", {maxAge:0})
        res.status(200).json({message: "LogOut Successfully"})
    } catch (error) {
        console.log("error in signup Controller", error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const updateprofile = async (req, res) =>{
    try {
        
        const {profilePic} = req.body;
        const userId = req.user._id;

        if(!profilePic) {
            return res.status(404).json({message: 'Profile pic is required'})
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId, {profilePic:uploadResponse.secure_url}, {new:true} );

        res.status(200).json(updatedUser);

    } catch (error) {
        console.log("error in update profile", error);
        res.status(500).json({message: "Internal Server Error"})
        
    }
}

export const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log('Error in checkAuth controller ', error.message);
        res.status(500).json({message: "Internal Server Error"})
    }
}

