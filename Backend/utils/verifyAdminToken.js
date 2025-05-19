import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from environment variables.");
}

const verifyAdminToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Access Denied. Invalid Token Format" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: "Access Denied. No Token Provided" });
    }

    let decoded;
    try {
      decoded = jsonwebtoken.verify(token, JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: "Invalid or Expired Token" });
    }

    req.user = decoded;

    const adminUser = await User.findById(req.user.id);
    if (!adminUser || adminUser.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. Admins Only" });
    }

    next();
  } catch (err) {
    console.error("Admin Token Verification Error:", err);
    return res.status(500).json({ message: "Server Error. Please try again." });
  }
};

export default verifyAdminToken;
