const express = require("express");
const { User, Account } = require("../db");
const {authMiddleware} = require("../middleware");
const router = express.Router();



router.get("/balance", authMiddleware, async (req, res) => {
    const userId = req.userId;

    const balance = await Account.findOne({ userId });

    if (!balance) {
        return res.status(404).json({
            message: "Account not found",
            balance: NaN,
        });
    }

    res.status(200).json({
        message: "Balance fetched successfully",
        balance: balance.balance,
    });

})


router.post("/transfer", authMiddleware, async (req, res) => {

    const {amount, to}= req.body;

    const fromAccount = await Account.findOne({_id:req.userId});

    if(!fromAccount || fromAccount.balance<amount){
        return res.status(401).json({
            "msg":"transaction declined"
        });
    }

    const toAccount = await Account.findOne({_id:to});


    if(!toAccount){
        return res.status(401).json({
            msg:"invalid account"
        });
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}});
    await Account.updateOne({userId:to},{$inc:{balance:amount}});


    res.status(400).json({
        msg:"transfer complete"
    })


})
