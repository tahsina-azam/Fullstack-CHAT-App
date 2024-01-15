import asyncHandler from "express-async-handler"
import Chat from "../models/chat.js"
import User from "../models/user.js";

export const sendMessage = asyncHandler(async (req, res) => {
   
      
  });

export const fetchUsers = asyncHandler(async(req,res) => {
    try {
        const data = await User.User.find({});
        res.status(200).json({ status: 'success', data: data });
        
    } catch (e) {
        console.error(e);
        res.status(404).json({ status: 'error', message: 'User search could not be performed.' });
    }
});
export const fetchMessage = asyncHandler(async (req, res) => {
   
      
});
