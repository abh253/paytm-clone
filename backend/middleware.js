const JWT_SECRET = require("./config");

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const headers = req.headers;
    if (!headers.authorization || !headers.authorization.startsWith("Bearer ")) {
        console.log("authmiddleware 9",headers);
        return res.status(401).json({
            message: "Authorization header is missing or invalid",
        });
    }

    const token = req.headers.authorization?.split(" ")[1];
    // console.log(token);
    try{
        // console.log(JWT_SECRET);
        const decoded = jwt.verify(token, JWT_SECRET);
        // console.log(decoded);
        req.userId= decoded.userId;
        next();
    }
    catch(err){
        return res.status(401).json({
            err:err,
            message: "Invalid token",
        });
    }
};

module.exports = authMiddleware;