import {Admin }from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import { z } from "zod";
import jwt from "jsonwebtoken";
import config from "../config.js";



export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validation schema
  const adminSchema = z.object({
    firstName: z.string().min(3, { message: "First name must be at least 3 characters long" }),
    lastName: z.string().min(3, { message: "Last name must be at least 3 characters long" }),
    email: z.string().email(),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  });

  // Validate data
  const validateData = adminSchema.safeParse(req.body);
  if (!validateData.success) {
    return res.status(400).json({
      errors: validateData.error.issues.map((err) => err.message),
    });
  }

  try {
    const existingAdmin = await Admin.findOne({email: email });
    if (existingAdmin) {
      return res.status(400).json({ errors: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Signup succeeded", newAdmin });
  } catch (error) {
    res.status(500).json({ errors: "Error in signup" });
    console.log("Error in signup", error);
  }
};


export const login=async(req,res)=>
{
  const {email,password}=req.body;

  try{
    const admin = await Admin.findOne({email:email});
    const isPasswordCorrect=await bcrypt.compare(password,admin.password)

    if(!admin || !isPasswordCorrect)
    {
      return res.status(403).json({errors: "Invalid credentials"});
    }
    //jwt code
    const token=jwt.sign({
      id: admin._id,
      
    },config.JWT_ADMIN_PASSWORD,
    {
      expiresIn: "1d" });

      const cookieOptions={
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),//1 day
        httpOnly: true,//cookie are not accessible through js directly
        secure: process.env.NODE_ENV==="production",//true for https only
        sameSite:"Strict"//csrf attack se prevent
      }
    res.cookie("jwt",token,cookieOptions);
    res.status(201).json({message:"Login successful",admin, token});
}
catch(error)
{
  res.status(500).json({errors:"Error in Login"});
  console.log("error in login",error);
}
};

export const logout=(req,res)=>
{
 try {

    if(!req.cookies.jwt)
    {
        return res.status(401).json({errors: "Kindly login first"});
    }
   res.clearCookie("jwt",
    {
      httpOnly: true,
      sameSite:"Strict",
      secure:process.env.NODE_ENV==="production",
    }
   );
  res.status(200).json({message: "Logged out successfully"});
 } catch (error) {
  res.status(500).json({errors:"Error in logout"});
  console.log("Error in logout",error);
  
 }
};