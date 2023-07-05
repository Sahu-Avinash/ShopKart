import express from "express"

const router = express.Router()

import {forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController,testController, updateProfileController} from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//register
router.post("/register",registerController);

//login
router.post("/login",loginController);

router.post('/forgot-password', forgotPasswordController)

router.get('/test',requireSignIn, isAdmin  ,testController)

// protected route

router.get('/user-auth',requireSignIn, (req,res)=>
{
    res.status(200).send({
        ok:true,
    })
})

router.get('/admin-auth',requireSignIn,isAdmin, (req,res)=>
{
    res.status(200).send({
        ok:true,
    })
})

router.put('/profile',requireSignIn, updateProfileController);

router.get('/orders',requireSignIn, getOrdersController);

router.get('/all-orders',requireSignIn,isAdmin, getAllOrdersController)

router.put("/order-status/:orderId",requireSignIn,isAdmin,orderStatusController)

export default router