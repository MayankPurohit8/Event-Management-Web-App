const bcrypt = require("bcrypt");

const verifyPassword = (password, userpassword) => {
  return bcrypt.compare(password, userpassword);
};
