const bcrypt = require("bcrypt");
const genHash = (password) => {
  try {
    const salt = bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.log("Somethin went wrong while generating hash");
    return "";
  }
};
