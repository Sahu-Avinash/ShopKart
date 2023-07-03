import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: `Alerady register please login`,
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    }).save();
    res.status(201).send({
      success: true,
      message: `user registered successfully`,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Registration`,
      error,
    });
  }
};

//login
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: `Invalid email or password`,
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: `Email is not registered`,
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: `Invalid email or Password`,
      });
    }
    // token

    const token = await JWT.sign({ _id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "7d",
    });
    res.status(200).send({
        success:true,
        message:`login done successfully`,
        user:{
          _id:user._id,
            name:user.name,
            email:user.email,
            phone:user.phone,
            address:user.address,
            role:user.role
        },
        token
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in  login`,
      error,
    });
  }
};


export const forgotPasswordController = async(req,res)=>
{
    try {
         const {email,answer,newPassword} =req.body
         if(!email)
         {
           res.status(400).send({message:`Email is required`})
         }
         if(!answer)
         {
           res.status(400).send({message:`answer is required`})
         }
         if(!newPassword)
         {
           res.status(400).send({message:` New Password is required`})
         }
   const user = await userModel.findOne({email,answer})

   if(!user)
  {
    return res.status(404).send({
      success:true,
      message:`Wrong Email or Answer`
    })
  }
  const hashed= await hashPassword(newPassword);
  await userModel.findByIdAndUpdate(user._id,{password:hashed});
  res.status(200).send({
    success:true,
    message:`Password Reset Successfully`,
  })
    } catch (error) {
       console.log(error),
       res.status(500).send({
        success:false,
        message:`Something went wrong`,
        error
       })
    }
}







// test

export const testController = (req,res)=>
{
    res.send(`protected route`);
}
