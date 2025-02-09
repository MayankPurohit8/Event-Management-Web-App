const userModel = require("../models/userModel");
const genHash = require("../utils/genHash");
const verifyPassword = require("../utils/verifyPassword");
const genToken = require("../utils/genToken");
module.exports.register = async (req, res) => {
  try {
    let { name, email, password, guest } = req.body;
    console.log("got data");
    console.log("checking for existing users");
    let user = await userModel.findOne({ email: email });
    if (user != null) {
      console.log("user exists");
      return res.status(400).send("User already registered with email");
    }
    console.log("creating user");
    let newUser = await userModel.create({
      name,
      email,
      password: await genHash(password),
      guest,
    });
    console.log("user created");
    let token = genToken(newUser._id, newUser.guest, newUser.name);
    res.cookie("token", token);
    console.log("registerd");
    return res.status(200).send("user Registered successfully");
  } catch (err) {
    console.log("something went wrong while creating user", err.message);
    return res.status(500).send("something went wrong while creating user");
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email: email });

    if (user == null) {
      console.log("user does not exist");
      return res.status(400).send("user does not exist");
    }

    let result = await verifyPassword(password, user.password);

    if (result) {
      let token = await genToken(user._id, user.guest, user.name);
      res.cookie("token", token, { sameSite: none });
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

module.exports.logout = (req, res) => {
  try {
    res.cookie("token", "", { expires: new Date(0) });
    return res.status(200).send("cookie deleted");
  } catch (err) {
    console.log("something went wrong while deleting cookie!");
  }
};
