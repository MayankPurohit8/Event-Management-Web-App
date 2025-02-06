const userModel = require("../models/userModel");
const genHash = require("../utils/genHash");
const verifyPassword = require("../utils/verifyPassword");
const genToken = require("../utils/genToken");
module.exports.register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) return res.status(400).send("User already registered with email");

    let newUser = await userModel.create({
      name,
      email,
      password: await genHash(password),
    });

    let token = genToken(newUser._id);
    res.cookie("token", token);

    return res.status(201).send("user Registered successfully");
  } catch (err) {
    console.log("something went wrong while creating user");
    return res.status(500).send("something went wrong while creating user");
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email: email });

    if (!user) {
      console.log("user does not exist");
      return res.status(400).send("user does not exist");
    }

    let result = await verifyPassword(password, user.password);

    if (result) {
      let token = genToken(user._id);
      res.cookie("token", token);
      console.log("user logged in successfully");
      return res.status(200).send("Logged in successfully");
    } else {
      console.log("wrong password");
      return res.status(400).send("Wrong password");
    }
  } catch (err) {
    console.log("something went wrong while logging in user");
    return res.status(500).send("something went wron while logging user");
  }
};
