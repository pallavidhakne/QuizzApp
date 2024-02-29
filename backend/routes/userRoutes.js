import Express from "express";
import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
const router = Express.Router();

router.post("/register", async (req, res) => {
  try {
    const userExists = await userModel.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already Exists,Please Login", success: false });
    }
    //if user not exist creating new one
    const newUser = new userModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();

    res.status(201).send({
      message: "User registered successfully.",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.error("Error", error);
    res.status(500).send({
      message: "Error while creating the user",
      success: false,
      error,
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).send({
        message: "User Not Exist Please create account",
        success: false,
      });
    }
    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res
      .status(201)
      .send({ message: "Login Successfully", success: true, data: token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ message: "Error while login the user", success: false, error });
  }
});
export default router;
