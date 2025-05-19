import User from "../models/user.model.js";
import jsonwebtoken from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const signinAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is missing from environment variables.");
    }

    const admin = await User.findOne({ username });

    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Access Denied. Not an admin." });
    }

    if (admin.password !== password) {
      res.status(401).send({ message: "Invalid Password" });
    }

    // Generate JWT token
    const token = jsonwebtoken.sign(
      { id: admin._id, username: admin.username, role: admin.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Admin Authentication Successful",
      token,
      user: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin login error:", error);
    return res.status(500).json({ message: "Server error. Please try again." });
  }
};
