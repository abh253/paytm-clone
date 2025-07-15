const express = require("express");
const { User, Account } = require("../db");
const authMiddleware = require("../middleware");
const router = express.Router();
const mongoose = require("mongoose");


router.get("/balance", authMiddleware, async (req, res)=>{
    const userId = req.userId;

    const balance = await Account.findOne({ userId });

    if (!balance) {
        res.status(404).json({
            message: "Account not found",
            balance: NaN,
        });
        return;
    }

    res.status(200).json({
        message: "Balance fetched successfully",
        balance: balance.balance,
    });

})


router.post("/transfer", authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount, to}= req.body;
    // console.log(req.userId);    
    const fromAccount = await Account.findOne({userId:req.userId}).session(session);
    // console.log("fromaccount",fromAccount);
    if(!fromAccount || fromAccount.balance<amount){
        await session.abortTransaction();
        return res.status(401).json({
            "msg":"transaction declined"
        });
    }

    const toAccount = await Account.findOne({userId:to}).session(session);
    // console.log("toaccount",toAccount);

    if(!toAccount){
        await session.abortTransaction();
        return res.status(401).json({
            msg:"invalid account"
        });
    }
    try {
        await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
        await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);
    }catch(err){
        // console.log(err);
        session.abortTransaction();
        res.status(400).json({
            msg:"transaction declined"
        })
    }
    

    await session.commitTransaction();
    res.status(200).json({
        msg:"transfer complete"
    })


})


module.exports=router;