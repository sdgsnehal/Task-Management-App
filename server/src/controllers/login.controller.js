import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constant.js";
import bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { json } from "express";
import User from "../models/User.js";

const Login = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or Password is incorrect"
        )
      );
    }
    const verified = bcrypt.compareSync(password, User.password);
    if (!verified) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or Password is incorrect"
        )
      );
    }
    const token = Jwt.sign({ userId: user._id }, JWT_TOKEN_SECRET);
    return (
      res,
      json(
        jsonGenerate(StatusCode.SUCCESS, "Login SuccessFull", {
          userId: user._id,
          token: token,
        })
      )
    );
  }
  res.json(
    jsonGenerate(StatusCode.VAlIDATION_ERROR, "Validation  error ", errors)
  );
};
export default Login;
