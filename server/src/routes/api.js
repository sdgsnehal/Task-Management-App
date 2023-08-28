import express  from "express";
import Register from "../controllers/Register.controller.js";
const apiRoute = express.Router();
apiRoute.post('/register',Register);
export default apiRoute;
