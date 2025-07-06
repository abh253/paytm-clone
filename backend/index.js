const express = require("express");
const cors = require("cors");
const authMiddleware = require("./middleware");
const mainRouter = require("./routes/index");
const app = express();
app.use(cors());
app.use(express.json());


app.use("api/v1", mainRouter);



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

