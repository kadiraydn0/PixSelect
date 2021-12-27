import express from "express";
import router from "./route/main.js"
import dotenv from 'dotenv'
import bodyParser from "body-parser";

dotenv.config()
const app = express();
import deserializeUser from "./middlewares/deserializeUser.js"
import connect from "./db/connect.js";

const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(deserializeUser)

app.listen(port, host, () => {

    connect()
    console.log(`Server listening at http://${host}:${port}`)

    app.use("/challenge", router)
})