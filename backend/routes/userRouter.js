const express = require("express");
const {userSchema,updateUserSchema, userSigninSchema} = require("../schemas");
const jwt=require("jsonwebtoken");
const userRouter=express.Router();
const {User,Account} = require("../db");
const JWT_SECRET = require("../config");

userRouter.post("/signup",async (req,res)=>{
    const result = userSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Invalid user data",
            errors: result.error,
        });
    }else{
        // Here you would typically save the user to the database
        const userData = result.data;
        // Check if the user already exists
        const existingUser = await User.findOne({ username: userData.username });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        
        const dbUser = await User.create(userData);

        userId= dbUser._id;;

        // Create an account for the user
        const account = await Account.create({
            userId,
            balance: 1+Math.random()*10000, // Initial balance
        });


        const token= jwt.sign(dbUser._id,JWT_SECRET);

        res.status(201).json({
            message: "User created successfully",
            token:token,
        });
    }

})

userRouter.post("/signin",async (req,res)=>{
    const result = userSigninSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Invalid user data",
            errors: result.error,
        });
    }

    const userData = User.findOne(result.data);
    if(!userData){
        return res.status(404).json({
            message: "User not found",
        });
    }

    const token = jwt.sign(userData._id, JWT_SECRET);

    res.status(200).json({
        message: "User signed in successfully",
        token: token,
    });

})

userRouter.put("/update",authMiddleware,async (req,res)=>{

    const result = updateUserSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            message: "Invalid user data",
            errors: result.error,
        });
    }

    const userData = result.data;

    // Find the user by ID
    const updateRes = await User.updateOne(userData,{_id: req.userId});

    if(updateRes.matchedCount === 0){
        return res.status(404).json({
            message: "User not present in the database",
        });
    }

    res.status(200).json({
        message: "User updated successfully",
    });

})

userRouter.get("/bulk",authMiddleware,async (req,res)=>{
    const filter= req.query.filter || "";


    const users = await User.find({
    $or: [
            { firstName: { $regex: 'xyz', $options: 'i' } },
            { lastName: { $regex: 'xyz', $options: 'i' } }
        ]
    });

    users= users.map((user) => {
        return {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id,
        };
    })
    res.status(200).json({
        message: "Users fetched successfully",
        users: users,
    });
})
moudule.exports=userRouter;