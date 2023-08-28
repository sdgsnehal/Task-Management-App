import express from "express";
import apiRoute from "./routes/api.js";
const app = express();
const PORT =8000;
app.use(express.json())
app.use('/api',apiRoute)
app.listen(PORT,()=>console.log('server is running'))
