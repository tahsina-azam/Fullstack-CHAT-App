
import asyncHandler from "express-async-handler"
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signUp = asyncHandler(async (req, res) => {
  try {
    if (Number.isNaN(Number(req.body.Registration))) {
    return res.status(404).json({status:'error', message: " enter a valid number "})
    } 

    const user = await User.User.findOne({ email: req.body.email });
    if (user)
        return res
            .status(409)
            .send({ message: "User with given email already Exist!" });
    
            const student = await User.User.findOne({ Registration: req.body.Registration });
            if (student)
                return res
                    .status(409)
                    .send({ message: "Student with given roll already Exist!" });        

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User.User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  }catch(error){
    res.status(404).json({ status: 'error', message: "check if all the fields are filled up correctly" });
  }
});

export const signIn = asyncHandler(async(req,res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user)
            return res.status(401).json({ message: "Invalid Email or Password" });

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword)
            return res.status(401).json({ message: "Invalid Email or Password" });

        const token = jwt.sign({ email: req.body.email, registration:user.Registration }, 'supersecret', { expiresIn: '2h' });
        // Set the token as a cookie in the response
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Max-Age=${2 * 60 * 60}; Path=/`);

        return res.status(200).json({ message: "Logged in successfully", email: req.body.email, user_id: user._id, registration:user.Registration });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

