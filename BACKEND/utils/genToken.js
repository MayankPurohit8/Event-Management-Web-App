const jwt = require("jsonwebtoken");
const genToken = (id, guest, name) => {
  try {
    return jwt.sign({ id: id, guest: guest, name: name }, "your-secret-key", {
      expiresIn: "1hr",
    });
  } catch (err) {
    return console.log("something went wrong while generating token");
  }
};

module.exports = genToken;
