import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  // Expect: "Bearer <token>"
  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // 🔥 Minimal fix: normalize header
  token = token.trim();

  // Extract token if it has the "Bearer " prefix (case-insensitive)
  if (token.toLowerCase().startsWith("bearer ")) {
    token = token.split(" ")[1];
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export default protect;
