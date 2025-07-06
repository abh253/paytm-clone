const {JWT_SECRET} = require("./config");

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    const headers = req.headers;
    if (!headers.authorization || !headers.authorization.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Authorization header is missing or invalid",
        });
    }

    const token = req.headers.authorization?.split(" ")[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId= decoded;
        next();
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid token",
        });
    }
};

module.exports = authMiddleware;