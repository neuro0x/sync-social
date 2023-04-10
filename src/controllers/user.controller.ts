import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Register a new user
router.post("/register", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser: IUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Create and sign the JWT
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return res.status(201).json({ token });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Login an existing user
router.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Create and sign the JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    return res.json({ token });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Create a new user
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newUser: IUser = new User(req.body);
    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Get a user by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Update a user by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(updatedUser);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ message: "User deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
