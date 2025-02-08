const bcrypt = require("bcrypt");
const genHash = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    console.log("Somethin went wrong while generating hash");
    return "";
  }
};

module.exports = genHash;
