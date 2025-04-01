import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    // Check if the request has an Authorization header
    console.log("Authorization header:", req.header("Authorization")); // Log the header for debugging

  const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error(" Invalid or missing Authorization header:", authHeader);
      return res.status(401).json({ message: "No token, authorization denied" });
    }

  const token = authHeader.split(" ")[1]; // Extract Bearer token
  console.log("Token:", token); // Log the token for debugging

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      console.error("❌ Token missing user ID:", decoded);
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = await User.findById(decoded.id).select("-password"); // Attach user info to request
    // Check if user exists
    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    console.log("Authenticated user:", req.user); // Log authenticated user for debugging
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default authMiddleware;
