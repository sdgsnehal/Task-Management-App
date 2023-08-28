import express from "express";
import mongoose from "mongoose";
import apiRoute from "./routes/api.js";
import { DB_CONNECT } from "./utils/constant.js";
const app = express();
mongoose.connect(DB_CONNECT,{useNewUrlParser:true}).then(e=>console.log("connected")).catch(err=>console.log(err))
const PORT = 8000;
app.use(express.json());
app.use("/api", apiRoute);
app.listen(PORT, () => console.log("server is running"));
