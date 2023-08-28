import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helpers.js";
import { StatusCode } from "../utils/constant.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const Register = async (req, res) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const { name, username, password, email } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const userExist = await User.find({
         $or:[{
            email:email
         },{
            username:username
         }]
    })
    if(userExist){
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"User or Email already register"))
    }
    // save to db
    try {
      const result = await User.create({
        name: name,
        email: email,
        password: hashPassword,
        username: username,
      });
      res.json(
        jsonGenerate(StatusCode.SUCCESS, "Registration Succesfull", result)
      );
    } catch (error) {
      console.log(error);
    }
  }

  res.json(
    jsonGenerate(
      StatusCode.VAlIDATION_ERROR,
      "Validation error",
      errors.mapped()
    )
  );
};
export default Register;
