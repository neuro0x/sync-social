import { Request, Response, Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import UserRole, { IUserRole } from "../models/userRole.model";

const router = Router();

// Create a new user role
router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const newUserRole: IUserRole = new UserRole(req.body);
    await newUserRole.save();
    return res.status(201).json(newUserRole);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Get all user roles
router.get("/", authMiddleware, async (_req: Request, res: Response) => {
  try {
    const userRoles = await UserRole.find();
    return res.json(userRoles);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Get user roles by user ID
router.get(
  "/user/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const userUserRoles = await UserRole.find({ userId });
      if (!userUserRoles || userUserRoles.length === 0) {
        return res
          .status(404)
          .json({ message: "No user roles found for this user" });
      }
      return res.json(userUserRoles);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
);

// Get a user role by ID
router.get("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const userRole = await UserRole.findById(req.params.id);
    if (!userRole) {
      return res.status(404).json({ message: "User role not found" });
    }
    return res.json(userRole);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update a user role by ID
router.put("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const updatedUserRole = await UserRole.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUserRole) {
      return res.status(404).json({ message: "User role not found" });
    }
    return res.json(updatedUserRole);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});

// Delete a user role by ID
router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const deletedUserRole = await UserRole.findByIdAndDelete(req.params.id);
    if (!deletedUserRole) {
      return res.status(404).json({ message: "User role not found" });
    }
    return res.json({ message: "User role deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default router;
