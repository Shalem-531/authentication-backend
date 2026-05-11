require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../../usersdb'); // ✅ updated path


const Protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      // ✅ Sequelize method (instead of findById)
      const user = await User.findByPk(decoded.id);
      if (!user) {
        return res.status(401).json({ message: "User not found" });
      }
       
      // ✅ remove password manually
      const { password, ...userData } = user.toJSON();
    
      req.user = userData;

      return next();

    } catch (err) {
      console.log("JWT ERROR:", err.message);
      return res.status(401).json({ message: "Authorization failed" });
    }
  }

  return res.status(401).json({ message: "No token, authorization failed" });
};

module.exports = Protect;