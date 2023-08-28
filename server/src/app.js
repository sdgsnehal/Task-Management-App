import express from "express";
import apiRoute from "./utils/api.js";
const app = express();
const PORT =8000;
app.use('/api',apiRoute)
app.listen(PORT,()=>console.log('server is running'))
