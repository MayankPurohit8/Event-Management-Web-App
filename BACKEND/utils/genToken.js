const jwt = require("jsonwebtoken");
const genToken = (id) => {
  try {
    return jwt.sign({ id: id }, "your-secret-key", { expiresIn: "1hr" });
  } catch (err) {
    console.log("something went wrong while generating token");
    return;
  }
};
