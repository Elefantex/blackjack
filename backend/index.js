const express = require("express");
const app = express();
const { mongoose } = require("./database");
const cors = require("cors");

const userRouter = require("./routes/user.routes")



app.set("port", process.env.PORT || 3001);
app.use(express.json(), cors());

app.listen(app.get("port"), () => {
    console.log(`Server listening on ${app.get("port")}`);
});


app.use("/", userRouter)

